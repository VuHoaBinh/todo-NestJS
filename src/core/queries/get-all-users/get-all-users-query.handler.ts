import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetAllUsersQuery,
  GetAllUsersQueryResult,
} from './get-all-users-query';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';
import { OperationResult } from '../../commands/operation/operation-result';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) { }

  async execute(query: GetAllUsersQuery): Promise<GetAllUsersQueryResult> {
    const users = await this.userRepo.findAll();
    if (!users || users.length === 0) {
      return OperationResult.success([]);
    }
    const result = users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      state: user.getState(),
      version: user.getVersion(),
    }));
    return OperationResult.success(result);
  }
}
