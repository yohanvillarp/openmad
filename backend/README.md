# OpenMad Backend

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

Servicio de API REST para la plataforma **OpenMad**, enfocado en la consulta, validación y gestión de trámites académicos y administrativos para los estudiantes de la Universidad Nacional Amazónica de Madre de Dios (UNAMAD).

---

## Arquitectura del Sistema: Hexagonal (Puertos y Adaptadores)

El diseño del backend sigue el patrón de **Arquitectura Hexagonal (Clean Architecture / Ports & Adapters)**. Este enfoque desacopla la lógica y las reglas de negocio del framework NestJS, de los protocolos de transporte y del motor de persistencia.

```text
src/
├── core/                               # Núcleo y Kernel Compartido
│   ├── domain/                         # Primitivas de Dominio
│   │   ├── entity.base.ts              # Clase base Entity<TId>
│   │   ├── domain-exception.base.ts    # Clase base DomainException
│   │   ├── result.ts                   # Patrón Result tipado
│   │   └── ports/                      # Puertos de kernel
│   │       └── unit-of-work.port.ts    # Puerto de Unidad de Trabajo / Transacciones
│   └── infrastructure/                 # Adaptadores transversales
│       ├── config/                     # Validación de entorno con Zod (env.schema.ts)
│       ├── database/                   # Ciclo de vida y transacciones (prisma.service.ts, prisma-unit-of-work.adapter.ts)
│       ├── filters/                    # Filtros de excepciones (all-exceptions.filter.ts, domain-exception.filter.ts)
│       └── swagger/                    # Configuración de documentación OpenAPI (swagger.config.ts)
├── modules/
│   ├── health/                         # Diagnóstico y salud con @nestjs/terminus (/health)
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   └── tramites/                       # Bounded Context: Trámites Académicos UNAMAD
│       ├── domain/                     # Capa 1: Reglas de Negocio Puras
│       │   ├── entities/               # Entidades de dominio (Tramite, Requisito)
│       │   ├── exceptions/             # Excepciones de negocio (TramiteNoEncontradoException)
│       │   └── ports/                  # Puertos de Salida / Driven Ports (TramiteRepositoryPort)
│       ├── application/                # Capa 2: Casos de Uso y Orquestación
│       │   ├── dtos/                   # DTOs de salida y funciones de mapeo
│       │   └── use-cases/              # Casos de uso (ObtenerTramites, ObtenerTramitePorId)
│       └── infrastructure/             # Capa 3: Adaptadores
│           ├── adapters/               # Adaptadores Secundarios (In-Memory, Prisma / PostgreSQL)
│           │   ├── in-memory/          # Implementación en memoria para desarrollo y pruebas
│           │   └── prisma/             # Implementación con Prisma ORM
│           └── controllers/            # Adaptadores Primarios (Controladores HTTP NestJS)
│               └── dtos/               # DTOs con validación class-validator y OpenAPI
│       └── tramites.module.ts          # Configuración IoC / Inyección de Dependencias
├── app.module.ts                       # Módulo raíz de la aplicación
└── main.ts                             # Bootstrap con Pino, Helmet, límites DoS, ValidationPipe y Swagger
```

---

## Seguridad y Resiliencia Implementadas

1. **Filtro Global de Excepciones (`AllExceptionsFilter`)**:
   - Captura cualquier excepción no controlada en tiempo de ejecución.
   - Registra el stack trace completo y parámetros en **Pino** para análisis interno.
   - Devuelve al cliente una respuesta segura (`500 INTERNAL_SERVER_ERROR`) sin exponer detalles de base de datos ni rutas del servidor.
2. **Protección DoS y Límite de Tamaño de Carga**:
   - Límite de carga estricto de `10MB` en `express.json` y `express.urlencoded`.
3. **Cabeceras Defensivas HTTP**:
   - `helmet` configurado en el bootstrap para mitigar ataques web comunes (XSS, clickjacking).
4. **Rate Limiting (Control de Tasa)**:
   - `@nestjs/throttler` configurado globalmente para evitar saturación de peticiones por IP (`100` peticiones/minuto por defecto).
5. **Transacciones Atómicas en Dominio (`UnitOfWorkPort`)**:
   - Permite coordinar múltiples operaciones de base de datos de manera atómica sin acoplar los casos de uso al cliente de Prisma.

---

## Entorno de Desarrollo y Productividad (DX)

### Semillero de Datos Automático (Database Seeding)
El archivo `prisma/seed.ts` contiene los datos oficiales de la UNAMAD (Facultades, Escuelas y Trámites base) listos para insertarse con un comando:
```bash
npm run db:seed
```

### Comandos Estándar

```bash
# Servidor de desarrollo con recarga en caliente
npm run start:dev

# Base de datos y Prisma
npm run db:generate   # Genera el cliente Prisma
npm run db:migrate    # Aplica migraciones pendientes
npm run db:push       # Sincroniza el esquema con PostgreSQL sin historial de migración
npm run db:studio     # Abre la interfaz visual de Prisma Studio
npm run db:seed       # Ejecuta el semillero de datos iniciales

# Pruebas y Calidad
npm run lint          # Análisis estático con oxlint
npm test              # Pruebas unitarias con Vitest
npm run test:e2e      # Pruebas de integración e2e con Vitest + Supertest
npm run build         # Compilación de producción
```

---

## Endpoints de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/docs` | Documentación interactiva Swagger OpenAPI |
| `GET` | `/health` | Diagnóstico de salud y consumo de memoria del servicio |
| `GET` | `/tramites` | Listado de trámites académicos (filtros: `facultadId`, `escuelaId`, `activo`) |
| `GET` | `/tramites/:id` | Consulta detallada de un trámite por ID o código con sus requisitos |
