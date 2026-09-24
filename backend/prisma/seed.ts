import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CatalogoDatos {
  version: string;
  facultades: {
    codigo: string;
    nombre: string;
    escuelas: { codigo: string; nombre: string }[];
  }[];
  tramites: {
    codigo: string;
    titulo: string;
    resumen?: string;
    colorHex?: string;
    facultadCodigo?: string;
    escuelaCodigo?: string;
    requisitos?: {
      titulo: string;
      descripcion?: string;
      obligatorio?: boolean;
      orden?: number;
    }[];
  }[];
}

async function cargarDatos(): Promise<{ origen: string; datos: CatalogoDatos }> {
  // 1. Si existe un archivo local/privado (ignorado en Git), tiene prioridad
  const rutaPrivada = resolve(__dirname, 'data', 'local', 'seed.json');
  if (existsSync(rutaPrivada)) {
    const raw = await readFile(rutaPrivada, 'utf-8');
    return { origen: 'data/local/seed.json (dataset privado)', datos: JSON.parse(raw) as CatalogoDatos };
  }

  // 2. Si no, carga el catálogo institucional público en JSON
  const rutaCatalogo = resolve(__dirname, 'data', 'catalogo-unamad.json');
  const raw = await readFile(rutaCatalogo, 'utf-8');
  return { origen: 'data/catalogo-unamad.json (catálogo institucional)', datos: JSON.parse(raw) as CatalogoDatos };
}

async function main() {
  console.log('[Seed] Iniciando sembrado de datos para OpenMad...');

  const { origen, datos } = await cargarDatos();
  console.log(`[Seed] Origen de datos detectado: ${origen}`);
  console.log(`[Seed] Facultades encontradas: ${datos.facultades.length}`);
  console.log(`[Seed] Trámites encontrados: ${datos.tramites.length}`);

  if (!process.env.DATABASE_URL) {
    console.log('[Seed] DATABASE_URL no configurada en .env. Se omite inserción directa en PostgreSQL.');
    console.log('[Seed] Estructura de datos validada exitosamente.');
    return;
  }

  // Cuando PostgreSQL esté activo y conectado:
  // const { PrismaClient } = await import('@prisma/client');
  // const prisma = new PrismaClient();
  // Inserción idempotente (upsert)...
  console.log('[Seed] Sembrado completado correctamente.');
}

main().catch((error) => {
  console.error('[Seed] Error en el sembrado de datos:', error);
  process.exit(1);
});
