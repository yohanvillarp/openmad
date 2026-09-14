# Guía de Contribución para OpenMad

¡Gracias por tu interés en contribuir a OpenMad! 🎉 

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

### 3. Ramas (Branches)
Crea una rama descriptiva a partir de `main` antes de realizar tus cambios:
```bash
git checkout -b feature/nuevo-diseño
# o
git checkout -b fix/error-login
```

¡Gracias de nuevo por contribuir a mejorar los procesos académicos para los estudiantes de la UNAMAD!
