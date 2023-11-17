import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConsoleModule } from 'nestjs-console';

@Module({
  controllers: [AppController],
  imports: [
    ConsoleModule,
  ],
})
export class AppModule {}
