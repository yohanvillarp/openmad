import type { Faculty } from './types';

export const MOCK_FACULTIES_UNAMAD: Faculty[] = [
  {
    id: 'fac_ing',
    name: 'Facultad de Ingeniería',
    careers: [
      {
        id: 'isi',
        name: 'Ingeniería de Sistemas e Informática',
        initials: 'ISI',
        isAvailable: true,
      },
      {
        id: 'ifma',
        name: 'Ingeniería Forestal y Medio Ambiente',
        initials: 'IFMA',
        isAvailable: false,
      },
      {
        id: 'ia',
        name: 'Ingeniería Agroindustrial',
        initials: 'IA',
        isAvailable: false,
      }
    ]
  },
  {
    id: 'fac_eco',
    name: 'Facultad de Ecoturismo',
    careers: [
      {
        id: 'eco',
        name: 'Ecoturismo',
        initials: 'ECO',
        isAvailable: false,
      },
      {
        id: 'ad',
        name: 'Administración y Negocios Internacionales',
        initials: 'AD',
        isAvailable: false,
      },
      {
        id: 'cp',
        name: 'Contabilidad y Finanzas',
        initials: 'CP',
        isAvailable: false,
      }
    ]
  },
  {
    id: 'fac_edu',
    name: 'Facultad de Educación',
    careers: [
      {
        id: 'edu_i',
        name: 'Educación Inicial y Especial',
        initials: 'EIE',
        isAvailable: false,
      },
      {
        id: 'edu_p',
        name: 'Educación Primaria e Informática',
        initials: 'EPI',
        isAvailable: false,
      },
      {
        id: 'enf',
        name: 'Enfermería',
        initials: 'ENF',
        isAvailable: false,
      },
      {
        id: 'med_vet',
        name: 'Medicina Veterinaria y Zootecnia',
        initials: 'MVZ',
        isAvailable: false,
      },
      {
        id: 'der',
        name: 'Derecho y Ciencias Políticas',
        initials: 'DCP',
        isAvailable: false,
      }
    ]
  }
];
