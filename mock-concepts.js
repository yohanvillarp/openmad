window.App = window.App || {};
window.App.mocks = window.App.mocks || {};

window.App.mocks.concepts = [
    {
        id: 'ruta',
        label: 'Ruta',
        icon: 'icon-ruta',
        color: '#14213d',
        definition: 'Una ruta representa un objetivo académico completo. Reúne, en el orden correspondiente, todos los módulos, pasos, documentos y validaciones que necesitas para terminar un trámite o proceso de la universidad.',
        examples: [
            'Completar las prácticas preprofesionales.',
            'Desarrollar y sustentar una tesis.',
            'Obtener el grado de bachiller.',
            'Obtener el título profesional.'
        ]
    },
    {
        id: 'modulo',
        label: 'Módulo',
        icon: 'icon-modulo',
        color: '#34465c',
        definition: 'Un módulo es una etapa dentro de una ruta. Agrupa pasos relacionados con un mismo momento u objetivo parcial y se completa automáticamente cuando terminas todos los pasos que contiene.',
        examples: [
            'Gestionar y desarrollar las prácticas.',
            'Redactar y presentar el informe de prácticas.',
            'Preparar la sustentación de prácticas.'
        ]
    },
    {
        id: 'paso',
        label: 'Paso',
        icon: 'icon-paso',
        color: '#516177',
        definition: 'Un paso es una acción concreta que debes realizar. Puede incluir instrucciones, pagos, plazos, documentos o archivos para descargar. Puedes marcarlo como completado y desmarcarlo si te equivocaste.',
        examples: [
            'Solicitar la carta de presentación.',
            'Coordinar la visita del asesor.',
            'Redactar el informe.',
            'Reunir y ordenar los anexos.'
        ]
    },
    {
        id: 'hito',
        label: 'Hito',
        icon: 'icon-hito',
        color: '#10b981',
        definition: 'Un hito es una meta que confirma el cierre de una etapa importante. No se marca manualmente: se alcanza cuando completas todos los pasos de un módulo o todos los módulos de una ruta, y añade el XP correspondiente al avance.',
        examples: [
            'Completar la gestión y el desarrollo de las prácticas.',
            'Finalizar el informe de prácticas.',
            'Completar la sustentación.',
            'Finalizar toda la ruta de prácticas preprofesionales.'
        ]
    }
];
