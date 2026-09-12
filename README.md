# OpenMad

OpenMad es una guía web para estudiantes de la Universidad Nacional Amazónica de Madre de Dios. Organiza procesos académicos en rutas, módulos, pasos y mini tareas para que cada estudiante pueda consultar instrucciones y registrar su avance.

El proyecto se encuentra en fase beta y no está afiliado ni respaldado oficialmente por la UNAMAD.

## Funciones principales

- Rutas académicas organizadas por módulos y pasos.
- Guía de prácticas preprofesionales para Ingeniería de Sistemas e Informática.
- Mini tareas que pueden marcarse y desmarcarse.
- Registro local de pasos, módulos, rutas y XP.
- Buscador de rutas, módulos e instrucciones.
- Perfil con el resumen del progreso.
- Diseño adaptable para computadoras y dispositivos móviles.

Actualmente, la ruta de prácticas preprofesionales contiene información detallada. Las demás rutas permanecen bloqueadas hasta que su contenido sea publicado.

## Tecnologías

El proyecto utiliza HTML, CSS y JavaScript sin frameworks ni backend. El progreso se almacena en `localStorage` dentro del navegador.

## Ejecución local

Puedes abrir `index.html` directamente o iniciar un servidor estático desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después, abre `http://localhost:8000` en el navegador.

## Organización

- `mock-*`: contenido de rutas, módulos, pasos y preguntas.
- `util-*`: progreso, XP, búsqueda y utilidades compartidas.
- `comp-*`: componentes reutilizables e interacciones.
- `page-*`: vistas principales de la aplicación.
- `style.css`: variables y estilos globales.
- `app.css`: estilos de componentes y páginas.

## Consideraciones

Los costos, plazos, formatos y requisitos mostrados son referenciales. Antes de realizar un trámite, confirma la información mediante los canales oficiales de la universidad.

Los datos de progreso permanecen únicamente en el navegador utilizado. Limpiar los datos del sitio o cambiar de navegador puede eliminar el avance guardado.

## Autor

Desarrollado por [Nikel](https://github.com/yohanvillarp).
