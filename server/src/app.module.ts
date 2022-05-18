import { Module } from '@nestjs/common';
import { EmployeesController } from './models/employees.controller';
import { EmployeesService } from './models/employees.service';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class AppModule {}
