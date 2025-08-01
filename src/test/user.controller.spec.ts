import { UserService } from '../core/services/user.service';
import { UserRepository } from '../infras/repositories/user.repository';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(() => {
    repository = {
      createUser: jest.fn(),
      findUserById: jest.fn(),
    } as any;
    service = new UserService(repository);
  });

  it('should create user', async () => {
    const name = 'Binh';
    const email = 'binh@example.com';
    await service.createUser(name, email);
    expect(repository.create).toHaveBeenCalledWith(name, email);
  });

  it('should get user by id', async () => {
    const user = {
      id: '9db29e9b-4bc9-4452-8b98-f6472363c730',
      name: 'Binh',
      email: 'binh@example.com',
    };
    (repository.findUserById as jest.Mock).mockResolvedValue(user);
    const result = await service.getUserById(
      '9db29e9b-4bc9-4452-8b98-f6472363c730',
    );
    expect(result).toEqual(user);
  });
});
