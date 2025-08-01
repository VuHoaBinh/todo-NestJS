import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CoreModule } from '../core/core.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CoreModule, CqrsModule],
  controllers: [UserController],
})
export class AdaptersModule {}
