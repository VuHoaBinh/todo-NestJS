import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';
import { User, USER_STATES } from '../../domain/models/user.model';
import { OperationResult } from '../operation/operation-result';
import {
  CreateUserCommand,
  CreateUserCommandResult,
} from './create-user-command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, CreateUserCommandResult> {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) { }

  async execute({
    props,
  }: CreateUserCommand): Promise<CreateUserCommandResult> {
    const { name, email } = props;

    const existedUserWithEmail = await this.userRepo.findUserByEmail(email);
    if (existedUserWithEmail) {
      throw new BadRequestException('User already exists with this email');
    }

    const user = User.create({
      name: name,
      email: email,
      state: '',
    });

    await this.userRepo.create(user);

    return OperationResult.success({
      id: user.getId(),
      version: user.getVersion(),
    });
  }
}
