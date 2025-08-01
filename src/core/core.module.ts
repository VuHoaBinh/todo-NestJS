import { Module } from '@nestjs/common';
import { InfrasModule } from '../infras/infras.module';
import { LoggerService } from '../logger/logger.service';
import { commandHandlers } from './commands';
import { queryHandlers } from './queries';
import { UserService } from './services/user.service';
import { USER_REPO } from './domain/repo/user.repo';
import { UserRepository } from '../infras/repositories/user.repository';
import { CassandraService } from './services/cassandra.service';
import { ElasticSearchModule } from '../infras/ElasticSearch/elasticsearch.module';

@Module({
  imports: [InfrasModule, ElasticSearchModule],
  providers: [
    UserService,
    CassandraService,
    LoggerService,
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: USER_REPO,
      useClass: UserRepository,
    },
  ],
  exports: [UserService, LoggerService, USER_REPO],
})
export class CoreModule {}
