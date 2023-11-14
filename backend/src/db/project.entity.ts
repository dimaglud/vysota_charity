import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isEnded: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @OneToMany(() => Image, (image) => image.project)
  images: Image[]
}