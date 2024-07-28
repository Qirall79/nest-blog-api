/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.response';

@ObjectType()
export class Post {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  userId: string;

  @Field((type) => User, { nullable: true })
  author: User;
}
