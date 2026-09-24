#!/usr/bin/env node
/**
 * scripts/scaffold-fsd-slice.js
 * Generador automatizado de slices para Feature-Sliced Design (FSD).
 * Uso:
 *   node scripts/scaffold-fsd-slice.js <app> <capa> <nombre-slice>
 * Ejemplo:
 *   node scripts/scaffold-fsd-slice.js web features buscar-tramite
 *   node scripts/scaffold-fsd-slice.js manager entities usuario
 */

import fs from 'node:fs';
import path from 'node:path';

const app = process.argv[2];
const layer = process.argv[3];
const slice = process.argv[4];

const validApps = ['web', 'manager'];
const validLayers = ['features', 'entities', 'widgets', 'pages'];

if (!app || !layer || !slice) {
  console.error(':: Error: Argumentos incompletos.');
  console.error(':: Uso: node scripts/scaffold-fsd-slice.js <app> <capa> <nombre-slice>');
  console.error('::   <app>: web | manager');
  console.error('::   <capa>: features | entities | widgets | pages');
  console.error('::   <nombre-slice>: nombre descriptivo en kebab-case');
  process.exit(1);
}

if (!validApps.includes(app)) {
  console.error(`:: Error: App '${app}' no valida. Opciones validas: ${validApps.join(', ')}`);
  process.exit(1);
}

if (!validLayers.includes(layer)) {
  console.error(`:: Error: Capa '${layer}' no valida. Opciones validas: ${validLayers.join(', ')}`);
  process.exit(1);
}

const kebab = slice.toLowerCase().replace(/[^a-z0-9]/g, '-');
const camel = kebab.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());
const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);

const repoRoot = path.resolve(import.meta.dirname, '..');
const targetDir = path.join(repoRoot, 'apps', app, 'src', layer, kebab);

if (fs.existsSync(targetDir)) {
  console.error(`:: Error: La slice '${kebab}' ya existe en: ${targetDir}`);
  process.exit(1);
}

console.log(`:: Generando slice FSD en apps/${app}/src/${layer}/${kebab}...`);

// 1. Model Types
const typesContent = `export interface ${pascal}Props {
  id?: string;
  className?: string;
}
`;

// 2. UI Component
const uiContent = `import type { ${pascal}Props } from '../model/types.js';

export function ${pascal}({ className = '' }: ${pascal}Props) {
  return (
    <div className={\`rounded-lg border border-slate-800 bg-slate-950 p-4 \${className}\`}>
      <h3 className="text-base font-semibold text-white">${pascal}</h3>
      <p className="mt-1 text-xs text-slate-400">Componente generado bajo Feature-Sliced Design.</p>
    </div>
  );
}
`;

// 3. Public API (index.ts)
const indexContent = `export { ${pascal} } from './ui/${pascal}.js';
export type { ${pascal}Props } from './model/types.js';
`;

const files = [
  { path: 'model/types.ts', content: typesContent },
  { path: `ui/${pascal}.tsx`, content: uiContent },
  { path: 'index.ts', content: indexContent },
];

for (const f of files) {
  const fullPath = path.join(targetDir, f.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, f.content, 'utf8');
  console.log(`  + Creado: apps/${app}/src/${layer}/${kebab}/${f.path}`);
}

console.log(`:: Slice '${pascal}' creada exitosamente bajo arquitectura FSD.`);
console.log(`:: Importala limpiamente en otras capas usando: import { ${pascal} } from '@/${layer}/${kebab}';`);
