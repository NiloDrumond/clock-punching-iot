import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsNotEmpty()
  // @IsString()
  // @Matches('^(manager|worker)$')
  // role: EmployeeRole;
}
