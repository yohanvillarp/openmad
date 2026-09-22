# ==============================================================================
# OpenMad Monorepo - Makefile de Comandos y Automatizacion
# ==============================================================================
# Este archivo unifica los comandos de instalacion, desarrollo, compilacion,
# calidad de codigo y base de datos para todo el monorepo.
# Compatible con Windows, macOS y Linux.
#
# Uso:
#   make [comando]
#   make help (muestra todos los comandos disponibles)
# ==============================================================================

.DEFAULT_GOAL := help
.PHONY: help install dev-backend dev-web dev-manager dev-vanilla build build-backend \
        build-web build-manager build-vanilla lint test test-e2e check audit \
        db-generate db-migrate db-push db-studio db-seed clean

# ------------------------------------------------------------------------------
# 1. AYUDA Y DOCUMENTACION
# ------------------------------------------------------------------------------

help:
	@echo ===============================================================
	@echo  OpenMad - Comandos del Monorepo
	@echo ===============================================================
	@echo.
	@echo  Instalacion y Configuracion:
	@echo    make install         Instala dependencias en todo el monorepo
	@echo.
	@echo  Servidores de Desarrollo:
	@echo    make dev-backend     Inicia backend (NestJS) en modo watch
	@echo    make dev-web         Inicia app web (React + Vite) en modo dev
	@echo    make dev-manager     Inicia app manager (React + Vite) en modo dev
	@echo    make dev-vanilla     Inicia app vanilla (Vite) en modo dev
	@echo.
	@echo  Compilacion para Produccion:
	@echo    make build           Compila todo el monorepo (backend + web + manager + vanilla)
	@echo    make build-backend   Compila unicamente la API backend
	@echo    make build-web       Compila unicamente la aplicacion React
	@echo    make build-manager   Compila unicamente la aplicacion Manager
	@echo    make build-vanilla   Compila unicamente la aplicacion Vanilla
	@echo.
	@echo  Calidad y Pruebas:
	@echo    make check           Ejecuta linter, pruebas unitarias y e2e
	@echo    make lint            Ejecuta linter en backend, apps/web y apps/manager
	@echo    make test            Ejecuta pruebas unitarias del backend
	@echo    make test-e2e        Ejecuta pruebas e2e del backend
	@echo    make audit           Audita vulnerabilidades npm en el monorepo
	@echo.
	@echo  Base de Datos y Prisma:
	@echo    make db-generate     Genera el cliente Prisma ORM
	@echo    make db-migrate      Ejecuta migraciones pendientes
	@echo    make db-push         Sincroniza esquema directamente con PostgreSQL
	@echo    make db-studio       Abre la interfaz grafica de Prisma Studio
	@echo    make db-seed         Puebla la BD con el catalogo oficial UNAMAD
	@echo.
	@echo  Limpieza:
	@echo    make clean           Limpia carpetas dist y temporales
	@echo ===============================================================

# ------------------------------------------------------------------------------
# 2. INSTALACION Y CONFIGURACION INICIAL
# ------------------------------------------------------------------------------

install:
	@echo :: Instalando dependencias de la raiz del monorepo...
	npm install
	@echo :: Instalando dependencias de apps/vanilla...
	npm --prefix apps/vanilla install
	@echo :: Instalando dependencias de apps/web...
	npm --prefix apps/web install
	@echo :: Instalando dependencias de apps/manager...
	npm --prefix apps/manager install
	@echo :: Instalando dependencias del backend...
	npm --prefix backend install
	@echo :: Todas las dependencias se instalaron correctamente.

# ------------------------------------------------------------------------------
# 3. SERVIDORES DE DESARROLLO LOCAL
# ------------------------------------------------------------------------------

dev-backend:
	npm --prefix backend run start:dev

dev-web:
	npm --prefix apps/web run dev

dev-manager:
	npm --prefix apps/manager run dev

dev-vanilla:
	npm --prefix apps/vanilla run dev

# ------------------------------------------------------------------------------
# 4. COMPILACION Y PRODUCCION (BUILD)
# ------------------------------------------------------------------------------

build: build-vanilla build-web build-manager build-backend
	@echo :: Compilacion de todo el monorepo completada exitosamente.

build-backend:
	@echo :: Compilando backend...
	npm --prefix backend run build

build-web:
	@echo :: Compilando apps/web...
	npm --prefix apps/web run build

build-manager:
	@echo :: Compilando apps/manager...
	npm --prefix apps/manager run build

build-vanilla:
	@echo :: Compilando apps/vanilla...
	npm --prefix apps/vanilla run build

# ------------------------------------------------------------------------------
# 5. CALIDAD DE CODIGO Y PRUEBAS (QA)
# ------------------------------------------------------------------------------

lint:
	@echo :: Ejecutando linter en backend...
	npm --prefix backend run lint
	@echo :: Ejecutando linter en apps/web...
	npm --prefix apps/web run lint
	@echo :: Ejecutando linter en apps/manager...
	npm --prefix apps/manager run lint

test:
	npm --prefix backend test

test-e2e:
	npm --prefix backend run test:e2e

check: lint test test-e2e
	@echo :: Todas las verificaciones de calidad pasaron exitosamente.

audit:
	@echo :: Auditando dependencias del monorepo...
	npm audit
	@echo :: Auditando dependencias del backend...
	npm --prefix backend audit
	@echo :: Auditando dependencias de apps/web...
	npm --prefix apps/web audit
	@echo :: Auditando dependencias de apps/manager...
	npm --prefix apps/manager audit
	@echo :: Auditando dependencias de apps/vanilla...
	npm --prefix apps/vanilla audit

# ------------------------------------------------------------------------------
# 6. BASE DE DATOS Y PRISMA
# ------------------------------------------------------------------------------

db-generate:
	npm --prefix backend run db:generate

db-migrate:
	npm --prefix backend run db:migrate

db-push:
	npm --prefix backend run db:push

db-studio:
	npm --prefix backend run db:studio

db-seed:
	npm --prefix backend run db:seed

# ------------------------------------------------------------------------------
# 7. LIMPIEZA
# ------------------------------------------------------------------------------

clean:
	@echo :: Limpiando artefactos de compilacion...
	node -e "['backend/dist','apps/vanilla/dist','apps/web/dist','apps/manager/dist'].forEach(d => require('fs').rmSync(d, {recursive: true, force: true}))"
	@echo :: Limpieza completada.
