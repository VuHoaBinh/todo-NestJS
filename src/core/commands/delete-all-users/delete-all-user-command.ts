import { Command } from '@nestjs/cqrs';
import { OperationResult } from '../operation/operation-result';

export type DeleteAllUserCommandResult = OperationResult<{
  data: [];
}>;
export class DeleteAllUserCommand extends Command<DeleteAllUserCommandResult> {
  constructor() {
    super();
  }

  static create() {
    return new DeleteAllUserCommand();
  }
}
