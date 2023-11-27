import { Controller, Get, Post, Param, StreamableFile, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Image } from '@app/image/image.entity';
import { ProjectService } from '@app/project/project.service';

@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService
  //  , private readonly projectService: ProjectService 
  ) {}

  @Post("/project/:projectId")
  @UseInterceptors(FileInterceptor('file'))
  async createImage(@Param() projectId: number, @UploadedFile() file: Express.Multer.File) {
    await this.imageService.createImage(file, projectId);
  }

  @Get("project/:projectId")
  @UseInterceptors(FileInterceptor('file'))
  async getProjectImages(@Param("id") id: number): Promise<StreamableFile> {
    let image = await this.imageService.getImage(id);
    let buffer = Buffer.from(image.content, 'base64');
    return new StreamableFile(buffer, { type: image.mimeType })
  }

  @Get("content/project/:projectId")
  @UseInterceptors(FileInterceptor('file'))
  async getProjectImageContent(@Param("id") projectId: number): Promise<StreamableFile> {
    let image = await this.imageService.getMainProjectImage(projectId);
    let buffer = Buffer.from(image.content, 'base64');
    return new StreamableFile(buffer, { type: image.mimeType })
  }

  @Get("content/:id")
  async getImageContent(@Param("id") id: number): Promise<StreamableFile> {
    let image = await this.imageService.getImage(id);
    let buffer = Buffer.from(image.content, 'base64');
    return new StreamableFile(buffer, { type: image.mimeType })
  }
}
