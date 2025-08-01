import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as yaml from 'yaml';
import * as fs from 'fs';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [() => yaml.parse(fs.readFileSync('config.yaml', 'utf8'))],
    }),
  ],
})
export class ConfigModule {}
