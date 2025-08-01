import { Query } from '@nestjs/cqrs';
import { User } from '../../domain/models/user.model';
import { OperationResult } from '../../commands/operation/operation-result';

export type GetUserByIdQueryResult = OperationResult<{
  props: User;
}>;
export class GetUserByIdQuery extends Query<GetUserByIdQueryResult> {
  constructor(public readonly id: string) {
    super();
  }

  static create(id: string) {
    return new GetUserByIdQuery(id);
  }
}
