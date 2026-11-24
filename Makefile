.PHONY: db-up db-down db-logs db-clean dev install dev-server dev-web

# Inicia la base de datos PostgreSQL en segundo plano
db-up:
	docker-compose up -d

# Detiene la base de datos
db-down:
	docker-compose down

# Muestra los logs de la base de datos
db-logs:
	docker-compose logs -f

# Detiene la base de datos y borra los volúmenes (¡Cuidado, borra la data!)
db-clean:
	docker-compose down -v

# Instala todas las dependencias del monorepo
install:
	pnpm install

# Inicia ambos proyectos (si tienes configurado un script "dev" en la raíz)
dev:
	pnpm dev

# Inicia solo el frontend
dev-web:
	pnpm --filter web run dev

# Inicia solo el backend
dev-server:
	pnpm --filter server run start:dev
