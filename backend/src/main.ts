import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const bootstrap = async () => {
  const logLevel = process.env.APP_DEBUG ? 'debug' : 'log';
  const app = await NestFactory.create(
    AppModule,
    process.env.NODE_ENV === 'production'
      ? {
          logger: WinstonModule.createLogger({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.errors({ stack: true }),
              winston.format.splat(),
              winston.format.json(),
            ),
            transports: [new winston.transports.Console()],
            level: logLevel,
          }),
        }
      : { logger: [logLevel] },
  );

  app.enableCors();

  await app.listen(process.env.BACKEND_PORT || 4000).then(() => {
    Logger.log(`🚀 Server is ready: ${process.env.APP_BACKEND_URL}`);
  });
};

(async () => {
  try {
    await bootstrap();
  } catch (e: unknown) {
    Logger.error('Error on starting an application');
    throw e;
  }
})();
