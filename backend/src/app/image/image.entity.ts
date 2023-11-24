import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';

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

  @ManyToOne(() => Project, (project) => project.images)
  project: Project;
}