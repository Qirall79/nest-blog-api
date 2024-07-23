import { Field, ObjectType } from '@nestjs/graphql';

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
}
