import { Inject } from '@nestjs/common';
import { User } from '../domain/models/user.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export class UserCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async set(id: string, entity: User) {
    await this.cacheManager.set(`user:${id}`, entity.JSON());
  }
  async get(id: string) {
    await this.cacheManager.get<User>(`user:${id}`);
  }

  async del() {
    await this.cacheManager.del('user:*');
  }
}
