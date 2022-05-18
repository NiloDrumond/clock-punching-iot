export type EmployeeRole = 'manager' | 'worker';

export interface Employee {
  name: string;
  role: EmployeeRole;
}
