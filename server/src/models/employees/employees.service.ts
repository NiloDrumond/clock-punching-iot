import { sendMessage } from '@/services/aws';
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
    const employee = this.employees[cpf];
    if (employee.atOffice) {
      const entered = employee.timestamps[employee.timestamps.length - 1];
      console.log(new Date().getTime() - entered.getTime());
      console.log(8 * 60 * 60 * 1000);
      if (
        new Date().getTime() - entered.getTime() + 1000 * 30 * 60 <
        8 * 60 * 60 * 1000
      ) {
        sendMessage({
          topic: 'warning',
          message: {
            message: `${employee.name} trabalhou menos que 8 horas.`,
          },
        });
      }
    }
    this.employees[cpf].atOffice = !this.employees[cpf].atOffice;
    this.employees[cpf].timestamps.push(new Date());
  }

  findAll(): Employee[] {
    return Object.values(this.employees);
  }
}
