/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from './post.response';

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  uid: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  picture: string;

  @Field((type) => [Post], { nullable: true })
  posts: Post[];
}
