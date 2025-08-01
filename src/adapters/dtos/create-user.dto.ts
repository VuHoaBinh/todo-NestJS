import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { CreateUserCommandProps } from '../../core/commands';
import { UserState } from '../../core/domain/models/user.model';

export class CreateUserDto implements CreateUserCommandProps {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

}
