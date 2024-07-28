/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.response';

@ObjectType()
export class Comment {
  @Field()
  id: number;

  @Field()
  body: string;

  @Field()
  userId: string;

  @Field((type) => User, { nullable: true })
  author: User;
}
