

export const steps_informe_practicas = [
    {
        id: 'plantilla-informe',
        label: 'Descargar la plantilla del informe',
        summary: 'Descarga la plantilla en formato DOCX y guarda una copia para redactar el informe.',
        downloadUrl: 'https://docs.google.com/document/d/1lizE80ocKIdeUykx6mMhGV9ni82XJNLT/export?format=docx',
        driveUrl: 'https://drive.google.com/file/d/1lizE80ocKIdeUykx6mMhGV9ni82XJNLT/view?usp=sharing',
        guide: {
            hint: 'Descarga el archivo y ábrelo en Microsoft Word para conservar su formato. No lo edites directamente en Google Docs.',
            downloadLabel: 'Descargar plantilla',
            driveLabel: 'Ver en Drive',
            heading: 'Descarga y verifica el archivo',
            keys: [
                { code: '1', text: 'Selecciona “Descargar plantilla” para obtener el archivo en formato DOCX.' },
                { code: '2', text: 'Guarda el documento en tu computadora con un nombre claro para empezar a redactar tu informe (por ejemplo: Informe Final - Tus Apellidos).' },
                { code: '3', text: 'Abre el archivo en Microsoft Word y comprueba que el contenido y el formato se muestren correctamente.' }
            ],
            close: 'La edición y verificación del contenido se realizan en el siguiente paso: “Redactar el informe”.'
        }
    },
    {
        id: 'redactar-informe',
        label: 'Redactar el informe',
        summary: 'Redacta el informe con información verificable y comprueba su estructura, horas, citas, evidencias, formato y documentos de sustento.',
        guide: {
            heading: 'Redacción y control final del informe',
            intro: 'La plantilla descargada incluye la estructura base y varias instrucciones de llenado. Complétala respetando su organización y utiliza esta lista para verificar los requisitos del reglamento y las observaciones formuladas en informes anteriores. Si utilizas otra plantilla, comprueba que incluya todos estos elementos.',
            sections: [
                {
                    title: 'Uso de la plantilla',
                    items: [
                        'Reemplaza el contenido entre llaves con la información solicitada y elimina las llaves.',
                        'Lee cada nota, aplica la aclaración donde corresponda y elimina la nota antes de presentar el informe.',
                        'Realiza las acciones señaladas entre “[INSTRUCCIÓN]”, como insertar una imagen o completar una sección, y elimina el texto de la instrucción.',
                        'Antes de presentar el informe, verifica que no queden campos de ejemplo, llaves, notas ni instrucciones pendientes.'
                    ]
                },
                {
                    title: 'Carátula, estructura e índices',
                    items: [
                        'Usa “INFORME DE PRÁCTICAS PRE-PROFESIONALES” como título principal de la portada. El nombre del sistema o proyecto puede aparecer únicamente como subtítulo.',
                        'Incluye un índice de tablas y figuras después del índice general si utilizas tablas, diagramas, capturas, fotografías o ilustraciones.',
                        'Numera tablas y figuras en el mismo orden en que aparecen y comprueba que cada número coincida con su referencia en el texto.',
                        'En la portada, escribe las fechas y horas exactas de inicio y fin de las prácticas. Evita periodos ambiguos como “enero–abril”.',
                        'Por cada objetivo específico, redacta exactamente una conclusión y una recomendación que respondan directamente a ese objetivo.'
                    ]
                },
                {
                    title: 'Horas y coherencia temporal',
                    items: [
                        'Verifica que el periodo declarado, la planificación, las fichas de evaluación y los documentos oficiales acrediten al menos 240 horas efectivas durante un periodo mínimo de 3 meses.',
                        'Comprueba que las horas registradas respeten la jornada de 4 horas diarias indicada en la carta de presentación.',
                        'Asegúrate de que todas las fechas y periodos del informe coincidan con las constancias, certificados y demás documentos emitidos por la entidad.'
                    ]
                },
                {
                    title: 'Sustento teórico y bibliografía',
                    items: [
                        'Sustenta las bases teóricas y las definiciones técnicas con citas dentro del texto.',
                        'Aplica el formato de citación exigido por la universidad y confirma con tu asesor la norma y versión vigentes.',
                        'Incluye en la bibliografía únicamente las fuentes citadas en el informe. Retira cualquier fuente que no aparezca en el texto.'
                    ]
                },
                {
                    title: 'Tablas, figuras y evidencias',
                    items: [
                        'Escribe las denominaciones con inicial mayúscula y numeración correlativa; por ejemplo, “Figura 1” y “Tabla 1”.',
                        'Añade al pie de cada tabla y figura su fuente y año; por ejemplo: “Fuente: Elaboración propia, 2026” o la fuente institucional correspondiente.',
                        'Coloca las capturas, interfaces, diagramas y fotografías relevantes junto a la actividad que explican; no envíes toda la evidencia a los anexos.',
                        'Explica qué muestra cada evidencia y cómo se relaciona con el trabajo realizado.',
                        'Comprueba que las capturas, el código y las interfaces correspondan a las tecnologías descritas. No incluyas herramientas o software que no hayas reportado.',
                        'Verifica que las imágenes no expongan datos confidenciales o información que la entidad no haya autorizado.'
                    ]
                },
                {
                    title: 'Correcciones en documentos oficiales',
                    items: [
                        'No agregues notas personales dentro del informe para explicar errores de una constancia o certificado.',
                        'Solicita a la entidad la reemisión del documento corregido o un memorando o resolución de aclaración oficial con firma y sello.'
                    ]
                },
                {
                    title: 'Formato, numeración y entrega',
                    items: [
                        'Configura márgenes de 3 cm en los cuatro lados, interlineado de 1.5 y fuente Arial de 12 puntos para el cuerpo del texto.',
                        'Usa Arial de 14 puntos en negrita para títulos de capítulos y Arial de 12 puntos en negrita para subtítulos.',
                        'Limita la subdivisión de apartados a tres niveles; por ejemplo: 5.1.1.',
                        'Coloca el número de página en la esquina superior derecha, sin adornos. No muestres numeración en las páginas preliminares ni en los anexos.',
                        'Para la revisión previa, presenta el ejemplar impreso espiralado con mica negra.',
                        'Entrega también los archivos digitales en PDF y DOCX editable para facilitar la revisión y el levantamiento de observaciones.'
                    ]
                },
                {
                    title: 'Documentos que deben acompañar el informe',
                    items: [
                        'Verifica que estén la Carta de Presentación (Anexo 01), la Carta de Aceptación (Anexo 02), la Carta de Compromiso Ético y Profesional (Anexo 03), la Ficha de Evaluación completada (Anexo 04) y el certificado o constancia oficial de prácticas (Anexo 05).',
                        'Revisa el paso “Armar los anexos” para confirmar el conjunto completo y el orden en que debes incorporarlo.'
                    ]
                }
            ],
            close: 'Antes de entregar, confirma con tu asesor y con la Facultad de Ingeniería que el reglamento, los formatos y los criterios de evaluación continúen vigentes.'
        }
    },
    {
        id: 'anexos',
        label: 'Armar los anexos',
        summary: 'Reúne los documentos obtenidos durante las prácticas, ordénalos del Anexo 01 al 05 e incorpóralos al informe.',
        guide: {
            heading: 'Reúne y ordena cada anexo',
            intro: 'No necesitas volver a descargar documentos. Obtén las copias que guardaste durante el módulo “Gestión y desarrollo de las prácticas”, verifica que estén completas e incorpóralas al informe en el siguiente orden.',
            keys: [
                {
                    code: 'Anexo 01',
                    text: 'Carta de presentación. La obtuviste en “Solicitar carta de presentación”, donde guardaste una copia para el informe.',
                    reference: {
                        href: '#rutas?ruta=practicas-preprofesionales&modulo=pasos-iniciales&paso=carta-solicitud',
                        label: 'Ver Solicitar carta de presentación'
                    }
                },
                {
                    code: 'Anexo 02',
                    text: 'Carta de aceptación de prácticas preprofesionales. La recogiste y copiaste en “Solicitar carta de aceptación”.',
                    reference: {
                        href: '#rutas?ruta=practicas-preprofesionales&modulo=pasos-iniciales&paso=carta-aceptacion',
                        label: 'Ver Solicitar carta de aceptación'
                    }
                },
                {
                    code: 'Anexo 03',
                    text: 'Carta de compromiso de conducta ética y profesional. La completaste y guardaste al solicitar la carta de aceptación.',
                    reference: {
                        href: '#rutas?ruta=practicas-preprofesionales&modulo=pasos-iniciales&paso=carta-aceptacion',
                        label: 'Ver Solicitar carta de aceptación'
                    }
                },
                {
                    code: 'Anexo 04',
                    text: 'Ficha de evaluación de las prácticas preprofesionales. El asesor la completó durante la visita y la conservaste después de realizar el paso “Coordinar con el asesor”.',
                    reference: {
                        href: '#rutas?ruta=practicas-preprofesionales&modulo=pasos-iniciales&paso=coordinar-asesor',
                        label: 'Ver Coordinar con el asesor'
                    }
                },
                {
                    code: 'Anexo 05',
                    text: 'Certificado o constancia de prácticas emitido por la entidad. Lo obtuviste en “Solicitar el certificado o constancia de prácticas” y debe incluir las fechas, horas, firma y sello correspondientes.',
                    reference: {
                        href: '#rutas?ruta=practicas-preprofesionales&modulo=pasos-iniciales&paso=certificado-practicas',
                        label: 'Ver Solicitar certificado'
                    }
                }
            ],
            close: 'Comprueba que cada documento sea legible, esté completo y tenga las firmas, sellos y fechas que correspondan antes de insertarlo en la plantilla.'
        }
    },
    {
        id: 'presentar-informe',
        label: 'Presentar el informe',
        summary: 'Envía las versiones PDF y DOCX del informe al correo de la Facultad de Ingeniería y realiza el seguimiento de la revisión.',
        guide: {
            heading: 'Cómo presentar el informe por correo',
            keys: [
                { code: '1', text: 'Prepara la versión final del informe en dos formatos: <strong>DOCX editable</strong> y <strong>PDF</strong>. Verifica que ambos archivos tengan el mismo contenido.' },
                { code: '2', text: 'Abre un correo nuevo dirigido al <strong>correo institucional de la Facultad de Ingeniería</strong>.' },
                { code: '3', text: 'Escribe este asunto y reemplaza los datos personales encerrados entre llaves (código, apellidos y nombres):<br><strong>PRESENTACIÓN DE INFORME FINAL DE PRÁCTICAS PRE-PROFESIONALES - {CÓDIGO DE ESTUDIANTE} - {APELLIDOS} {NOMBRES}</strong>' },
                {
                    code: '4',
                    text: 'Copia este mensaje y completa tus datos exactos donde aparecen las llaves:',
                    copyBox: {
                        id: 'copy-informe-mensaje',
                        content: 'Mediante el presente correo, saludo cordialmente a su despacho y solicito el trámite de revisión de mi Informe Final de Prácticas Pre-Profesionales {NÚMERO DE PRÁCTICA PRE-PROFESIONAL}, de conformidad con el reglamento vigente de la Escuela Profesional.<br><br><strong>Estudiante:</strong> {APELLIDOS Y NOMBRES}<br><strong>Código de estudiante:</strong> {CÓDIGO}<br><strong>Escuela Profesional:</strong> Ingeniería de Sistemas e Informática<br><strong>Número de celular:</strong> {NÚMERO DE CELULAR}<br><strong>Lugar de desarrollo de prácticas:</strong> {NOMBRE DE LA ENTIDAD}'
                    }
                },
                { code: '5', text: 'Adjunta el PDF y el DOCX. Antes de enviar, revisa el destinatario, el asunto, tus datos y que los dos archivos se hayan cargado correctamente.' },
                {
                    code: '6',
                    text: 'Envía el correo dentro del plazo establecido para tu carrera. La Facultad podría no enviar una confirmación automática; es posible que la siguiente comunicación llegue al concluir la revisión. El plazo de evaluación y emisión del dictamen dependerá del reglamento específico de tu escuela profesional.',
                    reference: {
                        panelId: 'plazos-presentacion-informe',
                        label: 'Consultar plazo de presentación'
                    }
                },
                { code: '7', text: 'Revisa el dictamen cuando lo recibas. Si contiene observaciones, corrige el informe y vuelve a enviarlo respetando estrictamente el plazo comunicado en el documento. En el caso de <strong>Ingeniería de Sistemas e Informática</strong>, este plazo no debe exceder los <strong>5 días hábiles</strong> (sin contar sábados, domingos ni feriados). Si eres de otra carrera, asegúrate de cumplir con el tiempo máximo establecido por tu propio reglamento. La revisión de las correcciones debe resolverse dentro del plazo general de evaluación o de la prórroga formalmente comunicada.' }
            ],
            infoPanels: [
                {
                    id: 'plazos-presentacion-informe',
                    eyebrow: 'Plazo de entrega',
                    title: 'Plazos para presentar el informe de práctica',
                    intro: 'Selecciona tu carrera para consultar el plazo que corresponde.',
                    table: {
                        caption: 'Plazo para presentar el informe según carrera profesional',
                        columns: [
                            { id: 'plazo', label: 'Plazo para presentar el informe' }
                        ],
                        rows: [
                            {
                                id: 'forestal',
                                shortLabel: 'Forestal',
                                career: 'Ingeniería Forestal y Medio Ambiente',
                                cells: [
                                    {
                                        column: 'plazo',
                                        value: '10 días calendario',
                                        note: 'Posteriores a la fecha de término de la práctica.'
                                    }
                                ]
                            },
                            {
                                id: 'agroindustrial',
                                shortLabel: 'Agroindustrial',
                                career: 'Ingeniería Agroindustrial',
                                cells: [
                                    {
                                        column: 'plazo',
                                        value: 'Plazo máximo de 60 días',
                                        note: 'Posteriores a la fecha del certificado de práctica.'
                                    }
                                ]
                            },
                            {
                                id: 'sistemas',
                                shortLabel: 'Sistemas',
                                career: 'Ingeniería de Sistemas e Informática',
                                cells: [
                                    {
                                        column: 'plazo',
                                        value: '30 días hábiles',
                                        note: 'Posteriores a la fecha de término de la práctica. No se cuentan sábados, domingos ni feriados.'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            close: 'La ausencia de una respuesta automática no significa que el informe haya sido aprobado ni rechazado. Revisa con frecuencia tu bandeja de entrada y la carpeta de correo no deseado. Confirma con la Facultad de Ingeniería que estos plazos continúen vigentes.'
        }
    }
];
