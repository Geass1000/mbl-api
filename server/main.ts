import { Transport } from '@nestjs/microservices';
import { NestFactory, } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { environment } from './environments/environment';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const microservice = app.connectMicroservice({
    transport: Transport.NATS,
    options: <any>{
      url: environment.natsUrl,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(environment.port, () => {
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
