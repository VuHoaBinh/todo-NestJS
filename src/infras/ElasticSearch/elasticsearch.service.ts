import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchRequest, SearchResponse } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ElasticSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search<T>(searchRequest: SearchRequest): Promise<SearchResponse<T>> {
    try {
      return await this.elasticsearchService.search<T>(searchRequest);
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      throw error;
    }
  }

  async index<T>(index: string, document: T, id?: string): Promise<void> {
    try {
      await this.elasticsearchService.index({
        index,
        id,
        body: document as any,
      });
      console.log(`Document indexed to ${index} with id: ${id}`);
    } catch (error) {
      console.error('Elasticsearch index error:', error);
      throw error;
    }
  }

  async update<T>(index: string, id: string, document: Partial<T>): Promise<void> {
    try {
      await this.elasticsearchService.update({
        index,
        id,
        body: {
          doc: document as any,
        },
      });
      console.log(`Document updated in ${index} with id: ${id}`);
    } catch (error) {
      console.error('Elasticsearch update error:', error);
      throw error;
    }
  }

  async delete(index: string, id: string): Promise<void> {
    try {
      await this.elasticsearchService.delete({
        index,
        id,
      });
      console.log(`Document deleted from ${index} with id: ${id}`);
    } catch (error) {
      console.error('Elasticsearch delete error:', error);
      throw error;
    }
  }

  async createIndex(index: string, mapping?: any): Promise<void> {
    try {
      const exists = await this.elasticsearchService.indices.exists({ index });
      if (!exists) {
        await this.elasticsearchService.indices.create({
          index,
          body: {
            mappings: mapping,
          },
        });
        console.log(`Index ${index} created successfully`);
      }
    } catch (error) {
      console.error('Elasticsearch create index error:', error);
      throw error;
    }
  }
}