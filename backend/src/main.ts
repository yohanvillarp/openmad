import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import express from 'express';
import { AppModule, ObserveInstrument } from './app.module.js';
import { AllExceptionsFilter } from './core/infrastructure/filters/all-exceptions.filter.js';
import { setupSwagger } from './core/infrastructure/swagger/swagger.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    instrument: ObserveInstrument,
  });

  // Logger estructurado con Pino (colores y trazabilidad en consola)
  const logger = app.get(Logger);
  app.useLogger(logger);

  // Seguridad HTTP con cabeceras estándar defensivas
  app.use(helmet());

  // Protección DoS / Payload Flooding: límite estricto de tamaño de carga
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Habilitar CORS para clientes autorizados
  app.enableCors();

  // Validación y transformación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Filtro global de excepciones: previene fuga de información y unifica errores
  app.useGlobalFilters(new AllExceptionsFilter());

  // Documentación OpenAPI / Swagger en /docs
  setupSwagger(app);

  // Habilitar apagado ordenado de conexiones
  app.enableShutdownHooks();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Servidor iniciado en http://localhost:${port}`);
  logger.log(`Documentación Swagger disponible en http://localhost:${port}/docs`);
}

await bootstrap();
