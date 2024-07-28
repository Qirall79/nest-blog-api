/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../responses/post.response';
import { UseGuards } from '@nestjs/common';
import { GraphqlSessionGuard } from '../guards/graphqlSession.guard';
import { AddPostInput } from '../inputs/addPost.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from 'src/entities/post.entity';
import { User, User as UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Resolver((of) => Post)
@UseGuards(GraphqlSessionGuard)
export class PostsResolver {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @Mutation((type) => Post, { nullable: true })
  async addPost(
    @Args('input') input: AddPostInput,
    @Context() ctx,
  ): Promise<Post> {
    const authorId = ctx.req.auth.uid;
    const newPost = this.postsRepository.create({
      userId: authorId,
      title: input.title,
      body: input.title,
    });

    return await this.postsRepository.save(newPost);
  }

  @Query((type) => [Post])
  async getPosts(@Context() ctx): Promise<Post[]> {
    const authorId = ctx.req.auth.uid;
    const posts = await this.postsRepository.findBy({
      userId: authorId,
    });

    return posts;
  }

  @ResolveField()
  async author(@Parent() post: Post): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      uid: post.userId,
    });

    return user;
  }
}
