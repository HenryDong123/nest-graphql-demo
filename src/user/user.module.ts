import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PetModule } from '../pet/pet.module'; // 确保路径正确
@Module({
  imports: [PetModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
