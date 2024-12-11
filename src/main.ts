import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import { ExpressPeerServer } from 'peer';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 4200;
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use(cookieParser()); 

    const server = app.getHttpServer(); // Get the underlying HTTP server
    // const peerServer = ExpressPeerServer(server, { path: '/peerjs' }); // Create the PeerJS server with a custom path
    // const peerServer = ExpressPeerServer(server);
    // console.log(peerServer)
    // app.use('/peerjs', peerServer); 

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const config = new DocumentBuilder()
      .setTitle('IlmNur')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, sequelize')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document, {
      swaggerOptions: {
        docExpansion: 'none', // collapse the dropdown by default
      },
    });
    await app.listen(PORT, () => {
      console.log('Server listening on port', PORT);
    });
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
bootstrap();
