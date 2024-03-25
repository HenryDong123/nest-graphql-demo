// src/user/user.resolver.ts

import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';
import { Pet } from '../pet/pet.entity'; // 确保路径正确
import { PetService } from '../pet/pet.service'; // 确保导入PetService

const pubSub = new PubSub(); // 创建PubSub实例来发布和订阅事件
@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private readonly petService: PetService,
  ) {}

  @Query((returns) => [User])
  users(): User[] {
    return this.userService.findAll();
  }

  @Query((returns) => User, { nullable: true })
  user(@Args('id') id: number): User {
    return this.userService.findOneById(id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): User {
    return this.userService.createUser(createUserInput);
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    // 调用服务层的方法更新用户，并获取更新后的用户信息
    const updatedUser = this.userService.updateUser(
      updateUserInput.id,
      updateUserInput,
    );

    // 发布更新事件
    await pubSub.publish('userUpdated', {
      userUpdated: updatedUser,
    });

    return updatedUser;
  }

  @Subscription((returns) => User, {
    // 过滤函数，只有当更新的用户ID与订阅中提供的ID匹配时，才会发送更新
    filter: (payload, variables) => payload.userUpdated.id === variables.id,
  })
  userUpdated(@Args('id') id: number) {
    return pubSub.asyncIterator('userUpdated');
  }

  @ResolveField('pets', (returns) => [Pet])
  getPets(@Parent() user: User): Pet[] {
    return this.petService.findAllByUserId(user.id);
  }
}
