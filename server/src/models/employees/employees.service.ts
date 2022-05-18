import { Injectable } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './employees.interfaces';
import { v4 } from 'uuid';

@Injectable()
export class EmployeesService {
  private readonly employees: Employee[] = [];

  create({ name }: CreateEmployeeDTO) {
    const employee: Employee = {
      id: v4(),
      atOffice: false,
      timestamps: [],
      name,
    };
    this.employees.push(employee);
  }

  findAll(): Employee[] {
    return this.employees;
  }
}
