import { UserState } from '../domain/models/user.model';
import { CreateUserCommandHandler } from './create-user/create-user-command.handler';
import { DeleteUsersCommandHandler } from './delete-all-users/delete-all-user-command.handler';
import { DeleteAUserCommandHandler } from './delete-user/delete-user-command.handler';
import { UpdateUserCommandHandler } from './update-user/update-user-command.handler';

export const commandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUsersCommandHandler,
  DeleteAUserCommandHandler,
];

export interface CreateUserCommandProps {
  name: string;
  email: string;
}
export interface UpdateUserCommandProps {
  name: string;
  email: string;
  state: UserState;
}
export interface DeleteAUserCommandProps {
  id: string;
}

export interface SearchUsersCommandProps {
  information: string;
  categories: string;
}