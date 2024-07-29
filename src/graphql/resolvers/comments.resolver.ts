/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Comment } from '../responses/comment.response';
import { AddCommentInput } from '../inputs/addComment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment as CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { GraphqlSessionGuard } from '../guards/graphqlSession.guard';
import { User } from '../responses/user.response';
import { User as UserEntity } from 'src/entities/user.entity';

@Resolver((of) => Comment)
@UseGuards(GraphqlSessionGuard)
export class CommentResolver {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @Mutation(() => Comment)
  async addComment(
    @Args('input') input: AddCommentInput,
    @Context() ctx,
  ): Promise<Comment> {
    const authorId = ctx.req.auth.uid;
    const user = await this.usersRepository.findOneBy({
      uid: authorId,
    });
    const { body, postId } = input;

    const comment = this.commentsRepository.create({
      userId: authorId,
      body,
      post: {
        id: postId,
      },
    });

    return await this.commentsRepository.save(comment);
  }

  @Mutation(() => Boolean)
  async deleteComment(@Args('commentId') commentId: number) {
    try {
      await this.commentsRepository.delete({
        id: commentId,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  @ResolveField()
  async author(@Parent() comment: Comment): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      uid: comment.userId,
    });

    return user;
  }
}
