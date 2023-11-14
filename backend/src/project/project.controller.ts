import { Controller, Get, Post, Body, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { Project } from 'src/db/project.entity';
import { ProjectDTO } from 'src/dto/project.dto';

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return await this.projectService.getProjects();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProject(@Body() project: ProjectDTO, @UploadedFile() file: Express.Multer.File) {
    await this.projectService.createProject(project, file);
  }

  @Get("test")
  getProjectTest(): string {
    return "await this.projectService.getProjects()";
  }
}
