import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { Project } from '@app/project/project.entity';
import { ProjectDTO } from '@app/project/dto/project.dto';

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(@Query("isActive") isActive: string = null): Promise<Project[]> {
    const projects = await this.projectService.getProjects(isActive == "true");
    return projects;
  }

  @Get(":id")
  async getProject(@Param("id") id: number): Promise<Project> {
    const project = await this.projectService.getProject(id);
    return project;
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
