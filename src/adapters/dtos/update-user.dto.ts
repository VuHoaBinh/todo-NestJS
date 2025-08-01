import { IsOptional, IsString, IsEmail, Length } from 'class-validator';
import { UpdateUserCommandProps } from '../../core/commands';
import { UserState } from '../../core/domain/models/user.model';

export class UpdateUserDto implements UpdateUserCommandProps {
  @IsOptional()
  @IsString()
  @Length(1, 20)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  state: UserState;

}
