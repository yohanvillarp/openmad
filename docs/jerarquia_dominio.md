# Jerarquia del Dominio Gamificado

Este documento define la nomenclatura oficial para la interfaz de usuario y la logica de negocio del sistema, estructurada en el orden jerarquico: Ruta -> Modulo -> Paso -> Hito.

## 1. Ruta
**Definicion y Proposito:**
La Ruta representa el proceso padre o megaproceso. Es el objetivo academico mas grande y de largo plazo que persigue el estudiante. Sirve para agrupar bajo un mismo paraguas procedimental todos los requisitos, pagos y validaciones necesarios para obtener un grado academico o finalizar un tramite institucional complejo.

**Posibles Casos de Uso:**
- Ruta para adquisicion de Bachiller.
- Ruta para adquisicion de Titulo Profesional.
- Ruta de traslado interno o externo.
- Ruta de reincorporacion academica.
- Ruta de egreso.

## 2. Modulo
**Definicion y Proposito:**
El Modulo es un proceso hijo o proceso anidado dentro de una Ruta. Sirve para encapsular un conjunto de requisitos que por si solos conforman un proceso complejo con multiples dependencias. Permite al estudiante enfocarse en un bloque tematico especifico sin abrumarse por la Ruta completa. Un Modulo debe completarse para desbloquear las etapas finales de su Ruta contenedora.

**Posibles Casos de Uso:**
- Modulo de validacion de Responsabilidad Social.
- Modulo de acreditacion de Idioma Extranjero.
- Modulo de validacion de Practicas Pre-Profesionales.
- Modulo de presentacion y aprobacion de Proyecto de Tesis.
- Modulo de subsanacion de creditos extracurriculares.

**Recursividad (Modulos dentro de Modulos):**
Es perfectamente posible y comun que un Modulo contenga otros Modulos (sub-modulos). 

*Ejemplo de la vida real:* 
El "Modulo de Aprobacion de Tesis" es enorme. Dentro de el, existen:
1. El "Sub-modulo de Revision por Jurados" (que contiene los pasos para que 3 profesores distintos aprueben).
2. El "Sub-modulo de Sustentacion Oral" (que contiene pasos como agendar fecha, pagar derecho de defensa, y emitir acta).

*Como se adapta esto (Tecnica y Visualmente):*
- **A nivel de Codigo (Backend):** Gracias al patron de diseño "Composite" que rige el grafo, un Modulo guarda internamente una lista de Nodos. El backend no hace distincion: si le insertas un Paso o le insertas otro Modulo adentro, lo tratara igual. Validara que el Modulo padre este completado solo cuando todos sus Modulos hijos y Pasos internos esten completados.
- **A nivel Visual (React Flow / UX):** Un Modulo anidado se representa en el mapa principal como un Nodo Circular especial. Cuando el estudiante hace doble clic en el, hace un "zoom in" (como entrar a una carpeta) y el lienzo de React Flow cambia para mostrar unicamente el sub-grafo de ese modulo especifico. La interfaz mostrara unas "migajas de pan" (Breadcrumbs) en la parte superior: *Ruta de Titulacion > Modulo de Tesis > Modulo de Jurados*.

## 3. Paso
**Definicion y Proposito:**
El Paso es la unidad mas atomica del grafo. Representa una accion simple, directa y ejecutable que el estudiante debe realizar. Sirve para trackear el progreso granular. Los Pasos pueden tener atributos especificos como costos (tarifas TUPA), ventanas de validez (fechas de caducidad) y plantillas de documentos descargables. Otorgan puntos de experiencia menores al completarse.

**Posibles Casos de Uso:**
- Pago de derecho de tramite TUPA por caja o plataforma virtual.
- Entrega de fotografias tamaño pasaporte.
- Presentacion de Constancia de No Adeudo (biblioteca, laboratorios, clinica).
- Llenado y firma de Formulario Unico de Tramite (FUT).
- Carga de archivo PDF con informe final.
- Aprobacion de dictamen por parte del asesor.

## 4. Hito
**Definicion y Proposito:**
El Hito es un nodo especial que marca el final exitoso de un Modulo complejo o de una Ruta completa. No requiere una accion directa del estudiante, sino que se desbloquea automaticamente cuando se cumplen todos los Pasos y Modulos previos. Sirve como un punto de control (checkpoint) que otorga una gran cantidad de puntos de experiencia, dispara las celebraciones visuales (confeti) en la interfaz y formalmente habilita al estudiante para iniciar la siguiente Ruta.

**Posibles Casos de Uso:**
- Emision de Resolucion Decanal de Bachillerato.
- Entrega oficial de Diploma de Titulo Profesional.
- Aprobacion definitiva de Expediente de Grado.
- Cierre y conformidad del Modulo de Responsabilidad Social.
