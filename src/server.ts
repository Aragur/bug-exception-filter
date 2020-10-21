import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApiErrorFilter } from './app/filters/api-error.filter';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: false, // Set to true to activate the built in logger
            ignoreTrailingSlash: true,
            maxParamLength: 300,
        }),
    );

    app.useGlobalFilters(new ApiErrorFilter());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(8080, '0.0.0.0');
}
bootstrap();