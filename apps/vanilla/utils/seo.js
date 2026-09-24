/**
 * Gestor dinámico de metadatos SEO en cliente (Single Page Application).
 */

const BASE_URL = 'https://openmad.nikelyh.tech/';
const DEFAULT_TITLE = 'OpenMad | Guía de Trámites y Procesos Académicos UNAMAD';
const DEFAULT_DESCRIPTION = 'Guía estudiantil independiente para trámites, matrícula, bachiller, prácticas y procesos académicos en la Universidad Nacional Amazónica de Madre de Dios (UNAMAD).';

/**
 * Mapeo de metadatos por hash o ruta
 */
export const SEO_ROUTES = {
    '': {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION
    },
    '#home': {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION
    },
    '#rutas': {
        title: 'Rutas Académicas y Trámites Universitarios | OpenMad UNAMAD',
        description: 'Explora paso a paso los requisitos, formatos y procedimientos para tus trámites académicos en la UNAMAD.'
    },
    '#conceptos': {
        title: 'Glosario de Términos Académicos UNAMAD | OpenMad',
        description: 'Conoce el significado de conceptos clave universitarios: créditos, mallas curriculares, prerequisitos y reglamentos.'
    },
    '#faq': {
        title: 'Preguntas Frecuentes sobre Trámites UNAMAD | OpenMad',
        description: 'Respuestas claras y directas a las dudas más comunes sobre trámites, pagos, plazos y ventanillas en la UNAMAD.'
    },
    '#contacto': {
        title: 'Contacto y Aporte Comunitario | OpenMad UNAMAD',
        description: 'Reporta información desactualizada, envía sugerencias o súmate a la comunidad estudiantil de OpenMad.'
    },
    '#perfil': {
        title: 'Mi Progreso de Trámites | OpenMad UNAMAD',
        description: 'Seguimiento personalizado de tu avance en los pasos y tareas de tus procesos académicos.'
    }
};

/**
 * Actualiza las etiquetas de título, descripción y canónicas en tiempo real.
 * @param {object} options
 * @param {string} [options.title]
 * @param {string} [options.description]
 * @param {string} [options.hash]
 */
export function updateSeoTags ({ title, description, hash } = {}) {
    const activeHash = hash || window.location.hash || '';
    const routeMeta = SEO_ROUTES[activeHash.split('?')[0]] || {};

    const resolvedTitle = title || routeMeta.title || DEFAULT_TITLE;
    const resolvedDescription = description || routeMeta.description || DEFAULT_DESCRIPTION;
    const resolvedUrl = `${BASE_URL}${activeHash}`;

    // 1. Título del documento
    document.title = resolvedTitle;

    // 2. Metadatos estándar
    setMetaTag('name', 'description', resolvedDescription);

    // 3. Open Graph (WhatsApp, Facebook)
    setMetaTag('property', 'og:title', resolvedTitle);
    setMetaTag('property', 'og:description', resolvedDescription);
    setMetaTag('property', 'og:url', resolvedUrl);

    // 4. Twitter Cards
    setMetaTag('property', 'twitter:title', resolvedTitle);
    setMetaTag('property', 'twitter:description', resolvedDescription);
    setMetaTag('property', 'twitter:url', resolvedUrl);

    // 5. Enlace canónico
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedUrl);
}

function setMetaTag (attrName, attrValue, content) {
    let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

/**
 * Inyecta o actualiza un bloque de datos estructurados JSON-LD en el head.
 * @param {object|null} schemaData
 * @param {string} [id]
 */
export function updateStructuredData (schemaData, id = 'dynamic-seo-schema') {
    let scriptTag = document.getElementById(id);
    if (!schemaData) {
        if (scriptTag) scriptTag.remove();
        return;
    }
    if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = id;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
}

