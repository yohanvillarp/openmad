# OpenMad - Cliente Web Vanilla JS

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript ES6+" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
</p>

Aplicación web inicial orientada a rendimiento y ligereza para la consulta de información académica de la plataforma OpenMad.

---

## Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Lenguaje** | Vanilla JavaScript (ES Modules nativos) |
| **Empaquetador y Servidor Local** | Vite |
| **Hojas de Estilo** | CSS3 Nativo (Variables CSS y diseño responsivo) |
| **Iconografía** | Lucide Icons |
| **Formularios de Contacto** | Integración asíncrona mediante Pageclip |

---

## Estructura del Código

La lógica del cliente se encuentra modularizada para facilitar su mantenimiento y desacoplamiento:

```text
apps/vanilla/
├── components/      # Componentes UI reutilizables (Navbar, Footer, Tarjetas)
├── mocks/           # Datos y estructuras estáticas de referencia
├── pages/           # Vistas de la aplicación (Inicio, FAQ, Contacto)
├── utils/           # Utilidades de soporte y enrutamiento interno
├── public/          # Activos estáticos servidos directamente
├── index.html       # Punto de entrada HTML y metadatos SEO
└── script.js        # Enrutador principal e inicialización de la aplicación
```

---

## Configuración y Desarrollo Local

1. Navegar al directorio de la aplicación:
   ```bash
   cd apps/vanilla
   ```

2. Instalar las dependencias de desarrollo:
   ```bash
   npm install
   ```

3. Configurar las variables de entorno:
   Crear un archivo `.env` en la raíz de `apps/vanilla/` y especificar la clave de integración de Pageclip:
   ```env
   VITE_PAGECLIP_SITE_KEY=tu_clave_de_pageclip_aqui
   ```
   *Nota: Este paso es opcional en desarrollo local*

4. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación estará accesible en `http://localhost:5173`.

---

## Compilación para Producción

Para generar el paquete optimizado y minificado para distribución:

```bash
npm run build
```

Los archivos finales para despliegue se generarán en el directorio `dist/`.
