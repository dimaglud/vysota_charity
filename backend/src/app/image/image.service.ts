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
      
  async getProjectImages(projectId: number): Promise<Image[]> {
    return this.imagesRepository.find({
      where: { 
        project: { id: projectId }
      },
      select: {
        id: true,
        index: true,
        name: true
      },
      order: {
        index: "ASC"
      }
    });
  }
      
  async getImage(id: number): Promise<Image> {
    return await this.imagesRepository.findOneBy({ id });
  }
      
  async getMainProjectImage(projectId: number): Promise<Image> {
    return await this.imagesRepository.findOne({ 
      where: { 
        project: { id: projectId } 
      },
      order: {
        index: "ASC"
      } 
    });
  }
      
  getImageContent(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  async createImage(file: Express.Multer.File, projectId: number, index: number = null): Promise<Image> {
    if (index === null) {
      const image = await this.imagesRepository.findOne({ 
        where: { 
          project: { id: projectId } 
        },
        order: {
          index: "DESC"
        } 
      });

      index = image ? image.index + 1 : 0;
    }
    
    let entity = new Image();
    entity.content = file.buffer.toString('base64');
    entity.name = file.originalname;
    entity.index = index;
    entity.mimeType = file.mimetype;


    const project = new Project();
    project.id = projectId;
    entity.project = project;

    return this.imagesRepository.save(entity);
  }
}
