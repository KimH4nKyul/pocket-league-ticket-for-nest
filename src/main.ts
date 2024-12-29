import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

const DEFAULT_SERVER_PORT = process.env.NODE_PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  await app.listen(DEFAULT_SERVER_PORT);
}

bootstrap().then(() => {
  console.log(
    `The server started on port ${DEFAULT_SERVER_PORT} in ${process.env.NODE_ENV}.`,
  );
});
