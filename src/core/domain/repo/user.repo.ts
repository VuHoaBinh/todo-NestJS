import { SearchUsersCommandProps } from '../../commands';
import { Repo } from '../../utils/repo';
import { User } from '../models/user.model';

export interface UserRepo extends Repo<User> {
  findUserByEmail(email: string): Promise<User | null>;
  deleteAllUsers(): Promise<void>;
  deleteAUser(id: string): Promise<void>;
  search(props: SearchUsersCommandProps): Promise<User[]>;
}

export const USER_REPO = Symbol.for('USER_REPO');
