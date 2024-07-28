/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EditPostInput {
  @Field((type) => Int)
  postId: number;

  @Field()
  title: string;

  @Field()
  body: string;
}
