/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.response';
import { Comment } from './comment.response';

@ObjectType()
export class Post {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field({ nullable: true })
  userId: string;

  @Field((type) => User, { nullable: true })
  author: User;

  @Field((type) => [Comment], { nullable: true })
  comments: Comment[];
}
