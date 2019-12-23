import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const port = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Nest App listening on port ${port}\ntry 'http://0.0.0.0:${port}'`)
}

bootstrap();
