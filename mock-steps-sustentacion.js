window.App = window.App || {};
window.App.mocks = window.App.mocks || {};
window.App.mocks.stepsByModule = window.App.mocks.stepsByModule || {};

window.App.mocks.stepsByModule['sustentacion-practicas'] = [
    {
        id: 'confirmar-sustentacion',
        label: 'Confirmar la fecha de sustentación',
        summary: 'Verifica el correo oficial que confirma la aprobación del informe y comunica la fecha y hora de la sustentación.',
        validity: true,
        guide: {
            heading: 'Antes de continuar',
            keys: [
                { code: '1', text: 'Espera el correo de la Facultad que confirme expresamente la aprobación del informe y la autorización para sustentar.' },
                { code: '2', text: 'Verifica que el mensaje indique la fecha y la hora de la sustentación. Revisa también si especifica lugar, modalidad u otras indicaciones.' },
                { code: '3', text: 'Conserva el correo como constancia y organiza tu preparación según la fecha comunicada.' }
            ],
            close: 'No des por programada la sustentación hasta recibir una comunicación oficial con fecha y hora.'
        }
    },
    {
        id: 'preparar-copias',
        label: 'Preparar las copias del informe',
        summary: 'Imprime la cantidad indicada en el correo y coloca cada ejemplar en un fólder manila.',
        guide: {
            heading: 'Qué debes preparar',
            keys: [
                { code: '1', text: 'Revisa cuántas copias solicita el correo de programación. Generalmente son tres, pero debes respetar la cantidad que indique la Facultad.' },
                { code: '2', text: 'Coloca cada ejemplar en un fólder manila, siguiendo las indicaciones recibidas.' },
                { code: '3', text: 'Habitualmente se destinan dos copias al jurado y una al registro administrativo. Confirma en el correo o con la Facultad el destino de cada ejemplar.' }
            ]
        }
    },
    {
        id: 'preparar-expo',
        label: 'Preparar la exposición y las respuestas',
        summary: 'Repasa las actividades realizadas, organiza la exposición y prepárate para responder preguntas.',
        guide: {
            heading: 'Cómo prepararte',
            keys: [
                { code: '1', text: 'Organiza una exposición clara sobre la entidad, las actividades realizadas, los resultados y lo aprendido durante las prácticas.' },
                { code: '2', text: 'Repasa el contenido del informe y las evidencias para responder preguntas del jurado con datos consistentes.' },
                { code: '3', text: 'Prepara las diapositivas y practica la exposición dentro del tiempo asignado.' },
                { code: '4', text: 'Generalmente debes llevar una laptop para proyectar. Guarda las diapositivas en la laptop y en una memoria USB, y lleva el cargador y los adaptadores que puedas necesitar.' }
            ],
            close: 'Confirma en el correo de programación si la Facultad solicita diapositivas, laptop u otros materiales específicos.'
        }
    },
    {
        id: 'sustentar',
        label: 'Realizar la sustentación',
        summary: 'Preséntate en la fecha y hora confirmadas, entrega las copias y sustenta el trabajo realizado.',
        guide: {
            heading: 'El día de la sustentación',
            keys: [
                { code: '1', text: 'Llega con anticipación y lleva los ejemplares, las diapositivas, la laptop y los demás materiales indicados por la Facultad.' },
                { code: '2', text: 'Expón las actividades y resultados de tus prácticas, y responde las preguntas del jurado.' },
                { code: '3', text: 'Al finalizar, el jurado realizará la evaluación y te indicará la fecha en la que podrás recoger el acta de sustentación.' },
                { code: '4', text: 'Regresa en la fecha indicada y recoge el acta. Antes de retirarte, verifica que tus datos y el resultado consignado sean correctos.' },
                { code: '5', text: 'La calificación asignada por el jurado se mostrará en el intranet al finalizar el semestre, registrada como un curso adicional de <strong>0 créditos</strong>.' }
            ],
            close: 'Guarda el acta como constancia y revisa el intranet al cierre del semestre para verificar el registro de la calificación. ¡Felicidades! Cuando recojas el acta, habrás completado esta ruta.'
        }
    }
];
