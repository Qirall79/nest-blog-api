import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  author: User;
}
