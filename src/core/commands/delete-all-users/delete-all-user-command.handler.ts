import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  DeleteAllUserCommand,
  DeleteAllUserCommandResult,
} from './delete-all-user-command';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';
import { OperationResult } from '../operation/operation-result';
import { Inject } from '@nestjs/common';

@CommandHandler(DeleteAllUserCommand)
export class DeleteUsersCommandHandler
  implements ICommandHandler<DeleteAllUserCommand>
{
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) {}
  async execute(
    command: DeleteAllUserCommand,
  ): Promise<DeleteAllUserCommandResult> {
    await this.userRepo.delete();
    return OperationResult.success({
      data: [],
    });
  }
}
