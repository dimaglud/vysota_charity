import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from 'src/db/project.entity';

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return await this.projectService.getProjects();
  }

  @Get("test")
  getProjectTest(): string {
    return "await this.projectService.getProjects()";
  }
}
