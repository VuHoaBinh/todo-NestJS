import { Command } from '@nestjs/cqrs';
import {
  OperationResult,
} from '../operation/operation-result';
import { UpdateUserCommandProps } from '..';

export type UpdateUserCommandResult = OperationResult<{
  id: string;
  version: number;
}>;
export class UpdateUserCommand extends Command<UpdateUserCommandResult> {
  constructor(
    public readonly id: string,
    public readonly props: UpdateUserCommandProps,
  ) {
    super();
  }

  static create(id: string, props: UpdateUserCommandProps) {
    return new UpdateUserCommand(id, props);
  }
}
