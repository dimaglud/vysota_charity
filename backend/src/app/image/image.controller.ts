import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from '@app/image/image.entity';

@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get("content/:id")
  async getImageContent(@Param("id") id: number): Promise<StreamableFile> {
    let image = await this.imageService.getImage(id);
    let buffer = Buffer.from(image.content, 'base64');
    return new StreamableFile(buffer, { type: image.mimeType })
  }
}
