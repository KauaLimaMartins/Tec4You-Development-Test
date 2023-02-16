import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://master.dkns4bwsivz.amplifyapp.com',
  });

  await app.listen(8000);
}
bootstrap();
