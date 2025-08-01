import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CassandraService implements OnModuleDestroy {
  private client: Client;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    const cassandraConfig = this.configService.get('cassandra');
    this.client = new Client({
      contactPoints: cassandraConfig?.contactPoints || '',
      localDataCenter: cassandraConfig?.localDataCenter || '',
      keyspace: cassandraConfig?.keyspace || '',
    });

    try {
      await this.client.connect();
      console.log('Connected oke hahaha :) ');
    } catch (err) {
      console.error('Connection error: ', err);
    }
  }

  getClient() {
    return this.client;
  }

  onModuleDestroy() {
    if (this.client) {
      this.client
        .shutdown()
        .then(() => console.log('Cassandra client disconnected'))
        .catch((err) =>
          console.error('Error disconnecting Cassandra client:', err),
        );
    }
  }
  async execute(query: string, params: any[] = []) {
    return this.client.execute(query, params, { prepare: true });
  }
}
