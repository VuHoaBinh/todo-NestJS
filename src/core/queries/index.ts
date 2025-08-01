import { GetAllUsersQueryHandler } from './get-all-users/get-all-users-query.handler';
import { GetUserQueryHandler } from './get-user-by-id/get-user-by-id-query.handler';
import { GetSearchByInforQueryHandler } from './search-user/search-user-query.handler';

export const queryHandlers = [
  GetSearchByInforQueryHandler,
  GetAllUsersQueryHandler,
  GetUserQueryHandler,
];
