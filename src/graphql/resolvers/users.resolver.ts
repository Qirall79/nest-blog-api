/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { GraphqlSessionGuard } from '../guards/graphqlSession.guard';
import { User } from '../responses/user.response';
import { User as UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver((of) => User)
@UseGuards(GraphqlSessionGuard)
export class UsersResolver {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<UserEntity>,
  ) {}

  @Query(() => User, { nullable: true })
  async getCurrentUser(@Context() ctx): Promise<User> {
    const req = ctx.req;
    const user = await this.usersRepository.findOneBy({
      uid: req.auth.uid,
    });

    return {
      id: user.id,
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };
  }
}
