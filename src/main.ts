import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: 'twitter_queue',
    },
  });

  app.listen(() => {
    console.log('Microservice is listening');
  });

  const app_heroku = await NestFactory.create(AppModule);
  await app_heroku.listen(process.env.PORT || 4000);
}
bootstrap();
