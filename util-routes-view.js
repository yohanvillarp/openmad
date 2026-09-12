window.App = window.App || {};

window.App.rerenderRoutesView = function () {
    const view = document.querySelector('.view-rutas');
    if (view && typeof window.App.renderRoutes === 'function') {
        window.App.renderRoutes(view);
    }
};
