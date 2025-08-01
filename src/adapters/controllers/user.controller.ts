import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../core/commands/create-user/create-user-command';
import { OperationResult } from '../../core/commands/operation/operation-result';
import { GetAllUsersQuery } from '../../core/queries/get-all-users/get-all-users-query';
import { GetUserByIdQuery } from '../../core/queries/get-user-by-id/get-user-by-id-query';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserCommand } from '../../core/commands/update-user/update-user-command';
import { DeleteAllUserCommand } from '../../core/commands/delete-all-users/delete-all-user-command';
import { DeleteAUserCommand } from '../../core/commands/delete-user/delete-user-command';
import { GetSearchByInforQuery } from '../../core/queries/search-user/search-user-query';
import { User } from '../../core/domain/models/user.model';
import { SearchUserDto } from '../dtos/search-user.dto';

export class ServiceResponse<T> {
  status: string;
  data?: T;
  message: string;

  static fromResult<T>(result: OperationResult<T>): ServiceResponse<T> {
    const response = new ServiceResponse<T>();
    response.status = result.status ? 'success' : 'error';
    response.data = result.data;
    response.message = result.message || '';
    return response;
  }
}

@Controller('users')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) { }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.commandBus.execute(
      CreateUserCommand.create(createUserDto),
    );
    return ServiceResponse.fromResult(res);
  }

  @Get()
  async getUsers() {
    const res = await this.queryBus.execute(GetAllUsersQuery.create());
    return ServiceResponse.fromResult(res);
  }

  // //////////////////////////////////////////////////////////////////
  @Post('_search')
  async searchUsers(@Body() searchUserDto: SearchUserDto) {
    const users = await this.queryBus.execute(
      GetSearchByInforQuery.create(searchUserDto),
    );
    return ServiceResponse.fromResult(users);
  }
  // /////////////////////////////////////////////////

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const res = await this.queryBus.execute(GetUserByIdQuery.create(id));
    return ServiceResponse.fromResult(res);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updateUser = await this.commandBus.execute(
      UpdateUserCommand.create(id, updateUserDto),
    );
    return ServiceResponse.fromResult(updateUser);
  }

  @Delete()
  async deleteAllUsers() {
    const res = await this.commandBus.execute(DeleteAllUserCommand.create());

    return ServiceResponse.fromResult(res);
  }

  @Delete(':id')
  async deleteAUser(@Param('id') id: string) {
    const res = await this.commandBus.execute(DeleteAUserCommand.create(id));
    return ServiceResponse.fromResult(res);
  }
}
