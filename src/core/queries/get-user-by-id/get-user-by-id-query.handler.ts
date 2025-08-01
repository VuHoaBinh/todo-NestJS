import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetUserByIdQuery,
  GetUserByIdQueryResult,
} from './get-user-by-id-query';
import { Inject, NotFoundException } from '@nestjs/common';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';
import { OperationResult } from '../../commands/operation/operation-result';

@QueryHandler(GetUserByIdQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) {}
  async execute(command: GetUserByIdQuery): Promise<GetUserByIdQueryResult> {
    const findUser = await this.userRepo.findOne(command.id);
    if (!findUser) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }
    return OperationResult.success({ props: findUser });
  }
}
