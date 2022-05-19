import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './employees.interfaces';

@Injectable()
export class EmployeesService {
  private readonly employees: Record<string, Employee> = {};

  create({ name, cpf }: CreateEmployeeDTO) {
    const employee: Employee = {
      cpf,
      atOffice: false,
      timestamps: [],
      name,
    };
    this.employees[cpf] = employee;
  }

  clockIn(cpf: string) {
    if (!this.employees[cpf]) {
      throw new HttpException('Empregado não encontrado', HttpStatus.NOT_FOUND);
    }
    this.employees[cpf].atOffice = !this.employees[cpf].atOffice;
    this.employees[cpf].timestamps.push(new Date());
  }

  findAll(): Employee[] {
    return Object.values(this.employees);
  }
}
