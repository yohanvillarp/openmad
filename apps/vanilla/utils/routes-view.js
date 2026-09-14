import { renderRoutes } from '../pages/routes.js';


export function rerenderRoutesView () {
    const view = document.querySelector('.view-rutas');
    if (view && typeof renderRoutes === 'function') {
        renderRoutes(view);
    }
};
