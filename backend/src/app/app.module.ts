import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { ProjectModule } from './project/project.module'; 
import { ImageModule } from './image/image.module'; 
import baseConfig from './typeorm/typeorm-base.config';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';

@Module({
  controllers: [AppController],
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot({
      ...baseConfig,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT as unknown as number || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'vysota_charity_db',
      logger: 'advanced-console',
    }),
    ProjectModule,
    ImageModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
