import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetSearchByInforQuery,
  GetSearchByInforQueryResult,
} from './search-user-query';
import { USER_REPO, UserRepo } from '../../domain/repo/user.repo';
import { Inject } from '@nestjs/common';
import { OperationResult } from '../../commands/operation/operation-result';

@QueryHandler(GetSearchByInforQuery)
export class GetSearchByInforQueryHandler
  implements IQueryHandler<GetSearchByInforQuery> {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) { }
  async execute(
    command: GetSearchByInforQuery,
  ): Promise<GetSearchByInforQueryResult> {
    // search by name
    // search by email
    // search by id
    // search by name AND email

    // sortBy: state, createdAt
    // sortType: 'asc' | 'desc' = 'desc'


    // ex 1
    // user.state = 'active' | 'inactive' | 'banned' | 'no_verified';
    // if desc sort by state
    //    return 'active' -> 'no_verified' -> 'inactive' -> 'banned'
    // if asc sort by state
    //    return 'banned' -> 'inactive' -> 'no_verified' -> 'active'
    // if no sort,
    //    default sort by createdAt desc




    // ex 2
    // search by name and email (advanced search)
    // data: [{ name: 'abc', email: 'khongquangtam@gmail.com' }, { name: 'user 2 , email: 'abcdef@gmail.com' }]
    // user input: 'abc'
    // expected result: [{ name: 'user 2 , email: 'abcdef@gmail.com' }, { name: 'abc', email: 'khongquangtam@gmail.com' }]
    // because 'abc' is match in 'email', so it prefer in result than 'name'


    const findUser = await this.userRepo.search(command.props);

    const result = findUser.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      state: user.getState(),

    }));
    return OperationResult.success(result);
  }
}
