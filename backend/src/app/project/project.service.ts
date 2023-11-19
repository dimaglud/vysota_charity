import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectDTO } from './dto/project.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private imageService: ImageService
  ) {}

  getProjects(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async createProject(project: ProjectDTO, file: Express.Multer.File) {
    let entity = new Project();
    entity.title = project.title;
    entity.description = project.description;
    entity.createdAt = new Date();

    let savedProject = await this.projectsRepository.save(entity);

    await this.imageService.createImage(file, savedProject);
  }
}
