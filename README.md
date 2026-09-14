# 🎓 OpenMad

Bienvenido al repositorio oficial de **OpenMad**, una plataforma web moderna diseñada para simplificar y optimizar el acceso a la información sobre los trámites académicos y administrativos para los estudiantes de la UNAMAD.

**Sitio Oficial:** [openmad.nikelyh.tech](https://openmad.nikelyh.tech)  
**Entorno de Pruebas:** [openmad.vercel.app](https://openmad.vercel.app)

---

## Arquitectura del Monorepo

Este proyecto está organizado en un formato de **Monorepo**. Esto nos permite mantener de forma centralizada todas las aplicaciones y servicios que forman parte del ecosistema de OpenMad.

```text
openmad/
├── apps/
│   ├── vanilla/     # (Beta Actual) Interfaz web ultrarrápida en Vanilla JS + Vite
│   ├── web/         # (Próximamente) Aplicación web principal en React
│   └── mobile/      # (Próximamente) Aplicación nativa para dispositivos móviles
├── backend/         # (Próximamente) API y servicios backend
└── docs/            # Documentación general y guías de arquitectura
```

## Configuración Inicial Rápida

Si deseas correr el proyecto localmente o contribuir al código fuente, sigue estos pasos desde la raíz del proyecto.

### Requisitos Previos
- Node.js v18 o superior.
- Git.

### Instalación
```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/openmad.git

# 2. Entra al directorio
cd openmad

# 3. Instala dependencias globales (incluye Husky y Commitlint)
npm install
```

## ¿Cómo contribuir?

¡Las contribuciones son bienvenidas! Por favor, revisa nuestra [Guía de Contribución (CONTRIBUTING.md)](./CONTRIBUTING.md) para entender nuestras reglas de código, formato de Commits y plantillas de Pull Requests.

## Licencia

Este proyecto se distribuye bajo los términos de la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
