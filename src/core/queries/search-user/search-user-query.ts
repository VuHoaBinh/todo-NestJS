import { Query } from '@nestjs/cqrs';
import { OperationResult } from '../../commands/operation/operation-result';
import { UserState } from '../../domain/models/user.model';
import { SearchUsersCommandProps } from '../../commands';

export type GetSearchByInforQueryResult = OperationResult<
  {
    id: string;
    name: string;
    email: string;
    state: UserState;
  }[]
>;

export class GetSearchByInforQuery extends Query<GetSearchByInforQueryResult> {
  constructor(public readonly props: SearchUsersCommandProps) {
    super();
  }

  static create(props: SearchUsersCommandProps) {
    return new GetSearchByInforQuery(props);
  }
}
