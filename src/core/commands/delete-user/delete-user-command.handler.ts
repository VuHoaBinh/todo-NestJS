import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  DeleteAUserCommand,
  DeleteAUserCommandResult,
} from './delete-user-command';
import { OperationResult } from '../operation/operation-result';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';

@CommandHandler(DeleteAUserCommand)
export class DeleteAUserCommandHandler
  implements ICommandHandler<DeleteAUserCommand>
{
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) {}
  async execute(
    command: DeleteAUserCommand,
  ): Promise<DeleteAUserCommandResult> {
    const { id } = command;
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new BadRequestException(`User with id ${id} does not exist`);
    }
    await this.userRepo.deleteAUser(user.getId());
    return OperationResult.success({ id: user.getId() });
  }
}
