# OpenMad

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Licencia-MIT-green.svg?style=for-the-badge" alt="Licencia MIT" />
</p>

Repositorio oficial de **OpenMad**, plataforma diseñada para centralizar, guiar y optimizar el acceso a la información sobre trámites académicos y administrativos para los estudiantes de la Universidad Nacional Amazónica de Madre de Dios (UNAMAD).

- **Sitio Oficial:** [openmad.nikelyh.tech](https://openmad.nikelyh.tech)
- **Entorno de Pruebas:** [openmad.vercel.app](https://openmad.vercel.app)

---

## Arquitectura del Monorepo

El repositorio está estructurado como un monorepo para gestionar de forma centralizada las aplicaciones frontend, los servicios backend y la documentación del ecosistema:

```text
openmad/
├── apps/
│   ├── vanilla/     # Cliente web inicial en Vanilla JS + Vite
│   ├── web/         # Aplicación web principal en React (planificada)
│   └── mobile/      # Aplicación móvil nativa (planificada)
├── backend/         # API REST y servicios con NestJS, Arquitectura Hexagonal y Prisma
└── docs/            # Documentación general y arquitectura del sistema
```

---

## Stack Tecnológico Global

| Capa | Tecnologías |
| :--- | :--- |
| **Backend** | NestJS, TypeScript, NodeNext ESM, Vitest, Oxlint |
| **Persistencia** | PostgreSQL, Prisma ORM |
| **Frontend Actual** | JavaScript (ES Modules), Vite, CSS Nativo |
| **Arquitectura** | Arquitectura Hexagonal (Puertos y Adaptadores), Clean Architecture |
| **Herramientas Git** | Husky, Commitlint (Conventional Commits) |

---

## Requisitos Previos

- Node.js versión 20.0.0 o superior
- npm versión 10.0.0 o superior
- Git

---

## Instalación y Configuración Inicial

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/openmad.git
   cd openmad
   ```

2. Instalar dependencias globales del monorepo (configura hooks de Husky):
   ```bash
   npm install
   ```

3. Configurar la plantilla de mensajes de confirmación (commits):
   ```bash
   git config commit.template .gitmessage
   ```

---

## Desarrollo por Módulo

Para ejecutar o contribuir a un componente específico, navegue a su directorio:

- **Frontend (Vanilla JS):**
  ```bash
  cd apps/vanilla
  npm install
  npm run dev
  ```

- **Backend (NestJS API):**
  ```bash
  cd backend
  npm install
  npm run start:dev
  ```

---

## Estándares del Proyecto

- **Commits:** Se exige el estándar de [Conventional Commits](https://www.conventionalcommits.org/).
- **Base de Datos:** Todos los nombres de tablas y campos deben estar en español respetando el formato estándar (`snake_case` para PostgreSQL y `@map`/`@@map` en Prisma).
- **Formato:** Configuración unificada mediante [.editorconfig](.editorconfig).

Para más detalles, consulte la [Guía de Contribución](CONTRIBUTING.md).

---

## Licencia

Este proyecto se distribuye bajo los términos de la Licencia MIT. Para mayor información, consulte el archivo [LICENSE](LICENSE).
