# Docker Setup para Control Escolar

## Requisitos previos
- Docker
- Docker Compose

## Estructura de servicios

El proyecto incluye 3 servicios:
1. **db**: Base de datos PostgreSQL 15
2. **backend**: API Node.js/Express
3. **frontend**: Aplicación React con Nginx

## Inicio rápido

### 1. Construir y levantar todos los servicios

```bash
docker-compose up --build
```

### 2. Levantar en segundo plano

```bash
docker-compose up -d --build
```

### 3. Ver logs

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo base de datos
docker-compose logs -f db
```

## URLs de acceso

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## Configuración con archivo .env

El proyecto utiliza el archivo `Backend/.env` para todas las configuraciones. Docker Compose lee automáticamente este archivo y configura:

- El puerto del backend (ejemplo: 3003)
- Las credenciales de PostgreSQL
- El nombre de la base de datos
- El JWT secret

**Importante**: El `DB_HOST` debe estar configurado como `db` para Docker (el nombre del servicio de base de datos en el docker-compose).

## Flujo de inicialización

1. La base de datos PostgreSQL se inicia primero (vacía, sin tablas)
2. El backend espera a que la base de datos esté lista (healthcheck)
3. El backend inicia y ejecuta `sequelize.sync({ alter: true })` para crear automáticamente todas las tablas
4. Después de 10 segundos, se ejecuta automáticamente el archivo `seeds.sql` para insertar los datos iniciales
5. El frontend se construye y sirve con Nginx

## Gestión de contenedores

### Detener los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes (borra la BD)
```bash
docker-compose down -v
```

### Reiniciar un servicio específico
```bash
docker-compose restart backend
```

### Ver estado de los servicios
```bash
docker-compose ps
```

## Variables de entorno

Todas las variables de entorno se configuran en `Backend/.env`:

```env
PORT=3003                    # Puerto del backend
DB_HOST=db                   # Hostname del servicio de base de datos
DB_PORT=5432                 # Puerto de PostgreSQL
DB_NAME=control_escolar      # Nombre de la base de datos
DB_USER=postgres             # Usuario de PostgreSQL
DB_PASS=tu_password          # Contraseña de PostgreSQL
JWT_SECRET=tu_secret_jwt     # Secret para JWT
```

**Nota**: Para desarrollo local (sin Docker), cambia `DB_HOST` a `localhost` o tu IP local.

## Troubleshooting

### Los seeds no se cargan
```bash
# Ejecutar manualmente (ajusta con tus credenciales del .env)
docker-compose exec backend sh
PGPASSWORD=0852 psql -h db -U postgres -d control_escolar -f /app/seeds.sql
```

### Resetear la base de datos
```bash
docker-compose down -v
docker-compose up --build
```

### Ver contenido de la base de datos
```bash
# Usa las credenciales de tu .env
docker-compose exec db psql -U postgres -d control_escolar
```

### Cambiar entre desarrollo local y Docker

**Para desarrollo local** (sin Docker):
```env
DB_HOST=localhost  # o tu IP local
```

**Para Docker**:
```env
DB_HOST=db
```

## Desarrollo vs Producción

Para desarrollo, puedes modificar el docker-compose.yml para usar volúmenes montados:

```yaml
backend:
  volumes:
    - ./Backend:/app
    - /app/node_modules
  command: npm run dev
```

Esto permitirá hot-reload durante el desarrollo.
