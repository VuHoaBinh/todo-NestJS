import { Command } from '@nestjs/cqrs';
import {
  OperationResult,
} from '../operation/operation-result';
import { CreateUserCommandProps } from '../index';


export type CreateUserCommandResult = OperationResult<{
  id: string;
  version: number;
}>;

export class CreateUserCommand extends Command<CreateUserCommandResult> {
  constructor(public readonly props: CreateUserCommandProps) {
    super();
  }

  static create(props: CreateUserCommandProps) {
    return new CreateUserCommand(props);
  }
}
