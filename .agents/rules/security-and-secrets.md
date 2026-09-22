# Politica de Seguridad y Proteccion de Secretos

En todo el ecosistema de OpenMad, se debe cumplir estrictamente la regla de **Cero Secretos en Codigo (Zero-Secrets in Code)**:

## 1. Prohibicion de Secretos en el Repositorio
- **Nunca** comitear archivos de entorno reales: `.env`, `.env.local`, `.env.production`, `.env.staging`, etc.
- **Nunca** escribir en duro (hardcoded) en archivos `.ts`, `.js`, `.json` o `.md`:
  - Claves de API (Google, OpenAI, AWS, Stripe, etc.).
  - Contraseñas o cadenas de conexión a bases de datos (`postgresql://usuario:contrasena@...`).
  - Tokens JWT o secretos de firma (`JWT_SECRET`).
  - Llaves privadas o certificados (`*.pem`, `*.key`).

## 2. Uso de Plantillas .env.example
- Cada aplicación o servicio debe mantener un archivo `.env.example` actualizado con valores de ejemplo no funcionales (por ejemplo: `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/openmad_db?schema=public"`).
- Al agregar una nueva variable de entorno, es obligatorio documentarla en `.env.example` y validar su esquema con `Zod` en `env.schema.ts`.

## 3. Datos de Prueba y Semillero (Seeding)
- Los datos públicos de catálogo institucional residen en formato JSON estructurado en `backend/prisma/data/catalogo-unamad.json`.
- Si se requieren datos privados para pruebas locales, se deben colocar en `backend/prisma/data/local/seed.json` (directorio ignorado por Git).
- No se deben subir volcados `.sql` ni registros reales de estudiantes al repositorio.

## 4. Validacion Continua
- El hook local de Husky previene el commit accidental de archivos de entorno o llaves privadas.
- En GitHub Actions, el flujo de seguridad ejecuta **Gitleaks** para auditar cada Pull Request antes de su integración.
