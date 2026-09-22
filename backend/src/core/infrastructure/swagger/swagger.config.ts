import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('OpenMad API')
    .setDescription(
      'Documentación interactiva de la API REST de OpenMad para trámites académicos de la UNAMAD.',
    )
    .setVersion('1.0.0')
    .addTag('Health', 'Diagnóstico y estado operativo del servicio')
    .addTag('Trámites', 'Gestión y consulta de trámites académicos y requisitos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'OpenMad API - Swagger Docs',
  });
}
