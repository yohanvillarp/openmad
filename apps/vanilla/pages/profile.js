import { getRouteModules, getModuleSteps, isStepDone } from '../utils/progress.js';
import { getRouteXp, getModuleXp, getStepXp } from '../utils/xp.js';
import { isRouteDone, isModuleDone, getRouteStatus } from '../utils/progress-status.js';
import { getRouteScopeLabel, routes } from '../mocks/routes.js';
import { getGraphProgress } from '../utils/progress-graph.js';


function profilePercent(done, total) {
    if (!total) return 0;
    return Math.min(100, Math.round((done / total) * 100));
}

function getRouteProfile(route) {
    const modules = getRouteModules(route.id);
    let modulesDone = 0;
    let stepsDone = 0;
    let stepsTotal = 0;
    let xpEarned = 0;
    let xpTotal = getRouteXp(route);

    if (isRouteDone(route.id)) {
        xpEarned += getRouteXp(route);
    }

    modules.forEach((mod) => {
        const moduleXp = getModuleXp(route.id, mod);
        const steps = getModuleSteps(mod.id);
        xpTotal += moduleXp;
        stepsTotal += steps.length;

        if (isModuleDone(route.id, mod.id)) {
            modulesDone += 1;
            xpEarned += moduleXp;
        }

        steps.forEach((step) => {
            xpTotal += getStepXp();
            if (isStepDone(route.id, mod.id, step.id)) {
                stepsDone += 1;
                xpEarned += getStepXp();
            }
        });
    });

    return {
        modulesDone: modulesDone,
        modulesTotal: modules.length,
        stepsDone: stepsDone,
        stepsTotal: stepsTotal,
        xpEarned: xpEarned,
        xpTotal: xpTotal,
        status: getRouteStatus(route.id),
        published: modules.length > 0
    };
}

export function renderProfile (container) {
        const progress = getGraphProgress();
    const routeProfiles = routes.map((route) => ({
        route: route,
        progress: getRouteProfile(route)
    }));
    const xpPercent = profilePercent(progress.xp.done, progress.xp.total);

    const stats = [
        {
            icon: 'icon-ruta',
            label: 'Rutas completadas',
            value: `${progress.rutas.done}/${progress.rutas.total}`,
            help: 'de las rutas publicadas'
        },
        {
            icon: 'icon-modulo',
            label: 'Módulos completados',
            value: `${progress.modulos.done}/${progress.modulos.total}`,
            help: 'de los módulos previstos'
        },
        {
            icon: 'icon-paso',
            label: 'Pasos completados',
            value: `${progress.pasos.done}/${progress.pasos.total}`,
            help: 'del contenido publicado'
        },
        {
            icon: 'profile-xp-icon',
            label: 'Experiencia',
            value: `${progress.xp.done} XP`,
            help: `de ${progress.xp.total} XP disponibles`
        }
    ];

    const statCards = stats.map((stat) => `
      <article class="profile-stat">
        <span class="profile-stat__icon ${stat.icon}" aria-hidden="true">${stat.icon === 'profile-xp-icon' ? 'XP' : ''}</span>
        <span class="profile-stat__value">${stat.value}</span>
        <h2>${stat.label}</h2>
        <p>${stat.help}</p>
      </article>
    `).join('');

    const routeCards = routeProfiles.map(({ route, progress: routeProgress }) => {
        const statusLabel = routeProgress.status === 'done'
            ? 'Completada'
            : (routeProgress.status === 'active' ? 'En curso' : 'Pendiente');
        const routePercent = profilePercent(routeProgress.stepsDone, routeProgress.stepsTotal);
        const detail = routeProgress.published
            ? `${routeProgress.modulesDone}/${routeProgress.modulesTotal} módulos · ${routeProgress.stepsDone}/${routeProgress.stepsTotal} pasos · ${getRouteScopeLabel(route)}`
            : `Contenido detallado aún no publicado · ${getRouteScopeLabel(route)}`;

        return `
        <a class="profile-route profile-route--${routeProgress.status}" href="#rutas?ruta=${encodeURIComponent(route.id)}">
          <span class="profile-route__mark" style="background:${route.color}">
            <span class="icon-ruta" aria-hidden="true"></span>
          </span>
          <span class="profile-route__body">
            <span class="profile-route__top">
              <strong>${route.label}</strong>
              <span class="profile-route__status">${statusLabel}</span>
            </span>
            <span class="profile-route__detail">${detail}</span>
            <span class="profile-route__track" aria-hidden="true">
              <span style="width:${routePercent}%"></span>
            </span>
          </span>
          <span class="profile-route__xp">${routeProgress.xpEarned}/${routeProgress.xpTotal} XP</span>
        </a>
      `;
    }).join('');

    container.innerHTML = `
    <section class="page page--profile">
      <header class="profile-header">
        <div>
          <p class="profile-header__eyebrow">Progreso guardado en este navegador</p>
          <h1>Tu perfil de avance</h1>
          <p>Consulta lo que completaste y continúa desde la ruta que estés realizando.</p>
        </div>
        <div class="profile-level" style="--profile-progress:${xpPercent}%">
          <div>
            <strong>${xpPercent}%</strong>
          </div>
        </div>
      </header>

      <div class="profile-stats">${statCards}</div>

      <section class="profile-routes">
        <div class="profile-section-title">
          <div>
            <p>Detalle por ruta</p>
            <h2>Tu avance</h2>
          </div>
          <a href="#rutas">Ver todas las rutas</a>
        </div>
        <div class="profile-route-list">${routeCards}</div>
      </section>

      <p class="profile-storage">
        <i data-lucide="hard-drive"></i>
        Este perfil no usa una cuenta: sus datos permanecen únicamente en el almacenamiento local de este navegador.
      </p>
    </section>
  `;

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ root: container });
    }
};
