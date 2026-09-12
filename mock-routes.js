window.App = window.App || {};
window.App.mocks = window.App.mocks || {};

window.App.mocks.routeIntro =
    'Elige el proceso académico que quieres realizar. Cada tarjeta muestra cuántos módulos contiene, el XP disponible y tu estado de avance.';

window.App.mocks.program = {
    code: 'ISI',
    name: 'Ingeniería de Sistemas e Informática',
    color: '#7c6bc4'
};

window.App.mocks.university = {
    code: 'UNAMAD',
    name: 'Universidad Nacional Amazónica de Madre de Dios',
    color: '#22c55e'
};

window.App.mocks.routes = [
    {
        id: 'practicas-preprofesionales',
        label: 'Prácticas preprofesionales',
        summary: 'Gestiona los documentos, el desarrollo, el informe y la sustentación de tus prácticas preprofesionales.',
        color: '#0d9488'
    },
    {
        id: 'tesis',
        label: 'Tesis',
        summary: 'Del plan a la sustentación: asesoría, documentos y plazos en un solo hilo, sin adivinar el siguiente paso.',
        color: '#1a2b5f'
    },
    {
        id: 'grado-bachiller',
        label: 'Grado de bachiller',
        summary: 'El cierre de la carrera: requisitos de egreso, constancias y pagos para que te reconozcan el grado.',
        color: '#22c55e'
    },
    {
        id: 'titulo-profesional',
        label: 'Título profesional',
        summary: 'Después del bachiller: la ruta para titularte, con formatos, costos referenciales y lo que hay que presentar.',
        color: '#f54477'
    }
];
