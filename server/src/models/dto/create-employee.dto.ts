import { EmployeeRole, Employee } from '../employees.interfaces';

export class CreateEmployeeDTO implements Employee {
  name: string;
  role: EmployeeRole;
}
