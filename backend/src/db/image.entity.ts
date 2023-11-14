import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column({
    type: "text"
  })
  content: string;
}