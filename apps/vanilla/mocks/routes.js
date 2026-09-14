import { faculties, getSchoolById } from './careers.js';

export const routeIntro = 'Elige un proceso académico y revisa su alcance, contenido disponible y estado de avance.';
export const DEFAULT_ROUTE_SCOPE = 'Ámbito por confirmar';

export const university = {
    code: 'UNAMAD',
    name: 'Universidad Nacional Amazónica de Madre de Dios',
    color: '#22c55e'
};

export const routes = [
    {
        id: 'practicas-preprofesionales',
        label: 'Prácticas preprofesionales',
        summary: 'Gestiona los documentos, el desarrollo, el informe y la sustentación de tus prácticas preprofesionales.',
        color: '#0d9488',
        facultyId: 'ingenieria',
        schoolId: 'sistemas-informatica',
        requirements: {
            id: 'requisitos-previos',
            kind: 'informational',
            label: 'Antes de comenzar',
            summary: 'Consulta los créditos aprobados que exige tu carrera antes de realizar las prácticas preprofesionales.',
            color: 'var(--requirements)',
            items: [
              {
                id: 'creditos-aprobados',
                title: 'Créditos aprobados por carrera',
                text: 'Tener aprobado el total de créditos establecidos en el reglamento de su carrera profesional para realizar las prácticas preprofesionales.',
                table: {
                    caption: 'Créditos aprobados requeridos según carrera profesional y etapa de prácticas',
                    columns: [
                        { id: 'practica-i', label: 'Práctica I' },
                        { id: 'practica-ii', label: 'Práctica II' },
                        { id: 'practica-iii', label: 'Práctica III' }
                    ],
                    rows: [
                        {
                            id: 'forestal',
                            shortLabel: 'Forestal',
                            career: 'Ingeniería Forestal y Medio Ambiente',
                            cells: [
                                { column: 'practica-i', credits: 130 },
                                { column: 'practica-ii', credits: 150 },
                                { column: 'practica-iii' }
                            ]
                        },
                        {
                            id: 'agroindustrial',
                            shortLabel: 'Agroindustrial',
                            career: 'Ingeniería Agroindustrial',
                            cells: [
                                { column: 'practica-i', credits: 147 },
                                {
                                    column: 'practica-ii',
                                    credits: 202,
                                    note: 'También debes haber aprobado la Práctica I.'
                                },
                                { column: 'practica-iii' }
                            ]
                        },
                        {
                            id: 'sistemas',
                            shortLabel: 'Sistemas',
                            career: 'Ingeniería de Sistemas e Informática',
                            cells: [
                                {
                                    columns: ['practica-i', 'practica-ii', 'practica-iii'],
                                    label: 'Prácticas I, II y III',
                                    credits: 160,
                                    note: 'Para iniciar las prácticas preprofesionales.'
                                },
                            ]
                        }
                    ]
                }
              }
            ]
        }
    },
    {
        id: 'tesis',
        label: 'Tesis',
        summary: 'Del plan a la sustentación: asesoría, documentos y plazos en un solo hilo, sin adivinar el siguiente paso.',
        color: 'var(--academic-navy)'
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

export function getRouteFaculty(route) {
    if (!route || !route.facultyId) return null;
    return faculties.find((faculty) => faculty.id === route.facultyId) || null;
}

export function getRouteSchool(route) {
    if (!route || !route.schoolId) return null;
    return getSchoolById(route.facultyId, route.schoolId);
}

export function getRouteScopeLabel(route) {
    const faculty = getRouteFaculty(route);
    const school = getRouteSchool(route);
    if (school) return school.label;
    return faculty ? faculty.label : DEFAULT_ROUTE_SCOPE;
}
