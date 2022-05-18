import { Injectable } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './employees.interfaces';

@Injectable()
export class EmployeesService {
  private readonly employees: Employee[] = [];

  create(employee: CreateEmployeeDTO) {
    this.employees.push(employee);
  }

  findAll(): Employee[] {
    return this.employees;
  }
}
