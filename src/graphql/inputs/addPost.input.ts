import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddPostInput {
  @Field()
  title: string;

  @Field()
  body: string;
}
