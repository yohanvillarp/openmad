export const faculties = [
    {
        id: 'ingenieria',
        label: 'Facultad de Ingeniería',
        schools: [
            { id: 'agroindustrial', label: 'Ingeniería Agroindustrial' },
            { id: 'forestal-medio-ambiente', label: 'Ingeniería Forestal y Medio Ambiente' },
            { id: 'sistemas-informatica', label: 'Ingeniería de Sistemas e Informática' }
        ]
    },
    {
        id: 'educacion',
        label: 'Facultad de Educación',
        schools: [
            { id: 'educacion-matematica-computacion', label: 'Educación Matemática y Computación' },
            { id: 'derecho-ciencias-politicas', label: 'Derecho y Ciencias Políticas' }
        ]
    },
    {
        id: 'empresariales',
        label: 'Facultad de Ciencias Empresariales',
        schools: [
            { id: 'ecoturismo', label: 'Ecoturismo' },
            { id: 'administracion-negocios-internacionales', label: 'Administración y Negocios Internacionales' },
            { id: 'contabilidad-finanzas', label: 'Contabilidad y Finanzas' }
        ]
    },
    {
        id: 'salud',
        label: 'Facultad de Ciencias de la Salud y Biológicas',
        schools: [
            { id: 'enfermeria', label: 'Enfermería' },
            { id: 'medicina-veterinaria-zootecnia', label: 'Medicina Veterinaria y Zootecnia' },
            { id: 'medicina-humana', label: 'Medicina Humana' },
            { id: 'biologia', label: 'Biología' },
            { id: 'psicologia', label: 'Psicología' }
        ]
    }
];

export function getSchoolById(facultyId, schoolId) {
    const faculty = faculties.find((item) => item.id === facultyId);
    if (!faculty) return null;
    return faculty.schools.find((school) => school.id === schoolId) || null;
}
