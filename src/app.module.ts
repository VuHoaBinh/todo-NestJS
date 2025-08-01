import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AdaptersModule } from './adapters/adapters.module';
import { CoreModule } from './core/core.module';
import { InfrasModule } from './infras/infras.module';
import { LoggingMiddleware } from './middlewares/logging.middlewares';
import { ConfigModule } from './config/config.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ElasticSearchModule } from './infras/ElasticSearch/elasticsearch.module';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({
      ttl: 3600,
      max: 100,
      isGlobal: true,
    }),
    CqrsModule,
    AdaptersModule,
    CoreModule,
    InfrasModule,
    ElasticSearchModule,
  ],
  providers: [LoggingMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
