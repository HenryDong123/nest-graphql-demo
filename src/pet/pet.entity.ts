import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field((type) => ID)
  ownerId: number;
}
