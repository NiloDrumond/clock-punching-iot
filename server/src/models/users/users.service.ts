import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.interfaces';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: v4(),
      password: '123456',
      username: 'teste',
    },
  ];

  create({ password, username }: CreateUserDTO) {
    const user: User = {
      id: v4(),
      username,
      password,
    };
    this.users.push(user);
  }

  findOne(username: string): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) return this.users[i];
    }
    throw new HttpException('Empregado não encontrado', HttpStatus.NOT_FOUND);
  }

  findAll(): User[] {
    return Object.values(this.users);
  }
}
