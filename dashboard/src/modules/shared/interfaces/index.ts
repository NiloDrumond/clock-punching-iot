export type EmployeeRole = "manager" | "worker";

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
}
