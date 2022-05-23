import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(3)
  password: string;
}
