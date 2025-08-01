import { IsOptional, IsString } from 'class-validator';
import { DeleteAUserCommandProps } from '../../core/commands';

export class DeleteUserDto implements DeleteAUserCommandProps {
  @IsString()
  @IsOptional()
  id: string;
}
