import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../adapters/controllers/user.controller';
import { UserService } from '../core/services/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should create user', async () => {
    const name = 'Binh';
    const email = 'binh@example.com';
    const dto = { name: name, email: email };
    await controller.create(dto);
    expect(service.createUser).toHaveBeenCalledWith(name, email);
  });

  it('should get user by id', async () => {
    const user = {
      id: '9db29e9b-4bc9-4452-8b98-f6472363c730',
      name: 'BinhTom1232',
      email: 'hahahahaa@gmail.com',
    };
    jest.spyOn(service, 'getUserById').mockResolvedValue(user);

    const result = await service.getUserById(
      '9db29e9b-4bc9-4452-8b98-f6472363c730',
    );
    expect(result).toEqual(user);
  });
});
