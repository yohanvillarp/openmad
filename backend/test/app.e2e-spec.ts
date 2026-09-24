import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

describe('OpenMad Backend API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET) debe responder status ok con diagnostico de memoria', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(response.body.status).toBe('ok');
    expect(response.body.info).toHaveProperty('memoria_heap');
  });

  it('/tramites (GET) debe listar los tramites iniciales', async () => {
    const response = await request(app.getHttpServer())
      .get('/tramites')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('codigo');
    expect(response.body[0]).toHaveProperty('titulo');
  });

  it('/tramites/:id (GET) debe retornar un tramite por su codigo', async () => {
    const response = await request(app.getHttpServer())
      .get('/tramites/practicas-preprofesionales')
      .expect(200);

    expect(response.body.codigo).toBe('practicas-preprofesionales');
    expect(response.body.requisitos.length).toBeGreaterThan(0);
  });

  afterEach(async () => {
    await app.close();
  });
});
