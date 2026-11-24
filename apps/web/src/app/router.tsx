import { createBrowserRouter } from 'react-router';
import { AppLayout } from './layout/AppLayout';
import { PaginaInicio } from '@pages/inicio';
import { ContextoPage } from '@pages/contexto';
import { MiRutaPage } from '@pages/mi-ruta';
import { UniversidadesPage } from '@pages/universidades';
import { UniversityDetailsPage } from '@pages/university-details';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <PaginaInicio />,
      },
      {
        path: '/contexto/:seccion?',
        element: <ContextoPage />,
      },
      {
        path: '/universidades',
        element: <UniversidadesPage />,
      },
      {
        path: '/universidades/:universityId',
        element: <UniversityDetailsPage />,
      },
      {
        path: '/miruta',
        element: <MiRutaPage />,
      },
    ],
  },
]);
