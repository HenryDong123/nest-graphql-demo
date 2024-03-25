import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'gaming',
      email: 'zhixiangmoyu@gamil.com',
    },
  ]; // 模拟数据库
  private userId = 1;

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserInput: CreateUserInput): User {
    const id = this.userId + 1;
    console.log('---------id-----', id);
    const newUser = { id, ...createUserInput };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userUpdates: UpdateUserInput): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...userUpdates };
      return this.users[userIndex];
    }
    return null;
  }
}
