# Convenciones para Base de Datos y Modelos (PostgreSQL & Prisma)

En todo el proyecto OpenMad, la base de datos está modelada para el contexto institucional y académico de la UNAMAD. Se debe cumplir estrictamente la siguiente regla:

## Regla Principal: Nomenclatura en Español

**Todos los nombres de tablas y campos/columnas de la base de datos deben estar en español respetando el formato estándar.**

### Estándares de Formato en PostgreSQL
1. **Tablas**:
   - Deben estar en **español**, en **plural** y usando **`snake_case`**.
   - Ejemplo: `tramites`, `requisitos_tramite`, `facultades`, `escuelas_profesionales`, `usuarios`.
2. **Columnas / Campos**:
   - Deben estar en **español**, en **singular** (salvo colecciones o arreglos) y usando **`snake_case`**.
   - Ejemplo: `id`, `nombre`, `descripcion`, `codigo_tramite`, `facultad_id`, `escuela_id`, `fecha_creacion`, `fecha_actualizacion`, `activo`.
3. **Claves Primarias y Foráneas**:
   - Clave primaria: `id` (o `id_<tabla>` si aplica una regla específica, preferentemente `id`).
   - Clave foránea: `<entidad_singular>_id` (e.g., `facultad_id`, `tramite_id`).
4. **Campos Temporales y Auditoría**:
   - `fecha_creacion` (en lugar de `created_at`).
   - `fecha_actualizacion` (en lugar de `updated_at`).
   - `fecha_eliminacion` (en lugar de `deleted_at`).

### Estándares en Modelos Prisma
En `schema.prisma`, para mantener coherencia idiomática en TypeScript (`camelCase` en el código de aplicación) y cumplir con el estándar `snake_case` en español en PostgreSQL:
- Se utilizan decoradores `@map("nombre_columna")` para campos.
- Se utiliza el decorador `@@map("nombre_tabla")` para modelos.

#### Ejemplo de Modelo Prisma:
```prisma
model Tramite {
  id                String    @id @default(uuid())
  codigo            String    @unique @map("codigo")
  titulo            String    @map("titulo")
  descripcion       String?   @map("descripcion")
  colorHex          String?   @map("color_hex")
  facultadId        String?   @map("facultad_id")
  escuelaId         String?   @map("escuela_id")
  activo            Boolean   @default(true) @map("activo")
  fechaCreacion     DateTime  @default(now()) @map("fecha_creacion")
  fechaActualizacion DateTime @updatedAt @map("fecha_actualizacion")

  requisitos        RequisitoTramite[]

  @@map("tramites")
}

model RequisitoTramite {
  id                String    @id @default(uuid())
  tramiteId         String    @map("tramite_id")
  titulo            String    @map("titulo")
  descripcion       String?   @map("descripcion")
  obligatorio       Boolean   @default(true) @map("obligatorio")
  orden             Int       @default(0) @map("orden")
  fechaCreacion     DateTime  @default(now()) @map("fecha_creacion")
  fechaActualizacion DateTime @updatedAt @map("fecha_actualizacion")

  tramite           Tramite   @relation(fields: [tramiteId], references: [id], onDelete: Cascade)

  @@map("requisitos_tramite")
}
```
