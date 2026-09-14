# OpenMad - Vanilla JS Client

Esta es la aplicación Frontend inicial (Beta) de la plataforma OpenMad. Está construida enfocándose en el máximo rendimiento, con un peso sumamente ligero y cero tiempos de carga complejos.

## Stack Tecnológico

- **Framework:** Vanilla JavaScript (ES Modules nativos)
- **Empaquetador:** [Vite](https://vitejs.dev/) (Build ultrarrápido y minificación)
- **Estilos:** CSS Nativo (Variables CSS y diseño responsivo)
- **Iconos:** [Lucide Icons](https://lucide.dev/)
- **Formularios / Integraciones:** [Pageclip](https://pageclip.co/) (Gestión asíncrona de la sección de contacto)

## Estructura del Código

Toda la lógica de la aplicación se encuentra modularizada para facilitar su lectura y escalabilidad:

```text
apps/vanilla/
├── components/      # Componentes UI reutilizables (Navbar, Footer, Mini-tasks)
├── mocks/           # Datos simulados (JSON) y estructuras estáticas
├── pages/           # Vistas principales de la aplicación (Home, FAQ, Contacto)
├── utils/           # Funciones de ayuda (Manejo de progreso, Router interno)
├── public/          # Activos estáticos servidos directamente (Imágenes, Iconos)
├── index.html       # Punto de entrada de la aplicación y SEO Meta-tags
└── script.js        # Enrutador principal e inicializador
```

## Desarrollo Local

Para trabajar en esta interfaz web específica, abre tu terminal y ejecuta los siguientes comandos dentro de la carpeta de esta aplicación (`apps/vanilla`):

```bash
# 1. Instalar las dependencias locales de desarrollo (Vite)
npm install

# 2. Configurar Variables de Entorno
# Crea un archivo .env en la raíz de esta carpeta y añade la llave pública de Pageclip:
# VITE_PAGECLIP_SITE_KEY=fY0b158yF2PsTT90FruQdJ5E0mzGZ6aG

# 3. Levantar el servidor de desarrollo local
npm run dev
```
La aplicación estará disponible para previsualizar en `http://localhost:5173`.

## Compilación para Producción

Para generar una versión optimizada y minificada lista para ser desplegada en Vercel, Netlify o cualquier servidor web estático, ejecuta:

```bash
npm run build
```
Los archivos finales empaquetados se generarán en la carpeta `/dist`.
