import { Command } from '@nestjs/cqrs';
import { OperationResult } from '../operation/operation-result';

export type DeleteAUserCommandResult = OperationResult<{
  id: string;
}>;

export class DeleteAUserCommand extends Command<DeleteAUserCommandResult> {
  constructor(public readonly id: string) {
    super();
  }

  static create(id: string) {
    return new DeleteAUserCommand(id);
  }
}
