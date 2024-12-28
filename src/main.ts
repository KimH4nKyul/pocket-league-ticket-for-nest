import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  await app.listen(3000).then(() => {
    console.log(`server environment: ${process.env.NODE_ENV}`);
  });
}
bootstrap();
