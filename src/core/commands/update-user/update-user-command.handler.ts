import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  UpdateUserCommand,
  UpdateUserCommandResult,
} from './update-user-command';
import { OperationResult } from '../operation/operation-result';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) { }

  async execute({
    id,
    props,
  }: UpdateUserCommand): Promise<UpdateUserCommandResult> {
    const { name, email, state } = props;

    const existingUser = await this.userRepo.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }


    const emailUserExits = await this.userRepo.findUserByEmail(email);
    if (emailUserExits) {
      throw new BadRequestException('User already exists with this email');
    }


    const isUpdated = existingUser.update({ name, email, state });
    if (!isUpdated) {
      throw new BadRequestException('User update failed');
    }


    await this.userRepo.update(existingUser);

    return OperationResult.success({
      id: existingUser.getId(),
      version: existingUser.getVersion(),
    });
  }
}
