import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastestValidatorPipe } from '@nest-up/nest-fastest-validator';

import { AppModule } from './app/app.module';
import { PrismaService } from './prisma';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new FastestValidatorPipe({
      transformToClass: true,
      httpErrorStatusCode: HttpStatus.BAD_REQUEST
    })
  );

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
