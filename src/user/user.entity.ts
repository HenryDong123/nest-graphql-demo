import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Pet } from '../pet/pet.entity';
@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => [Pet], { nullable: 'itemsAndList' }) // 表示宠物列表和列表中的宠物项都可以为 null
  pets?: Pet[];
}
