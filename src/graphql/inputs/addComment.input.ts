import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddCommentInput {
  @Field()
  body: string;

  @Field()
  postId: number;
}
