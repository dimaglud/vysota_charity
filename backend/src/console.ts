import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    Logger.error(e);
    await app.close();
    process.exit(1);
  }
});
