import { IsString } from "class-validator";
import { SearchUsersCommandProps } from "../../core/commands";

export class SearchUserDto implements SearchUsersCommandProps {
  @IsString()
  information: string;

  @IsString()
  categories: string;
}
