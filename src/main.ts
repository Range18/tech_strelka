import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { backendServer } from '#src/common/configs/config';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '#src/common/exception-handler/exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://technoshooter.postideas.ru',
      'https://techno-belka.vercel.app',
    ],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('ТехноСтрелка')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(backendServer.port);
}
bootstrap();
