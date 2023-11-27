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

  getProjects(isActive: boolean = null): Promise<Project[]> {
    if (isActive == null)
      return this.projectsRepository.find({ order: { createdAt: "DESC" } });
    else
      return this.projectsRepository.find({ 
        where: { isActive: isActive },
        order: { createdAt: "DESC" } 
      });
  }

  getProject(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: {id}
    });
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
