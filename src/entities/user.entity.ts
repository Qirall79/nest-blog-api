import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Post, (post) => post.author, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  posts: Post[];
}
