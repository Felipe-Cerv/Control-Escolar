# Docker Compose para Desarrollo

Este archivo configura PostgreSQL para desarrollo local.

## Uso

### Iniciar la base de datos:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Detener la base de datos:
```bash
docker-compose -f docker-compose.dev.yml down
```

### Ver logs:
```bash
docker-compose -f docker-compose.dev.yml logs -f postgres
```

### Reiniciar (borrar datos):
```bash
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

### Conectar con psql:
```bash
docker exec -it control-escolar-db psql -U postgres -d control_escolar
```

## Configuración

- **Puerto**: 5432
- **Usuario**: postgres
- **Password**: postgres
- **Base de datos**: control_escolar

## Scripts de inicialización

Los archivos SQL en `db/init/` se ejecutan automáticamente al crear el contenedor por primera vez.
Los archivos se ejecutan en orden alfabético.

## Datos persistentes

Los datos se guardan en un volumen Docker llamado `postgres_data`. 
Para borrar los datos, usa: `docker-compose -f docker-compose.dev.yml down -v`
