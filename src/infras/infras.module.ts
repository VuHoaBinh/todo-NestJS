import { UserRepository } from './repositories/user.repository';
import { CassandraService } from '../core/services/cassandra.service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { serviceHandlers } from '../core/services';
import { ElasticSearchModule } from './ElasticSearch/elasticsearch.module';

@Module({
  imports: [CqrsModule, ElasticSearchModule],
  providers: [UserRepository, CassandraService, ...serviceHandlers],
  exports: [UserRepository, ...serviceHandlers],
})
export class InfrasModule {}
