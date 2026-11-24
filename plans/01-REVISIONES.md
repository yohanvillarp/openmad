# OpenMad — Especificación conceptual del análisis preventivo de informes PPP

> Documento de conocimiento derivado del prototipo experimental de análisis de Informes de Prácticas Pre-Profesionales.
>
> Este documento **no define una arquitectura de software, estructura de carpetas, clases, endpoints ni implementación concreta**.
>
> Su propósito es conservar los conocimientos, decisiones, errores descubiertos, principios de validación y requisitos funcionales que deberán considerarse cuando esta capacidad sea reconstruida e integrada al sistema dinámico de OpenMad y a su Manager.

---

# 1. Propósito

OpenMad busca reducir la fricción que experimenta el estudiante al interactuar con procedimientos académico-administrativos.

Dentro de ese propósito, el análisis de Informes de Prácticas Pre-Profesionales (PPP) constituye un caso de uso experimental:

> Analizar preventivamente un informe antes de su revisión formal, utilizando conocimiento institucional y antecedentes históricos, explicando qué aspectos pueden comprobarse automáticamente y cuáles requieren revisión humana.

El sistema **no sustituye a la comisión revisora**, no aprueba informes y no debe presentar sus resultados como decisiones institucionales.

Su función es preventiva y explicativa.

---

# 2. Objetivo del experimento realizado

El prototipo buscó responder inicialmente:

> ¿Es posible detectar preventivamente problemas en un Informe de Prácticas Pre-Profesionales utilizando reglas institucionales y conocimiento obtenido de observaciones históricas, sin utilizar IA generativa?

El experimento permitió comprobar que una parte del procedimiento puede analizarse determinísticamente, pero también reveló límites importantes.

Los principales aprendizajes fueron:

1. una norma no es equivalente a una observación histórica;
2. una observación histórica no es necesariamente un criterio aplicado consistentemente;
3. una coincidencia estructural no implica una equivalencia semántica;
4. ausencia de evidencia no equivale a cumplimiento;
5. el sistema debe poder declarar que no sabe;
6. las fuentes institucionales pueden contener ambigüedades o inconsistencias;
7. la extracción documental y la evaluación deben mantenerse conceptualmente separadas;
8. los patrones deben calcularse sobre casos independientes, no sobre cantidad bruta de comentarios;
9. el conocimiento futuro debe ser administrable dinámicamente;
10. la validación debe realizarse con documentos independientes de aquellos utilizados para construir el conocimiento inicial.

---

# 3. Alcance

La capacidad documentada aquí está limitada inicialmente a:

**Informes de Prácticas Pre-Profesionales de Ingeniería de Sistemas e Informática.**

El sistema puede trabajar con:

- reglamentos;
- anexos institucionales;
- rúbricas;
- documentos administrativos relacionados;
- observaciones históricas de comisiones;
- informes PPP;
- resultados de revisiones;
- conocimiento posteriormente administrado mediante OpenMad Manager.

Este dominio no debe codificarse como algo permanente o inmutable.

En una implementación futura, las fuentes, criterios, reglas, relaciones y antecedentes deberán poder evolucionar dinámicamente.

---

# 4. Principio fundamental: separar conocimiento de lógica

Una de las decisiones más importantes para la futura reconstrucción es evitar que el conocimiento institucional quede incrustado rígidamente en el código.

El sistema debe poder distinguir conceptualmente entre:

- fuente documental;
- regla;
- criterio de evaluación;
- antecedente histórico;
- problema canónico;
- patrón;
- resultado de análisis;
- evidencia;
- versión del conocimiento.

El Manager de OpenMad deberá ser la fuente administrativa de este conocimiento.

El motor de análisis deberá consumirlo.

Esto permitirá:

- actualizar reglamentos;
- corregir interpretaciones;
- incorporar nuevos antecedentes;
- retirar conocimiento inválido;
- cambiar estados de confianza;
- mantener versiones;
- auditar de dónde surgió una recomendación;
- añadir nuevos procedimientos en el futuro.

---

# 5. Tipos de conocimiento

No todo el conocimiento tiene el mismo nivel de autoridad.

## 5.1. Conocimiento normativo

Proviene directamente de una fuente institucional aplicable.

Ejemplos:

- estructura exigida;
- duración mínima;
- documentos requeridos;
- formato;
- contenido de anexos;
- criterios explícitos de una rúbrica.

Debe conservar:

- fuente;
- versión;
- ubicación dentro de la fuente;
- vigencia;
- texto o evidencia de respaldo;
- interpretación utilizada.

---

## 5.2. Conocimiento derivado

No necesariamente aparece expresado literalmente, pero puede derivarse razonablemente de una regla.

Ejemplo:

Si un documento oficial establece una cantidad de horas y el informe presenta otra cantidad incompatible, puede existir un problema de coherencia documental.

Debe distinguirse de una regla textual directa.

---

## 5.3. Antecedente histórico

Es una observación que una comisión o revisor realizó en un caso concreto.

Un antecedente histórico significa:

> "Esto fue observado en este caso."

NO significa:

> "Esto siempre es incorrecto."

NO significa:

> "La institución aplica necesariamente este criterio a todos los informes."

---

## 5.4. Patrón candidato

Surge cuando el mismo problema canónico aparece en varios casos independientes.

Debe existir evidencia suficiente para considerar que el problema puede ser recurrente.

Aun así:

> recurrencia histórica ≠ obligatoriedad normativa.

---

## 5.5. Criterio variable o contradictorio

Debe existir una categoría capaz de representar situaciones donde diferentes casos sugieren una aplicación inconsistente.

Ejemplo descubierto durante la experimentación:

- a un estudiante se le observó determinada denominación del informe;
- otro informe con una situación comparable fue aceptado sin esa observación.

Esto no demuestra automáticamente que:

- la primera observación fuera incorrecta;
- el segundo informe fuera correcto;
- el criterio no exista.

Puede representar:

- variabilidad entre revisores;
- omisión del revisor;
- contexto diferente;
- interpretación distinta;
- versiones documentales diferentes;
- criterio histórico no normativo.

El sistema debe poder representar esa incertidumbre.

---

## 5.6. Conocimiento específico

Algunas observaciones solo son aplicables a determinados:

- temas;
- tecnologías;
- actividades;
- entidades;
- documentos;
- contextos.

No deben generalizarse automáticamente.

---

# 6. Procedencia del conocimiento

Todo resultado debe poder responder:

> ¿Por qué OpenMad está diciendo esto?

Por tanto, cada pieza de conocimiento debe conservar procedencia suficiente para reconstruir su origen.

Como mínimo, conceptualmente debe poder conocerse:

- fuente;
- documento;
- versión;
- sección/artículo/anexo;
- naturaleza de la fuente;
- fecha o vigencia cuando corresponda;
- caso histórico de origen;
- relación con otros conocimientos;
- estado de validación.

Nunca debe existir una recomendación normativa cuyo origen no pueda explicarse.

---

# 7. Versionado de fuentes

Durante el experimento se detectó un problema importante:

un mismo documento institucional puede contener elementos provenientes de versiones diferentes.

Por ejemplo:

- documento principal actualizado;
- anexos con pie de versión anterior;
- resoluciones posteriores;
- formatos históricos aún incluidos.

Por ello, no debe asumirse:

> un PDF = una única versión conceptual.

El conocimiento futuro debe conservar información suficiente para identificar:

- versión de la fuente;
- versión del anexo;
- vigencia;
- posibles inconsistencias documentales;
- fuente utilizada al producir un resultado.

No se deben reconciliar silenciosamente fuentes contradictorias.

---

# 8. Problema canónico

Varias observaciones redactadas de manera diferente pueden referirse al mismo problema conceptual.

Ejemplo:

- "corregir título";
- "utilizar denominación oficial";
- "la portada no presenta el título correspondiente".

Podrían pertenecer a un problema canónico como:

**Denominación del informe.**

Esto permite agrupar antecedentes sin depender de la redacción literal.

Sin embargo, debe evitarse agrupar problemas diferentes únicamente porque pertenecen al mismo criterio general.

Ejemplo:

Dentro de "estructura del informe" pueden existir:

- denominación del informe;
- estructura del índice;
- organigrama institucional.

Son problemas distintos.

---

# 9. Regla fundamental para patrones históricos

Los patrones deben calcularse utilizando **casos independientes**.

NO contar comentarios individuales como evidencia independiente.

Ejemplo incorrecto:

Un revisor realiza 20 comentarios del mismo tipo sobre un informe.

Resultado incorrecto:

> "20 casos históricos."

En realidad puede existir:

> 1 caso independiente.

La recurrencia debe considerar documentos/casos independientes.

Idealmente también deberá permitir estudiar posteriormente diversidad de:

- periodos;
- revisores;
- comisiones;
- versiones normativas;
- contextos.

Siempre respetando privacidad y anonimización.

---

# 10. Separar criterio de problema histórico

Un criterio puede relacionarse con múltiples problemas canónicos.

Por ejemplo:

**Criterio: estructura general del informe**

puede tener antecedentes relacionados con:

- denominación;
- índice;
- organigrama.

Si únicamente "denominación" aparece repetidamente, la interfaz NO debe decir:

> "Estructura general del informe es un patrón histórico."

Debe expresar:

> "Patrón candidato: Denominación del informe."

El patrón pertenece al problema canónico, no necesariamente al criterio completo.

---

# 11. Pipeline conceptual

La futura implementación deberá mantener conceptualmente separadas las siguientes responsabilidades:

**Documento original**

↓

**Extracción**

↓

**Normalización**

↓

**Identificación estructural**

↓

**Extracción de evidencias**

↓

**Estimación de confiabilidad**

↓

**Evaluación**

↓

**Explicación**

↓

**Resultado**

Esta separación es fundamental.

Un error de extracción no debe transformarse automáticamente en una afirmación normativa.

---

# 12. Documento original y evidencia

Debe conservarse la diferencia entre:

- contenido original;
- contenido normalizado;
- contenido interpretado.

La normalización sirve para facilitar análisis.

NO debe destruir la evidencia original.

Ejemplo real descubierto:

El PDF contenía:

`del 09 de febrero al 08 de
mayo de 2026`

El sistema necesitaba interpretar:

`del 09 de febrero al 08 de mayo de 2026`

Pero la evidencia presentada al usuario debía conservar el texto original.

Principio:

> normalizar para interpretar, conservar el original para explicar.

---

# 13. Normalización segura

No debe normalizarse indiscriminadamente todo el documento.

Los saltos de línea pueden contener información estructural importante:

- títulos;
- capítulos;
- listas;
- objetivos;
- conclusiones;
- recomendaciones.

La normalización debe realizarse según el contexto.

Ejemplo:

Para interpretar un intervalo temporal puede ser correcto convertir saltos de línea intermedios en espacios.

Para identificar capítulos, hacerlo globalmente podría destruir información útil.

---

# 14. Error descubierto: intervalos temporales

Durante el experimento, una prueba sintética funcionaba con:

`09 de febrero al 08 de mayo de 2026`

pero el PDF real producía:

`09 de febrero al 08 de
mayo de 2026`

El sistema no pudo interpretar las fechas.

Aprendizaje:

> las pruebas deben reproducir características reales de extracción PDF, no únicamente texto idealizado.

Deben contemplarse:

- saltos de línea;
- espacios múltiples;
- tabulaciones;
- espacios no separables;
- palabras divididas;
- caracteres extraños;
- texto proveniente de distintos extractores.

---

# 15. Error descubierto: ausencia de evidencia interpretada como éxito

Una versión inicial del prototipo no encontraba valores de horas y aun así podía considerar que no existían contradicciones.

Esto es incorrecto.

Si no existen datos suficientes:

> NO puede afirmarse que existe consistencia.

Debe existir un estado explícito de indeterminación.

Principio:

> ausencia de contradicción detectada ≠ consistencia demostrada.

---

# 16. Estados de evaluación

El sistema necesita representar más que "correcto/incorrecto".

Conceptualmente debe poder expresar al menos:

### Cumple / sin observación automática

Existe evidencia suficiente para realizar la comprobación y no se detectó el problema evaluado.

No debe interpretarse como aprobación total del informe.

### Por revisar

Existe evidencia suficiente para señalar una posible discrepancia preventiva.

### Inconsistencia

Existe evidencia suficientemente clara para señalar una contradicción o incumplimiento dentro del alcance evaluado.

### Indeterminado

El sistema conoce el criterio, pero no posee evidencia suficiente para evaluarlo de forma fiable.

### No evaluado automáticamente

El criterio requiere comprensión semántica, contextual o humana que el sistema actual no implementa.

---

# 17. Diferencia entre INDETERMINATE y NOT_EVALUATED

Esta distinción es esencial.

## INDETERMINATE

El sistema posee una comprobación, pero el documento concreto no proporciona evidencia suficiente.

Ejemplo:

Se desea comparar horas, pero solo se detectó un valor.

## NOT_EVALUATED

El sistema deliberadamente no implementa esa evaluación.

Ejemplo:

Determinar si una conclusión responde semánticamente al objetivo correspondiente.

---

# 18. No convertir incertidumbre en certeza

Este es uno de los principios más importantes derivados del experimento.

Si la extracción es incierta:

> la evaluación debe conservar esa incertidumbre.

Nunca:

**extracción dudosa → afirmación segura**

Debe ser:

**extracción dudosa → resultado indeterminado**

---

# 19. Error descubierto: objetivos

Las primeras versiones tuvieron problemas para reconocer encabezados como:

- `2.1Objetivo general`
- variaciones con espacios;
- variaciones con saltos de línea.

También se llegó a contar ocurrencias de la palabra "objetivo" en zonas que no correspondían realmente a la sección de objetivos.

Aprendizajes:

1. los encabezados reales presentan variaciones;
2. los conteos deben estar limitados a la sección correspondiente;
3. una palabra encontrada globalmente no equivale a una unidad estructural;
4. debe distinguirse objetivo general de objetivos específicos;
5. extracción y evaluación normativa deben permanecer separadas.

---

# 20. Cuestión normativa pendiente: objetivos y conclusiones

Existe una cuestión que NO debe quedar resuelta implícitamente por el parser.

El material normativo analizado utiliza una formulación equivalente a:

> una conclusión por cada objetivo.

Además, un antecedente histórico interpretó un caso con:

- 1 objetivo general;
- 4 objetivos específicos;

como una expectativa de:

- 5 conclusiones.

Por tanto, NO debe asumirse automáticamente que:

> 4 objetivos específicos = 4 conclusiones

es siempre la interpretación normativa correcta.

La futura implementación debe distinguir:

- cantidad de objetivos generales;
- cantidad de objetivos específicos;
- cantidad total;
- alcance normativo utilizado para comparar.

La interpretación normativa debe provenir del conocimiento administrado y de la fuente correspondiente.

No del parser.

---

# 21. Recomendaciones y conclusiones

También debe tratarse con cautela la relación:

> una recomendación por cada conclusión.

La fuente institucional debe verificarse cuidadosamente porque algunas formulaciones pueden contener expresiones ejemplificativas y no necesariamente obligaciones rígidas.

El sistema no debe convertir ejemplos en requisitos obligatorios sin respaldo suficiente.

---

# 22. Error descubierto: unidad visual ≠ unidad semántica

Este fue uno de los hallazgos más importantes del segundo informe utilizado experimentalmente.

Un estudiante puede escribir varias conclusiones dentro de:

- un párrafo;
- dos párrafos;
- texto continuo;

sin utilizar:

- numeración;
- viñetas.

Una versión del parser asumía:

> 1 párrafo = 1 conclusión.

Esto produjo:

- 4 objetivos específicos;
- 2 párrafos de conclusiones;

y OpenMad afirmó:

> "4 objetivos frente a 2 conclusiones."

Posteriormente:

- 2 supuestas conclusiones;
- 1 bloque de recomendaciones;

produjo:

> "2 conclusiones frente a 1 recomendación."

Ambas afirmaciones podían ser falsas.

---

# 23. Propagación de errores

El caso anterior reveló un problema adicional.

Un error temprano puede contaminar evaluaciones posteriores.

Ejemplo:

**segmentación incorrecta**

↓

"2 conclusiones"

↓

discrepancia objetivos-conclusiones

↓

"1 recomendación"

↓

discrepancia conclusiones-recomendaciones

Un único error de extracción generó dos aparentes problemas normativos.

Principio:

> la incertidumbre debe propagarse como incertidumbre, no como datos falsamente ciertos.

---

# 24. Confianza de segmentación

Cuando se analicen unidades como:

- objetivos;
- conclusiones;
- recomendaciones;
- actividades;
- evidencias;

debe conocerse qué tan confiable es la segmentación.

Conceptualmente pueden existir niveles como:

### Alta confianza

Existe separación estructural inequívoca.

Ejemplos:

- lista numerada;
- viñetas consistentes;
- marcadores explícitos.

### Confianza media

Existen varios bloques visuales, pero no puede garantizarse que cada bloque represente exactamente una unidad semántica.

Ejemplo:

varios párrafos sin numeración.

### Baja confianza

Texto continuo sin separación estructural suficiente.

---

# 25. Conteo estructural y conteo semántico

Deben distinguirse explícitamente.

Ejemplo:

> Se detectaron 2 bloques de texto.

NO equivale a:

> Existen 2 conclusiones.

Un resultado puede contener:

- bloques detectados: 2;
- cantidad semántica: desconocida;
- confianza: media.

La evaluación cuantitativa debe utilizar únicamente cantidades cuya confiabilidad sea suficiente.

---

# 26. No exigir viñetas sin respaldo normativo

El experimento con conclusiones mostró una tentación peligrosa:

> "Si OpenMad no puede contarlas, pedir al estudiante que use viñetas."

Esto sería incorrecto si la norma no exige viñetas.

Puede sugerirse:

> "Para facilitar la lectura y correspondencia, puede presentar cada conclusión de forma claramente diferenciada."

Pero debe identificarse como:

**recomendación de claridad**

y NO como:

**requisito institucional.**

El sistema debe distinguir recomendaciones preventivas de obligaciones normativas.

---

# 27. Límite del análisis determinístico

El baseline determinístico puede responder razonablemente:

> ¿Hay cuatro elementos numerados?

Pero no necesariamente:

> ¿Este párrafo contiene cuatro conclusiones semánticamente independientes?

Tampoco puede responder de manera robusta:

> ¿Esta conclusión responde realmente al objetivo 3?

Estas tareas requieren análisis semántico.

Mientras esa capacidad no exista:

> deben permanecer explícitamente fuera del alcance automático.

---

# 28. Posible incorporación futura de NLP/ML

El experimento permitió identificar dónde podría justificarse posteriormente un modelo.

No debe introducirse ML simplemente porque OpenMad utiliza documentos.

Debe introducirse cuando exista un problema que las reglas determinísticas no resuelven adecuadamente.

Ejemplos:

- segmentar conclusiones semánticas en texto continuo;
- relacionar objetivos con conclusiones;
- relacionar conclusiones con recomendaciones;
- detectar contradicciones entre descripción y evidencia;
- evaluar articulación teoría-desarrollo;
- identificar problemas similares redactados de manera diferente;
- clasificar nuevas observaciones.

El baseline determinístico actual debe conservarse para poder comparar posteriormente:

**reglas**

vs.

**modelo**

vs.

**sistema híbrido**.

---

# 29. Error descubierto: denominación del informe

Un antecedente histórico indicaba que un informe debía utilizar una determinada denominación oficial.

OpenMad utilizó ese antecedente preventivamente.

Posteriormente se encontró otro informe que no utilizaba esa denominación y, según la información disponible, no recibió dicha observación durante su revisión.

Este caso es especialmente importante.

NO permite concluir automáticamente que:

- OpenMad estaba equivocado;
- el segundo revisor estaba equivocado;
- la primera observación era inválida.

Sí permite concluir:

> una observación histórica no puede convertirse automáticamente en una regla universal.

---

# 30. Variabilidad entre revisores

La futura base de conocimiento debe poder representar que algunos criterios pueden ser:

- normativos;
- recurrentes;
- variables;
- contradictorios;
- específicos;
- no suficientemente estudiados.

Esto responde directamente a una limitación real del dominio:

diferentes revisores pueden prestar atención a diferentes aspectos.

El objetivo de OpenMad no debe ser ocultar esta variabilidad.

Debe representarla.

---

# 31. Una omisión del revisor no equivale a validez

Cuando OpenMad detecte algo y la comisión no lo mencione:

NO puede etiquetarse automáticamente como falso positivo.

Puede existir:

- omisión;
- diferencia de criterio;
- prioridad distinta;
- contexto;
- versión normativa;
- error de OpenMad.

Por ello, durante la validación conviene utilizar términos como:

**discrepancia OpenMad / revisión**

o:

**posible falso positivo pendiente de adjudicación.**

---

# 32. Una observación de la comisión tampoco es verdad universal

El caso inverso también debe mantenerse.

Que una comisión haya observado algo demuestra:

> que ese criterio fue utilizado en ese caso.

No necesariamente:

> que representa una regla institucional universal.

Debe analizarse su procedencia.

---

# 33. Anexos: existencia ≠ completitud

Otro error conceptual que debe evitarse:

detectar el encabezado:

`ANEXOS`

no demuestra que:

- todos los anexos requeridos estén presentes;
- sean válidos;
- estén firmados;
- correspondan al estudiante;
- tengan validez administrativa.

La futura implementación debe distinguir:

- existencia de sección;
- documentos detectados;
- completitud;
- validez formal;
- validez administrativa.

Cada nivel requiere evidencia diferente.

---

# 34. Documentos oficiales y aclaraciones personales

Un antecedente histórico mostró que una aclaración redactada por el propio estudiante no necesariamente subsana un error presente en un documento oficial.

Este tipo de conocimiento debe manejarse con especial cuidado porque involucra:

- validez documental;
- autoridad del emisor;
- procedencia;
- corrección administrativa.

No debe generalizarse sin respaldo normativo o administrativo suficiente.

---

# 35. Evidencia y descripción

Otro problema histórico relevante:

el informe puede describir una herramienta, sistema o situación mientras que la evidencia visual muestra algo diferente.

Ejemplo conceptual:

> texto afirma A;
> evidencia muestra B.

Este tipo de problema no es meramente de formato.

Pertenece a:

**coherencia evidencia-descripción / integridad documental.**

Puede ser un candidato importante para análisis semántico o multimodal futuro.

---

# 36. Pertinencia de evidencia

La existencia de imágenes o capturas no implica que sean pertinentes.

Debe distinguirse:

- evidencia presente;
- evidencia legible;
- evidencia relacionada;
- evidencia suficiente.

Una comprobación puramente estructural solo puede afirmar existencia.

No pertinencia semántica.

---

# 37. Bibliografía

El sistema puede detectar estructuralmente:

- existencia de bibliografía;
- número aproximado de referencias;
- determinados patrones formales.

Pero debe evitar afirmar:

> "Cumple ISO 690"

si solo utilizó una heurística superficial.

Una salida más rigurosa sería:

> "Se detectaron características compatibles con la estructura esperada."

La certificación normativa completa requiere una evaluación más profunda.

---

# 38. Horas de prácticas

El reglamento utilizado en el experimento establece requisitos temporales/carga horaria.

El análisis reveló que no basta con buscar números.

Los valores pueden aparecer en:

- portada;
- tablas;
- certificados;
- cronogramas;
- anexos;
- descripciones.

El sistema debe conocer contexto suficiente antes de compararlos.

Si solo encuentra un valor:

> no puede evaluar consistencia interna.

Si encuentra múltiples valores comparables:

> puede buscar contradicciones.

---

# 39. Periodo de prácticas

La extracción de periodos debe contemplar:

- mismo año expresado una sola vez;
- años explícitos en ambas fechas;
- cambio de año;
- ausencia de año;
- saltos de línea;
- meses en texto;
- variaciones de espacios.

Nunca debe inventarse un año ausente cuando no pueda derivarse de manera segura.

---

# 40. Archivos escaneados

El análisis determinístico basado en extracción textual tiene una limitación fundamental:

los PDFs escaneados pueden no contener texto utilizable.

La futura implementación debe reconocer explícitamente esta situación.

No debe presentar:

> "No encontré X"

cuando realmente:

> "No pude leer el documento."

Estos estados son diferentes.

Si posteriormente se incorpora OCR, su salida también deberá tener nivel de confianza.

---

# 41. Problemas de codificación y metadatos

Durante el prototipo aparecieron problemas de presentación como:

- nombres con caracteres mal codificados;
- tamaño del archivo mostrado incorrectamente.

Ejemplo conceptual:

`PrÃ¡cticas`

en lugar de:

`Prácticas`.

Estos problemas no afectan necesariamente el análisis conceptual, pero degradan confianza y trazabilidad.

Una implementación futura debe preservar correctamente:

- Unicode;
- nombre original;
- tamaño;
- tipo;
- hash;
- páginas;
- fecha de análisis.

---

# 42. Explicabilidad mínima

Cada hallazgo debería poder explicar:

## Qué

Qué se detectó.

## Dónde

En qué parte del documento.

## Por qué

Por qué es relevante.

## Fuente

Qué regla, criterio o antecedente respalda el análisis.

## Evidencia

Qué fragmento concreto produjo el resultado.

## Alcance

Qué pudo y qué no pudo comprobar OpenMad.

---

# 43. No utilizar lenguaje excesivamente fuerte

Debe evitarse utilizar:

- "Correcto";
- "Aprobado";
- "Cumple totalmente";
- "Inválido";

cuando el sistema solo ha realizado una comprobación parcial.

Preferir expresiones como:

- "Sin observaciones automáticas en este criterio";
- "No se detectó discrepancia dentro del alcance evaluado";
- "Requiere revisión";
- "No pudo determinarse";
- "No evaluado automáticamente".

---

# 44. Separar detección de recomendación

Una recomendación no necesariamente tiene la misma autoridad que el hallazgo.

Ejemplo:

Hallazgo normativo:

> falta una sección requerida.

Recomendación:

> incorpore la sección correspondiente.

Pero:

Hallazgo:

> conclusiones redactadas en texto continuo; no fue posible determinar su cantidad.

Recomendación opcional:

> considere diferenciarlas visualmente para facilitar su lectura.

La segunda recomendación no debe presentarse como norma.

---

# 45. Privacidad

Los informes PPP pueden contener:

- nombres;
- códigos;
- firmas;
- correos;
- teléfonos;
- datos de responsables;
- datos institucionales;
- información laboral;
- identificadores;
- códigos verificables.

La futura beta debe minimizar la recopilación de información personal.

Para construir conocimiento histórico, lo relevante generalmente es:

- problema;
- criterio;
- contexto;
- evidencia desidentificada;
- resultado de revisión.

No la identidad del estudiante.

---

# 46. Anonimización

Los casos utilizados para investigación o mejora deberían poder transformarse en casos desidentificados.

Ejemplo:

`VALIDATION-CASE-002`

en lugar del nombre del estudiante.

También deben evitarse nombres de revisores cuando no sean necesarios.

Si en el futuro se necesita estudiar variabilidad entre revisores, pueden utilizarse identificadores pseudónimos bajo reglas adecuadas de privacidad.

---

# 47. Separación entre conocimiento y consultas

Las preguntas de los estudiantes NO deben incorporarse directamente como conocimiento.

Una consulta significa:

> existe una necesidad o duda.

No significa:

> la respuesta propuesta es verdadera.

Las consultas pueden utilizarse para identificar:

- vacíos de información;
- procedimientos confusos;
- demanda;
- contenido que requiere documentación.

El conocimiento debe pasar por validación.

---

# 48. Beta futura

OpenMad podría ofrecer una beta preventiva antes de disponer de un modelo entrenado.

La beta debería comunicar claramente:

> análisis experimental y preventivo.

No:

> revisión oficial.

Una beta puede servir simultáneamente para:

- ayudar al estudiante;
- validar reglas;
- descubrir falsos supuestos;
- encontrar nuevos tipos de errores;
- recopilar feedback;
- construir un dataset futuro.

---

# 49. Datos especialmente valiosos para la beta

El recurso más valioso no es simplemente acumular PDFs.

Lo ideal es obtener pares:

**informe antes de revisión**

+

**resultado preventivo de OpenMad**

+

**observaciones posteriores de la comisión**

Esto permite comparar el comportamiento del sistema con la revisión real.

---

# 50. Validación

Cada caso nuevo debe tratarse como una unidad independiente.

Idealmente:

1. congelar versión del conocimiento;
2. analizar informe;
3. conservar resultado;
4. esperar revisión real;
5. registrar observaciones de referencia;
6. realizar correspondencia;
7. adjudicar discrepancias.

No modificar reglas después de ver la respuesta de la comisión y luego presentar el mismo documento como validación independiente.

Eso sería fuga de información.

---

# 51. Categorías de comparación

Puede utilizarse inicialmente:

### HIT

OpenMad detectó un problema posteriormente observado.

### MISS

La comisión observó un problema que OpenMad no detectó.

### EXTRA

OpenMad señaló algo que la comisión no mencionó.

Debe revisarse antes de llamarlo falso positivo.

### FALSE POSITIVE CONFIRMADO

Solo cuando una revisión posterior permita establecer razonablemente que el hallazgo de OpenMad era incorrecto.

### NOT_EVALUATED

El sistema no implementaba ese tipo de análisis.

### INDETERMINATE

El criterio existía, pero el documento no permitió evaluarlo con suficiente certeza.

---

# 52. Ground truth imperfecto

Las observaciones de comisión constituyen una referencia útil, pero no necesariamente un ground truth perfecto.

Los revisores pueden:

- omitir problemas;
- aplicar criterios diferentes;
- equivocarse;
- interpretar reglas de manera diferente.

Por tanto, la evaluación debe reconocer:

> "observaciones de referencia"

en lugar de asumir verdad absoluta.

---

# 53. Evitar sobreajuste

Uno de los riesgos principales durante el experimento fue adaptar progresivamente el sistema al mismo informe.

Una corrección es válida cuando generaliza.

No debe implementarse:

> "si aparece exactamente esta frase, hacer X".

Debe identificarse la clase general del problema.

Después de corregir un fallo descubierto por un documento:

> utilizar otro documento independiente.

---

# 54. Pruebas realistas

Las pruebas futuras deben incluir:

- texto limpio;
- texto extraído de PDF;
- saltos de línea;
- espacios anómalos;
- encabezados pegados;
- listas numeradas;
- viñetas;
- párrafos;
- texto continuo;
- secciones faltantes;
- años incompletos;
- múltiples valores;
- documentos escaneados.

Los tests sintéticos ideales no sustituyen pruebas con extracción real.

---

# 55. Integridad del conocimiento

Cuando el conocimiento sea administrado dinámicamente, debe validarse su integridad.

No deberían existir:

- reglas duplicadas;
- criterios huérfanos;
- observaciones sin criterio;
- problemas canónicos inexistentes;
- referencias a fuentes inexistentes;
- versiones desconocidas;
- relaciones rotas.

La integridad del conocimiento debe ser verificable independientemente del motor de análisis.

---

# 56. Trazabilidad de versiones

Cada análisis debería poder reconstruirse posteriormente.

Debe ser posible conocer:

- documento analizado;
- versión del conocimiento;
- versión de las fuentes;
- versión del motor/modelo;
- fecha;
- resultados;
- evidencia utilizada.

Esto será especialmente importante cuando el Manager permita modificar reglas dinámicamente.

Un resultado generado hoy podría cambiar mañana debido a una actualización normativa.

---

# 57. Reproducibilidad

Idealmente, si se conserva:

- documento;
- versión de conocimiento;
- configuración;
- versión del analizador;

debe poder reproducirse el resultado histórico.

Esto evita que una actualización del Manager cambie retroactivamente la interpretación de resultados antiguos sin trazabilidad.

---

# 58. Separación entre extracción y norma

El extractor debe responder preguntas como:

> ¿Qué encontré?

La capa normativa:

> ¿Qué significa eso bajo el conocimiento vigente?

Ejemplo:

Extractor:

- 1 objetivo general;
- 4 objetivos específicos;
- 4 conclusiones claramente numeradas.

Evaluador:

- determina qué conjunto de objetivos debe compararse según la regla vigente.

Nunca debe programarse la interpretación normativa dentro de la extracción.

---

# 59. Separación entre estructura y semántica

El sistema debe reconocer explícitamente qué tipo de afirmación está realizando.

## Estructural

- existe sección;
- existen cuatro elementos numerados;
- existe bibliografía;
- se encontró una fecha.

## Semántica

- conclusión responde al objetivo;
- evidencia demuestra la actividad;
- teoría está correctamente articulada;
- recomendación deriva de conclusión.

Las segundas requieren capacidades diferentes.

---

# 60. Evaluación humana

Debe existir una categoría explícita para análisis que requieran intervención humana.

No debe considerarse una deficiencia accidental.

Puede ser una decisión deliberada:

> HUMAN_REQUIRED.

Esto permite que OpenMad sea honesto respecto a su cobertura.

---

# 61. Qué NO debe hacer el sistema

OpenMad no debe:

- inventar información ausente;
- asumir que una observación histórica es una norma;
- asumir que una omisión del revisor demuestra corrección;
- contar párrafos como unidades semánticas;
- afirmar cumplimiento ISO basándose en una heurística débil;
- certificar anexos solo porque existe la sección;
- afirmar consistencia cuando no encontró valores;
- presentar recomendaciones opcionales como obligaciones;
- ocultar incertidumbre;
- mezclar versiones normativas silenciosamente;
- utilizar datos personales innecesariamente;
- aprender automáticamente de cualquier entrada de usuario;
- presentar un análisis preventivo como aprobación institucional.

---

# 62. Qué SÍ debe hacer

Debe:

- mostrar procedencia;
- conservar evidencia;
- expresar incertidumbre;
- diferenciar norma y antecedente;
- distinguir estructura y semántica;
- utilizar casos independientes para recurrencia;
- mantener versionado;
- permitir actualización dinámica;
- registrar límites de evaluación;
- explicar cada resultado;
- permitir auditoría;
- proteger privacidad;
- utilizar validación externa.

---

# 63. Base de conocimiento experimental obtenida

Durante el prototipo se trabajó aproximadamente con:

- 20 reglas institucionales;
- 15 criterios;
- 28 observaciones históricas;
- 19 problemas canónicos;
- 11 casos históricos independientes iniciales.

Estas cantidades describen el experimento.

NO deben convertirse en límites del sistema futuro.

El Manager debe permitir que este conocimiento evolucione.

---

# 64. Categorías de problemas identificadas durante el experimento

Entre los problemas encontrados históricamente aparecieron categorías como:

- carga horaria;
- validez documental;
- denominación del informe;
- periodo;
- ortografía;
- figuras;
- tablas;
- fuentes;
- índices;
- estilo de redacción;
- organigrama;
- objetivos;
- bibliografía;
- correspondencia objetivos-conclusiones;
- correspondencia conclusiones-recomendaciones;
- evidencia-descripción;
- pertinencia de evidencia;
- articulación teoría-desarrollo;
- contenido técnico específico.

No todas poseen el mismo grado de generalización.

---

# 65. Patrones candidatos iniciales

Dentro del primer conjunto histórico aparecieron recurrencias candidatas relacionadas con:

- carga horaria;
- bibliografía/ISO;
- figuras/material gráfico;
- precisión del periodo;
- denominación/estructura en determinados casos.

Deben considerarse candidatos históricos, no verdades institucionales, hasta disponer de más casos independientes.

---

# 66. Hallazgos no meramente formales

El conocimiento histórico mostró que las observaciones no se limitan a formato.

Existen problemas potencialmente más interesantes:

- objetivo ↔ conclusión;
- teoría ↔ desarrollo;
- evidencia ↔ descripción;
- pertinencia de evidencia;
- coherencia documental;
- relación de actividades con competencias.

Estos problemas son especialmente relevantes para futuras capacidades semánticas.

---

# 67. Datos necesarios antes de entrenar modelos

El conjunto experimental actual no debe considerarse suficiente para entrenar un modelo robusto.

Antes de ello conviene aumentar:

- número de casos independientes;
- diversidad de revisiones;
- cantidad de observaciones;
- ejemplos positivos y negativos;
- consistencia de etiquetas;
- trazabilidad;
- adjudicación de discrepancias.

El objetivo inicial de una beta debe ser estabilizar la taxonomía y obtener evidencia, no entrenar inmediatamente.

---

# 68. El baseline debe conservarse

Cuando posteriormente exista NLP/ML, el sistema determinístico seguirá siendo importante.

Debe permitir comparar:

- reglas únicamente;
- modelo únicamente;
- sistema híbrido.

Esto permitirá determinar si el modelo aporta valor real.

Sin baseline, no puede saberse cuánto mejora realmente el modelo.

---

# 69. Posible dataset futuro

Cada caso de validación debería poder representar conceptualmente:

- identificador anonimizado;
- versión del documento;
- versión del conocimiento;
- hallazgos OpenMad;
- observaciones de referencia;
- problemas canónicos asociados;
- correspondencias;
- discrepancias;
- adjudicación humana;
- fecha;
- contexto necesario.

No debe depender de nombres personales.

---

# 70. Feedback de estudiantes

La beta puede recoger feedback como:

> ¿Encontraste lo que necesitabas?

o:

> ¿Qué información estabas buscando?

Pero ese feedback representa demanda y experiencia de usuario.

No debe modificar automáticamente las reglas.

---

# 71. Incorporación de nuevas observaciones

Una observación aportada por un estudiante debería considerarse inicialmente:

**candidata.**

Antes de convertirse en conocimiento reutilizable debería evaluarse:

- procedencia;
- evidencia;
- duplicidad;
- problema canónico;
- especificidad;
- respaldo normativo;
- recurrencia;
- posibles contradicciones.

---

# 72. Manager como autoridad operativa del conocimiento

En la futura plataforma, el Manager deberá permitir gestionar dinámicamente el conocimiento sin requerir cambios de código para cada nueva observación.

Conceptualmente debería ser posible administrar:

- fuentes;
- versiones;
- reglas;
- criterios;
- problemas canónicos;
- observaciones;
- relaciones;
- estados;
- recurrencia;
- vigencia;
- confianza;
- revisiones;
- desactivación de conocimiento.

Este documento no prescribe cómo implementarlo.

---

# 73. Desactivar no equivale a borrar

Por trazabilidad, cuando un conocimiento deja de considerarse válido puede ser preferible:

> marcarlo como inactivo/sustituido

en lugar de eliminar toda evidencia histórica.

Debe poder conocerse:

- qué se utilizaba;
- cuándo;
- por qué cambió;
- qué lo reemplazó.

---

# 74. Conflictos entre fuentes

Cuando dos fuentes aparentemente aplicables se contradigan:

OpenMad no debe escoger silenciosamente una.

Debe poder representar:

- conflicto;
- fuente A;
- fuente B;
- versiones;
- interpretación pendiente.

Dependiendo del caso, el resultado puede quedar indeterminado.

---

# 75. Principio de mínima afirmación

OpenMad debe realizar la afirmación más fuerte que permita la evidencia, pero no una más fuerte.

Ejemplos:

Si detecta sección:

> "Sección detectada."

No:

> "Sección correcta."

Si detecta cuatro ítems numerados:

> "Se detectaron cuatro unidades estructuradas."

No necesariamente:

> "Las cuatro conclusiones responden correctamente a los objetivos."

Si detecta referencias:

> "Bibliografía detectada."

No:

> "Bibliografía cumple completamente ISO 690."

---

# 76. Principio de degradación segura

Cuando algo no pueda evaluarse:

el sistema debe degradar hacia:

- INDETERMINATE;
- NOT_EVALUATED;
- HUMAN_REQUIRED;

en lugar de producir un resultado artificial.

Es preferible menor cobertura con mayor confiabilidad que alta cobertura basada en inferencias débiles.

---

# 77. Hallazgo metodológico principal

El experimento mostró que el reto de OpenMad no consiste únicamente en:

> detectar errores.

El problema real es modelar correctamente:

- qué sabe;
- de dónde lo sabe;
- con qué autoridad;
- con qué evidencia;
- con qué confianza;
- en qué casos se ha observado;
- cuándo no puede determinar algo.

---

# 78. Criterio para incorporar automatización

Una comprobación debería automatizarse cuando:

1. existe una definición suficientemente clara;
2. la evidencia necesaria puede extraerse con confiabilidad;
3. la interpretación no requiere una inferencia semántica que el sistema aún no posee;
4. el resultado puede explicarse;
5. existe una fuente o justificación identificable.

Si alguna condición no se cumple, debe considerarse:

- revisión humana;
- análisis futuro;
- NLP/ML;
- conocimiento insuficiente.

---

# 79. Lecciones de los dos informes experimentales

## Primer informe

Permitió construir y depurar:

- estructura;
- objetivos;
- conclusiones;
- recomendaciones;
- bibliografía;
- horas;
- periodo;
- anexos;
- procedencia histórica.

Pero reutilizar continuamente el mismo informe introducía riesgo de sobreajuste.

## Segundo informe

Fue especialmente útil porque reveló supuestos que el primero no mostraba:

### A. Variabilidad histórica

Una observación aplicada a un estudiante aparentemente no fue aplicada a otro caso comparable.

### B. Segmentación semántica

Conclusiones y recomendaciones sin viñetas demostraron que:

> párrafo ≠ conclusión.

Estos hallazgos justifican continuar validando con documentos independientes.

---

# 80. Estado final del experimento

La última iteración experimental consiguió representar de forma segura:

- listas numeradas → conteo de alta confianza;
- listas con viñetas → conteo de alta confianza;
- múltiples párrafos ambiguos → conteo desconocido;
- texto continuo → conteo desconocido;
- evaluaciones dependientes de conteos ambiguos → INDETERMINATE.

Esto confirmó un principio que debe conservarse en cualquier reconstrucción:

> la incertidumbre detectada durante la extracción debe mantenerse durante la evaluación.

---

# 81. Limitaciones conocidas

Actualmente deben considerarse limitaciones:

- PDFs escaneados sin OCR;
- formatos de numeración inusuales;
- semántica objetivo-conclusión;
- semántica conclusión-recomendación;
- pertinencia de evidencia;
- contradicciones multimodales;
- interpretación completa de ISO 690;
- criterios variables entre revisores;
- fuentes institucionales con versiones inconsistentes;
- ground truth humano imperfecto;
- bajo número de casos independientes.

---

# 82. Preguntas abiertas

Antes de una implementación definitiva deberán resolverse progresivamente:

1. ¿Qué conocimiento es estrictamente normativo?
2. ¿Qué observaciones son únicamente antecedentes?
3. ¿Cuántos casos independientes permiten considerar algo recurrente?
4. ¿Cómo representar criterios variables?
5. ¿Cómo adjudicar desacuerdos OpenMad-comisión?
6. ¿Qué interpretación normativa corresponde a objetivos-conclusiones?
7. ¿Qué grado de obligatoriedad tiene conclusiones-recomendaciones?
8. ¿Cómo manejar versiones contradictorias de anexos?
9. ¿Cuándo introducir NLP?
10. ¿Qué tareas justifican ML?
11. ¿Cómo medir cobertura además de precisión?
12. ¿Cómo anonimizar documentos de beta?
13. ¿Qué información puede conservarse con consentimiento?
14. ¿Cómo manejar conocimiento aportado por estudiantes?
15. ¿Cómo auditar cambios realizados desde Manager?

---

# 83. Estrategia recomendada al retomar el desarrollo

Cuando esta capacidad vuelva a desarrollarse:

### Fase 1 — reconstruir conocimiento

Migrar las reglas, criterios, problemas canónicos y antecedentes útiles al modelo dinámico administrado por Manager.

### Fase 2 — estabilizar procedencia

Asegurar versionado, fuentes, relaciones y trazabilidad.

### Fase 3 — reconstruir baseline determinístico

Implementar únicamente comprobaciones cuya evidencia pueda evaluarse de manera confiable.

### Fase 4 — beta

Utilizar casos independientes y recopilar resultados de revisión reales.

### Fase 5 — dataset

Construir casos anonimizados y adjudicados.

### Fase 6 — NLP/ML

Introducir modelos únicamente para problemas semánticos demostrados por la beta.

### Fase 7 — comparar

Comparar sistemáticamente:

- baseline;
- ML/NLP;
- enfoque híbrido.

---

# 84. Regla de oro

Toda futura implementación del analizador PPP debe respetar:

> **OpenMad no debe aparentar saber más de lo que realmente puede demostrar.**

Una salida `INDETERMINATE` bien explicada es preferible a una observación incorrecta presentada con certeza.

---

# 85. Conclusión

El prototipo experimental no debe entenderse como la arquitectura final de OpenMad.

Su valor principal fue descubrir los requisitos reales del problema.

El experimento mostró que un analizador académico preventivo necesita mucho más que expresiones regulares y una lista de reglas.

Necesita:

- procedencia;
- versionado;
- niveles de autoridad;
- evidencia;
- incertidumbre;
- separación entre estructura y semántica;
- conocimiento histórico;
- variabilidad;
- privacidad;
- validación independiente;
- capacidad de evolución.

El futuro sistema debe construirse alrededor de estos principios y permitir que el conocimiento sea gestionado dinámicamente.

La implementación puede cambiar por completo.

Estos principios no deberían perderse.