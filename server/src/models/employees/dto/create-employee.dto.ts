import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  // @IsNotEmpty()
  // @IsString()
  // @Matches('^(manager|worker)$')
  // role: EmployeeRole;
}
