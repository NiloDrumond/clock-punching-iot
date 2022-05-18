import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './employees.interfaces';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDTO: CreateEmployeeDTO) {
    this.employeesService.create(createEmployeeDTO);
  }

  @Get()
  findAll(): Employee[] {
    return this.employeesService.findAll();
  }
}
