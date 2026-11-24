---
name: openmad-domain-hierarchy
description: Cheatsheet y guía oficial sobre la jerarquía del dominio gamificado de OpenMAD (Ruta, Módulo, Paso, Hito).
---

# Jerarquía del Dominio Gamificado en OpenMAD

Esta skill define la nomenclatura oficial y la representación estructural de la lógica de negocio y visual de OpenMAD. Siempre que debas generar código, diseñar vistas o implementar flujos interactivos (React Flow), debes apegarte estrictamente a estos 4 conceptos:

## 1. Ruta (Diamond / Rombo)
- **Concepto:** Proceso padre o megaproceso. El objetivo académico de largo plazo.
- **Función:** Agrupa bajo un mismo paraguas procedimental todos los requisitos, pagos y validaciones para obtener un grado académico.
- **Ejemplos:** Bachillerato, Título Profesional, Traslado Interno, Egreso.

## 2. Módulo (Rounded Square / Cuadrado Redondeado)
- **Concepto:** Proceso hijo anidado dentro de una Ruta.
- **Función:** Encapsula un conjunto de requisitos que conforman un proceso complejo con dependencias propias. El usuario se enfoca en este bloque sin abrumarse por la Ruta completa. Un Módulo puede contener a su vez otros sub-módulos.
- **Ejemplos:** Acreditación de Idiomas, Prácticas Pre-Profesionales, Proyecto de Tesis, Responsabilidad Social.
- **UX/UI:** En React Flow se representa como un nodo especial. Al hacer doble clic, hace un "zoom in" mostrando únicamente el sub-grafo de ese módulo con migajas de pan (breadcrumbs) para la navegación.

## 3. Paso (Circle / Círculo)
- **Concepto:** La unidad más atómica del grafo.
- **Función:** Acción simple, directa y ejecutable. Puede tener atributos como:
  - Costo (Tarifa TUPA).
  - Ventana de validez.
  - Plantillas de documentos descargables.
- **Ejemplos:** Pago TUPA, Entrega de fotografías, Constancia de No Adeudo, Llenado de FUT, Carga de PDF.

## 4. Hito (Hexagon / Hexágono)
- **Concepto:** Nodo especial que marca el éxito o punto de control (checkpoint).
- **Función:** Se desbloquea automáticamente al cumplir todos los Pasos y Módulos previos. Otorga gran cantidad de experiencia, lanza celebraciones visuales (confeti) y habilita la siguiente Ruta.
- **Ejemplos:** Emisión de Resolución Decanal, Entrega de Diploma de Título, Cierre del Módulo de Responsabilidad Social.

### Consideraciones Técnicas
- **Tipado Base (`Tramite`):** En Typescript, utiliza el campo discriminador o tipo (`tipoNodo`) para renderizar el componente adecuado (`NodoRuta`, `NodoModulo`, `NodoPaso`, `NodoHito`).
- **Estado Visual:** Asegúrate de mapear siempre visualmente el estado: `LOCKED`, `AVAILABLE`, `IN_PROGRESS`, `COMPLETED` en los nodos de React Flow.
