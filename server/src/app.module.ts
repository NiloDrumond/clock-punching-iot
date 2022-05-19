import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmployeesController } from './models/employees/employees.controller';
import { EmployeesService } from './models/employees/employees.service';

@Module({
  imports: [HttpModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class AppModule {}
