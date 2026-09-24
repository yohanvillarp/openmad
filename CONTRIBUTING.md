# Guía de Contribución para OpenMad

Gracias por su interés en contribuir a OpenMad.

Este documento describe nuestras convenciones de desarrollo, la estructura del proyecto y los pasos necesarios para configurar tu entorno local.

## Estructura del Proyecto (Monorepo)

OpenMad está estructurado como un monorepo que contiene múltiples aplicaciones y servicios:

- **`apps/vanilla`**: La versión inicial y educativa del frontend construida con Vanilla JS y empaquetada con Vite.
- **`apps/web`**: (Próximamente) La versión principal de la aplicación web construida con React.
- **`apps/mobile`**: (Próximamente) La versión para dispositivos móviles.
- **`backend/`**: La API y los servicios de base de datos que alimentarán la plataforma.
- **`docs/`**: Documentación general del proyecto y arquitectura.

## Configuración del Entorno Local

Sigue estos pasos para preparar tu entorno antes de comenzar a programar:

1. **Clona el repositorio** e ingresa a la carpeta:
   ```bash
   git clone https://github.com/tu-usuario/openmad.git
   cd openmad
   ```

2. **Instala las dependencias globales** (incluyendo Husky para los hooks de Git):
   ```bash
   npm install
   ```

3. **Configura la plantilla de Commits**:
   Obligatorio para mantener un historial limpio y legible.
   ```bash
   git config commit.template .gitmessage
   ```

## Desarrollo

Si vas a trabajar en una aplicación específica, navega a su directorio e inicia el entorno de desarrollo. Por ejemplo, para la versión Vanilla JS:

```bash
cd apps/vanilla
npm install
npm run dev
```

## Estándares y Convenciones

### 1. Convención de Commits (Conventional Commits)
Requerimos el uso de **Commits Convencionales**. Tienes un archivo `.gitmessage` en la raíz que te servirá de guía al hacer un commit. 

Estructura básica:
```text
<tipo>(<alcance opcional>): <descripción corta>
```
Ejemplos:
- `feat(vanilla): agrega nuevo módulo de trámites`
- `fix(web): corrige error visual en el navbar`
- `docs: actualiza el README principal`

### 2. Estilo de Código (EditorConfig)
Utilizamos un archivo `.editorconfig` en la raíz del proyecto para unificar el formato (2 espacios de indentación, UTF-8, etc.). Asegúrate de que tu editor de código (como VS Code) tenga instalada la extensión de EditorConfig para que respete estas reglas automáticamente.

### 3. Estrategia de Ramas (Git Branching)
Seguimos un flujo de trabajo estándar basado en ramas de integración y producción:

- **`main`**: Rama de **producción**. Contiene el código estable desplegado y validado en `openmad.nikelyh.tech`. No se realizan commits directos en `main`.
- **`develop`**: Rama principal de **desarrollo e integración**. Todo el trabajo activo del equipo se integra aquí mediante Pull Requests y se despliega de forma continua en el entorno de staging `dev.openmad.nikelyh.tech`.

Para más detalles sobre la arquitectura de despliegues, dominios y control de builds en Vercel, consulta la [Guía de Despliegues y Entornos en Vercel](docs/deployment-vercel-environments.md).

#### Flujo para Nuevas Características o Correcciones:
1. Asegúrate de estar en `develop` y con los últimos cambios:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Crea una rama descriptiva a partir de `develop`:
   ```bash
   git checkout -b feature/backend-hexagonal-architecture
   # o para correcciones:
   git checkout -b fix/error-autenticacion
   ```
3. Realiza tus cambios y haz commits siguiendo la convención de Conventional Commits.
4. Sube tu rama al repositorio remoto y abre un **Pull Request hacia `develop`**:
   ```bash
   git push -u origin feature/backend-hexagonal-architecture
   ```
5. Una vez aprobado y pasados los tests del CI, se fusionará a `develop`. Las versiones de producción se promoverán posteriormente de `develop` a `main`.

### 4. Base de Datos y Modelos (Nomenclatura en Español)
En el backend (`backend/`), todos los nombres de tablas y columnas en la base de datos (PostgreSQL / Prisma) deben estar estrictamente en **español** respetando el formato estándar:
- **Tablas:** En plural y `snake_case` (e.g. `tramites`, `requisitos_tramite`).
- **Columnas:** En `snake_case` y en español (e.g. `codigo`, `fecha_creacion`, `fecha_actualizacion`).
- **Prisma:** Se debe mapear los modelos y campos usando `@@map("nombre_tabla")` y `@map("nombre_columna")`. Para más detalles, consulta [.agents/rules/database-conventions.md](.agents/rules/database-conventions.md).

### 5. Seguridad y Manejo de Variables de Entorno
- **Cero Secretos en Git:** Nunca agregues archivos `.env`, credenciales reales o llaves privadas al control de versiones.
- **Uso de `.env.example`:** Modifica y consulta siempre `.env.example` como referencia para configurar tus variables locales.
- **Datos de Prueba:** Los datos públicos institucionales residen en `backend/prisma/data/catalogo-unamad.json`. Si utilizas datasets privados, colócalos en `backend/prisma/data/local/` (directorio ignorado en Git).
- **Validación Automática:** El proyecto cuenta con un guardián en pre-commit y un flujo de auditoría con Gitleaks en GitHub Actions para proteger al equipo contra filtraciones accidentales.

¡Gracias de nuevo por contribuir a mejorar los procesos académicos para los estudiantes de la UNAMAD!
