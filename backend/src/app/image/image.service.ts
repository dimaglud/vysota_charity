import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { Project } from '@app/project/project.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}
      
  getImages(): Promise<Image[]> {
    return this.imagesRepository.find();
  }
      
  async getImage(id: number): Promise<Image> {
    return await this.imagesRepository.findOneBy({ id });
  }

  getImageContent(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  createImage(file: Express.Multer.File, project: Project): Promise<Image> {
    let entity = new Image();
    entity.content = file.buffer.toString('base64');
    entity.name = file.originalname;
    entity.mimeType = file.mimetype;
    entity.project = project;

    return this.imagesRepository.save(entity);
  }
}
