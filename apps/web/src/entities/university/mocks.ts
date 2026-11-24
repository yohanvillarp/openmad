import type { University } from './types';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: 'unamad',
    name: 'Universidad Nacional Amazónica de Madre de Dios',
    initials: 'UNAMAD',
    color: '#16a34a', // Verde institucional
    isAvailable: true,
    routeCount: 1,
    contributors: [
      { name: 'Yohan Villar', url: 'https://www.linkedin.com/in/yohanvillarp/' },
      { name: 'Roxana Pillco', url: 'https://github.com/roxana' },
      { name: 'Isaac Huircan'},
      { name: 'Juan Pablo', url: 'https://linkedin.com/in/juanpablo' },
      { name: 'Yefry Cardenas'},
      { name: 'Miguel Angel', url: 'https://github.com/miguel' },
      { name: 'Andres'},
    ]
  },
  {
    id: 'unmsm',
    name: 'Universidad Nacional Mayor de San Marcos',
    initials: 'UNMSM',
    color: '#831c22', // Guinda San Marcos
    isAvailable: true,
    routeCount: 0,
    contributors: [
      { name: 'Camila Quispe', url: 'https://linkedin.com/in/camila' },
      { name: 'Diego Torres' },
      { name: 'Valeria M.', url: 'https://github.com/valeria' },
    ]
  },
  {
    id: 'uni',
    name: 'Universidad Nacional de Ingeniería',
    initials: 'UNI',
    color: '#7f1d1d', // Granate UNI
    isAvailable: true,
    routeCount: 0,
    contributors: [
      { name: 'Arturo Gómez' },
      { name: 'Jorge L.', url: 'https://github.com/jorge' },
    ]
  }
];
