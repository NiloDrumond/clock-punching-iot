import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmployeesController } from './models/employees/employees.controller';
import { EmployeesService } from './models/employees/employees.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class AppModule {}
