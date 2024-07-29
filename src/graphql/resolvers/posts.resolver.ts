/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Context,
  Int,
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
import { Comment as CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { EditPostInput } from '../inputs/editPost.input';
import { Comment } from '../responses/comment.response';

@Resolver((of) => Post)
@UseGuards(GraphqlSessionGuard)
export class PostsResolver {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
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
      body: input.body,
    });

    return await this.postsRepository.save(newPost);
  }

  @Query((type) => [Post])
  async getUserPosts(@Args('authorId') authorId: string): Promise<Post[]> {
    const posts = await this.postsRepository.findBy({
      userId: authorId,
    });

    return posts;
  }

  @Query((type) => Post)
  async getPost(@Args('postId') postId: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({
      id: postId,
    });

    return post;
  }

  @Query((type) => [Post])
  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  @Mutation((type) => Post, { nullable: true })
  async editPost(
    @Args('input') input: EditPostInput,
    @Context() ctx,
  ): Promise<Post> {
    const { postId, title, body } = input;
    await this.postsRepository.update(
      {
        id: postId,
      },
      {
        title: title,
        body: body,
      },
    );

    return await this.postsRepository.findOneBy({
      id: postId,
    });
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePost(@Args('postId') postId: number) {
    try {
      await this.postsRepository.delete({
        id: postId,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  @ResolveField()
  async author(@Parent() post: Post): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      uid: post.userId,
    });

    return user;
  }

  @ResolveField()
  async comments(@Parent() post: Post): Promise<Comment[]> {
    const comments = await this.commentsRepository.findBy({
      post,
    });

    return comments;
  }
}
