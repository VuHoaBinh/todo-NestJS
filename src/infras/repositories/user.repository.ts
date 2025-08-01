import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepo } from '../../core/domain/repo/user.repo';
import { User } from '../../core/domain/models/user.model';
import { CassandraService } from '../../core/services/cassandra.service';
import { UserCacheService } from '../../core/services/user-cache.service';
import { ElasticSearchService } from '../ElasticSearch/elasticsearch.service';
import { getUserMetadataParams } from '../utils/user-metadata.util';
import { SearchUsersCommandProps } from '../../core/commands';
import e from 'express';
import { SortOrder } from '@elastic/elasticsearch/lib/api/types';


@Injectable()
export class UserRepository implements UserRepo {
  constructor(
    private readonly cassandraService: CassandraService,
    private readonly userCacheService: UserCacheService,
    private readonly elasticSearchService: ElasticSearchService,
  ) { }

  protected async beforeCreate(entity: User): Promise<void> {
    entity.setCreatedAt(new Date());
    entity.setCreatedBy('BOT1');
  }

  protected async afterCreate(entity: User): Promise<void> {
    await this.userCacheService.set(entity.getId(), entity);
    await this.elasticSearchService.index('users', {
      id: entity.getId(),
      name: entity.getName(),
      email: entity.getEmail(),
      state: entity.getState(),
      ...getUserMetadataParams(entity),

    });
    console.log('User created successfully:', entity);
  }
  protected async beforeUpdate(entity: User): Promise<void> {
    entity.setVersion(entity.getVersion() + 1);
    entity.setUpdatedAt(new Date());
    entity.setUpdatedBy('BOT2');
  }


  protected async afterUpdate(entity: User): Promise<void> {
    await this.userCacheService.set(entity.getId(), entity);

    try {
      await this.elasticSearchService.update('users', entity.getId(), {
        name: entity.getName(),
        email: entity.getEmail(),
        state: entity.getState(),
        version: entity.getVersion(),
        updatedBy: entity.getUpdatedBy(),
        updatedAt: entity.getUpdatedAt(),
      });
    } catch (error: any) {
      const type = error?.meta?.body?.error?.type;
      if (type === 'document_missing_exception') {
        await this.elasticSearchService.index('users', {
          id: entity.getId(),
          name: entity.getName(),
          email: entity.getEmail(),
          state: entity.getState(),
          ...getUserMetadataParams(entity),
        });
      } else {
        throw new InternalServerErrorException('Elasticsearch update failed');
      }
    }
  }

  protected async beforeDelete(): Promise<void> { }
  protected async afterDelete(): Promise<void> {
    this.userCacheService.del();
    console.log('User deleted successfully');
  }


  async search(entity: SearchUsersCommandProps): Promise<User[]> {
    const isEmptyInformation = !entity.information;
    const isEmptyCategories = entity.categories.trim() === '';

    const query = isEmptyInformation
      ? { match_all: {} }
      : {
        bool: {
          must: [
            {
              multi_match: {
                query: `*${entity.information}*`,
                type: 'phrase_prefix' as any,
                fields: ['email^3', 'name^2', 'id'],
              },
            },
          ],
        },
      };

    const sort = isEmptyCategories
      ? [
        {
          _score: { order: 'desc' },
        },
        {
          createdAt: { order: 'desc' },
        },
      ]
      : [
        {
          _script: {
            type: 'number',
            script: {
              lang: 'painless',
              source: `
                if (!doc.containsKey('state.keyword') || doc['state.keyword'].size() == 0) return 0;
                def s = doc['state.keyword'].value;
                if (s == 'Active') return 4;
                if (s == 'NoVerified') return 3;
                if (s == 'Inactive') return 2;
                if (s == 'Banned') return 1;
                return 0;
              `,
            },
            order: entity.categories
          },
        },
        {
          _score: { order: 'desc' },
        },
        // {
        //   createdAt: { order: entity.categories },
        // },
      ] as any;

    const result = await this.elasticSearchService.search<any>({
      index: 'users',
      query,
      sort,
    });

    const hits = result.hits?.hits ?? [];
    if (!hits.length) return [];

    return hits
      .map((hit) => {
        const source = hit._source;
        if (!source) return null;

        const user = User.create(
          {
            name: source.name,
            email: source.email,
            state: source.state,
          },
          hit._id,
        );

        if (source.version !== undefined) user.setVersion(source.version);
        if (source.createdAt) user.setCreatedAt(new Date(source.createdAt));
        if (source.createdBy) user.setCreatedBy(source.createdBy);
        if (source.updatedBy) user.setUpdatedBy(source.updatedBy);
        if (source.updatedAt) user.setUpdatedAt(new Date(source.updatedAt));

        return user;
      })
      .filter((u): u is User => u !== null);
  }

  async create(entity: User): Promise<void> {
    try {
      await this.beforeCreate(entity);
      console.log('Creating user:', entity);
      await this.cassandraService.execute(
        'INSERT INTO user_management (id, name, email, state, version,createdAt, createdBy, updatedBy, updatedAt) VALUES(?, ?, ?, ?,?, ?, ?, ?, ?)',
        [
          entity.getId(),
          entity.getName(),
          entity.getEmail(),
          entity.getState(),
          ...getUserMetadataParams(entity),
        ],
      );
      await this.afterCreate(entity);

    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Lỗi tạo user');
    }
  }

  async update(entity: User): Promise<void> {
    await this.beforeUpdate(entity);

    const query = `
    UPDATE user_management
    SET name = ?, email = ?, state = ? , version = ?, updatedBy = ?, updatedAt = ?
    WHERE id = ?
  `;

    const params = [
      entity.getName(),
      entity.getEmail(),
      entity.getState(),
      entity.getVersion(),
      entity.getUpdatedBy(),
      entity.getUpdatedAt(),
      entity.getId(),
    ];

    await this.cassandraService.execute(query, params);
    await this.afterUpdate(entity);
  }


  async delete(): Promise<void> {
    await this.beforeDelete();
    await this.cassandraService.execute('TRUNCATE user_management');
    await this.afterDelete();
  }

  async findAll(): Promise<User[]> {
    const result = await this.cassandraService.execute(
      'SELECT * FROM user_management',
    );
    return result.rows.map((row) => {
      const user = User.create({ name: row.name, email: row.email, state: row.state }, row.id);

      user.setVersion(row.version);
      user.setCreatedAt(row.createdAt);
      user.setCreatedBy(row.createdBy);
      user.setUpdatedBy(row.updatedBy);
      user.setUpdatedAt(row.updatedAt);
      return user;
    });
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const result = await this.cassandraService.execute(
        'SELECT * FROM user_management WHERE id = ?',
        [id],
      );
      const row = result.first();
      if (!row) return null;
      return User.create({ name: row.name, email: row.email, state: row.state }, row.id);

    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.cassandraService.execute(
      'SELECT * FROM user_management WHERE email = ? ALLOW FILTERING',
      [email],
    );
    const row = result.first();
    if (!row) return null;
    return User.create({ name: row.name, email: row.email, state: row.state }, row.id);
  }


  deleteAllUsers(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteAUser(id: string): Promise<void> {
    await this.cassandraService.execute(
      'DELETE FROM user_management WHERE id = ?',
      [id],
    );
  }
}
