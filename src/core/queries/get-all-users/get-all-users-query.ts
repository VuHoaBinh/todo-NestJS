import { Query } from '@nestjs/cqrs';
import { OperationResult } from '../../commands/operation/operation-result';

export type GetAllUsersQueryResult = OperationResult<
  {
    id: string;
    name: string;
    email: string;
    state: string;
    version: number;
  }[]
>;

export class GetAllUsersQuery extends Query<GetAllUsersQueryResult> {
  constructor() {
    super();
  }
  static create() {
    return new GetAllUsersQuery();
  }
}
