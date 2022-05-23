import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './employees.interfaces';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmployeeDTO: CreateEmployeeDTO) {
    this.employeesService.create(createEmployeeDTO);
  }

  @Post('clockin/:cpf')
  clockIn(@Param('cpf') cpf: string) {
    this.employeesService.clockIn(cpf);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Employee[] {
    return this.employeesService.findAll();
  }
}
