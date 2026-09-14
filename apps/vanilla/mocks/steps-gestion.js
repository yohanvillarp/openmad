

export const steps_pasos_iniciales = [
    {
        id: 'carta-solicitud',
        label: 'Solicitar carta de presentación',
        summary: 'Obtén la Ficha de Autorización, realiza los pagos y presenta los documentos requeridos en la Facultad de Ingeniería.',
        cost: 'S/. 16.00',
        guide: {
            hint: 'Puedes abrir la Ficha de Autorización en Drive o descargar una copia editable.',
            downloadUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/export?format=docx',
            downloadLabel: 'Descargar Ficha de Autorización',
            driveUrl: 'https://docs.google.com/document/d/1IXkJkT6HeTQtV7uQXfmR3J7UpD_jNBEZ/edit?usp=sharing&ouid=105896969881545997848&rtpof=true&sd=true',
            driveLabel: 'Abrir Ficha de Autorización',
            heading: 'En este orden',
            keys: [
                {
                    code: '1',
                    text: 'Verifica que hayas aprobado el total de créditos exigido por el reglamento de tu carrera para realizar las prácticas preprofesionales.',
                    reference: {
                        href: '#rutas?ruta=practicas-preprofesionales&modulo=requisitos-previos',
                        label: 'Consultar créditos por carrera'
                    }
                },
                { code: '2', text: 'Descarga e imprime la Ficha de Autorización.' },
                { code: '3', text: 'Paga S/. 10.00 en caja con el código 464. Este pago corresponde a la solicitud de la carta de presentación.' },
                { code: '4', text: 'Paga S/. 6.00 en caja con el código 053. Este pago corresponde al récord académico; solicítalo en la Dirección de Asuntos Académicos presentando el voucher.' },
                {
                    code: '5',
                    text: 'Lleva a la Facultad de Ingeniería los siguientes documentos:',
                    items: [
                        'Voucher de pago de S/. 10.00.',
                        'Récord académico.',
                        'Ficha de Autorización impresa y con todos los datos solicitados.'
                    ]
                },
                { code: '6', text: 'Consulta el plazo de atención indicado por la Facultad y recoge la carta de presentación en la fecha señalada.' },
                { code: '7', text: 'Haz una copia de la carta de presentación y consérvala para el informe: este documento será tu Anexo 01.' }
            ]
        }
    },
    {
        id: 'carta-aceptacion',
        label: 'Solicitar carta de aceptación',
        summary: 'Completa el Anexo 03 y preséntalo junto con la carta de presentación para obtener la carta de aceptación (Anexo 02).',
        template: true,
        driveUrl: 'https://drive.google.com/file/d/1wqWnJEmqdSepC4u50-_RkES4GkDAodpu/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1wqWnJEmqdSepC4u50-_RkES4GkDAodpu',
        guide: {
            hint: 'Descarga el Anexo 03, complétalo y evita editarlo directamente en Google Docs.',
            downloadLabel: 'Descargar Anexo 03',
            driveLabel: 'Ver Anexo 03 en Drive',
            heading: 'En este orden',
            keys: [
                { code: '1', text: 'Descarga y completa los campos del Anexo 03 (Carta de compromiso de conducta ética y profesional).' },
                { code: '2', text: 'Imprime dos copias del Anexo 03: una para entregarla en este paso y otra para conservarla y adjuntarla más adelante en tu informe.' },
                { code: '3', text: 'Presenta la carta de presentación y el Anexo 03 en la oficina correspondiente del área de prácticas preprofesionales.' },
                { code: '4', text: 'Consulta el plazo de atención indicado por la oficina y recoge la carta de aceptación de prácticas preprofesionales en la fecha señalada.' },
                { code: '5', text: 'Haz una copia de la carta de aceptación. Lleva un ejemplar a la Facultad de Ingeniería y conserva el otro para el informe como Anexo 02.' },
                { code: '6', text: 'Te recomendamos consultar con la facultad el contacto de tu asesor de prácticas preprofesionales, es necesario en un módulo siguiente y no querrás volver a la oficina solo para eso.' }
            ]
        }
    },
    {
        id: 'coordinar-asesor',
        label: 'Coordinar con el asesor',
        summary: 'Contacta al asesor, acuerda la fecha de la visita y prepara la ficha de evaluación (Anexo 04).',
        template: true,
        validity: true,
        driveUrl: 'https://drive.google.com/file/d/1KdQ0cny7pWvvMhaMMLfw_r5xbtA7-Ifu/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1KdQ0cny7pWvvMhaMMLfw_r5xbtA7-Ifu',
        guide: {
            hint: 'El asesor utilizará el Anexo 04 para evaluarte durante su visita.',
            downloadLabel: 'Descargar Anexo 04',
            driveLabel: 'Ver Anexo 04 en Drive',
            heading: 'En este orden',
            intro: '<i data-lucide="alert-circle" style="vertical-align: middle; margin-right: 4px; width: 18px; height: 18px;"></i><strong>IMPORTANTE:</strong> Todo este paso debe completarse obligatoriamente MIENTRAS aún estás realizando tus prácticas, no esperes a terminar.',
            keys: [
                { code: '1', text: 'Contacta al asesor asignado. Si no sabes quién es, consulta en la Facultad de Ingeniería.' },
                { code: '2', text: 'Descarga el Anexo 04 y acuerda con el asesor la fecha de la visita al centro de labores.' },
                { code: '3', text: 'El asesor te evaluará en el centro de labores utilizando esta ficha. Cuando esté completada, consérvala para incorporarla al informe.' }
            ]
        }
    },
    {
        id: 'documentar-practicas',
        label: 'Documentar las prácticas',
        summary: 'Registra fotografías, actividades y datos de la entidad que utilizarás como sustento en el informe.',
        guide: {
            hint: 'Solicita autorización antes de tomar fotografías y evita registrar información confidencial.',
            heading: 'En este orden',
            keys: [
                { code: '1', text: 'Con autorización de la entidad, toma algunas fotografías de las actividades que realices. Evita registrar o exponer información confidencial o no autorizada.' },
                { code: '2', text: 'Toma al menos una fotografía de la fachada de la entidad, pues deberás incluirlas en el informe.' },
                { code: '3', text: 'Registra las actividades realizadas, sus fechas, los recursos utilizados y los resultados obtenidos. Utiliza estas notas al redactar el informe.' },
                { code: '4', text: 'Recopila la dirección exacta, la estructura organizacional, la misión, la visión y los demás datos de la entidad solicitados en la plantilla del informe.' }
            ]
        }
    },
    {
        id: 'certificado-practicas',
        label: 'Solicitar el certificado o constancia de prácticas',
        summary: 'Cuando completes el periodo y las horas requeridas, solicita a la entidad el documento oficial que será tu Anexo 05.',
        guide: {
            heading: 'En este orden',
            intro: 'Inicia este trámite cuando hayas cumplido la fecha de término y la cantidad de horas establecidas para tus prácticas.',
            keys: [
                { code: '1', text: 'Consulta con la entidad qué oficina emite la constancia o el certificado de prácticas, qué requisitos debes presentar y cuál es el plazo de entrega.' },
                { code: '2', text: 'Reúne los requisitos y presenta la solicitud en la oficina indicada. Solicita que el documento consigne correctamente:<ul><li>Tu nombre completo.</li><li>El área donde realizaste las prácticas.</li><li>Las fechas y horas exactas de inicio y fin.</li><li>El total de horas cumplidas.</li></ul>' },
                { code: '3', text: 'Registra el plazo informado por el personal responsable y acude a recoger el documento en la fecha indicada.' },
                { code: '4', text: 'Recoge la constancia o el certificado y verifica antes de retirarte que los datos sean correctos, que el área coincida con aquella donde realizaste las prácticas y que tenga fecha, firma y sello de la entidad. Este documento será tu Anexo 05.' }
            ],
            close: 'Las fechas, el periodo y las horas del certificado deben coincidir con la carta de presentación, la ficha de evaluación y lo declarado en el informe. Si encuentras un error, solicita que la entidad corrija o reemita el documento; no lo subsanes con una nota personal.'
        }
    }
];
