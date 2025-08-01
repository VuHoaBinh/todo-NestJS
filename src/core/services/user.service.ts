import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { LoggerService } from '../../logger/logger.service';
import { USER_REPO, UserRepo } from '../domain/repo/user.repo';
import { User } from '../domain/models/user.model';
import { UserServiceInterface } from '../interfaces/user.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private logger: LoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // async createUser(props): Promise<User> {
  //   const existingUser = await this.userRepo.findUserByEmail(props.email);
  //   if (existingUser) {
  //     this.logger.warn(`User with email already exists, cannot create user`);
  //     throw new ConflictException('User already exists with this email');
  //   }

  //   const new_user = await this.userRepo.create(props);
  //   if (!new_user) {
  //     this.logger.error(`User creation failed for email`);
  //     throw new BadRequestException('User could not be created');
  //   }
  //   this.logger.info(
  //     `User created successfully, url: /createUser/${new_user.getId()}`,
  //   );

  //   await this.cacheManager.set(`user:${new_user.getId()}`, new_user);
  //   return new_user;
  // }

  // async getUserById(id: string): Promise<User> {
  //   const cachedUser = await this.cacheManager.get<UserEntity>(`user:${id}`);
  //   if (cachedUser) {
  //     return cachedUser;
  //   }
  //   const user = await this.userRepository.findUserById(id);
  //   if (!user) {
  //     this.logger.warn(`User with ID ${id} not found`);
  //     throw new NotFoundException('User not found');
  //   }
  //   this.logger.info(`User retrieved successfully, url=/getUserById/${id}`);
  //   await this.cacheManager.set('user:', user);
  //   return user;
  // }

  // async getAllUsers(): Promise<UserEntity[]> {
  //   const cachedUsers = await this.cacheManager.get<User[]>('user:*');
  //   if (cachedUsers) {
  //     return cachedUsers;
  //   }
  //   const users = await this.userRepository.findAllUsers();
  //   if (!users || users.length === 0) {
  //     this.logger.warn('No users found');
  //     return [];
  //   }
  //   this.logger.info(`Retrieved ${users.length} users from the database`, {
  //     url: '/getAllUsers',
  //   });
  //   // users.forEach(async (user) => {
  //   //   await this.cacheManager.set(`user:${user.id}`, user);
  //   // });
  //   return users;
  // }

  // async updateUser(id: string, props): Promise<User> {
  //   const userExists = await this.userRepository.findUserById(id);
  //   if (!userExists) {
  //     this.logger.warn(`User with ID not found for update`);
  //     throw new NotFoundException('User not found');
  //   }

  //   const existingUser = await this.userRepository.findUserByEmail(props.email);
  //   if (existingUser && existingUser.id !== id) {
  //     this.logger.warn(`User with email already exists. Cannot update user.`);
  //     throw new ConflictException('User already exists with this email');
  //   }
  //   const user = await this.userRepository.updateUser(id, props);
  //   if (!user) {
  //     this.logger.error(`User update failed for ID: ${id}`);
  //     throw new BadRequestException('User could not be updated');
  //   }
  //   this.logger.info(`User updated successfully , url: /updateUser/${id}`);
  //   await this.cacheManager.set(`user:${id}`, user);
  //   return user;
  // }

  // async deleteAllUsers(): Promise<void> {
  //   // await this.cacheManager.clear();
  //   this.logger.info(
  //     'Deleting all users from the database and cache, url: /deleteAllUsers',
  //   );
  //   await this.cacheManager.del('user:*');
  //   return this.userRepository.deleteAllUsers();
  // }
}
