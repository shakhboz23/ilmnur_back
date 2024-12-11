"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const PORT = process.env.PORT || 4200;
        app.enableCors();
        app.setGlobalPrefix('api');
        app.use(cookieParser());
        const server = app.getHttpServer();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('IlmNur')
            .setDescription('REST API')
            .setVersion('1.0.0')
            .addTag('NodeJS, NestJS, Postgres, sequelize')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/', app, document, {
            swaggerOptions: {
                docExpansion: 'none',
            },
        });
        await app.listen(PORT, () => {
            console.log('Server listening on port', PORT);
        });
    }
    catch (error) {
        throw new common_1.BadRequestException(error.message);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map