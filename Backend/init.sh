#!/bin/sh

echo "Esperando que la base de datos esté lista..."
sleep 5

echo "Iniciando servidor y creando tablas con Sequelize..."
node src/index.js &
SERVER_PID=$!

echo "Esperando a que las tablas se creen..."
sleep 10

# Verificar que las tablas existen antes de cargar seeds
echo "Verificando si las tablas están creadas..."
TABLES=$(PGPASSWORD=${DB_PASS} psql -h db -U ${DB_USER} -d ${DB_NAME} -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")

if [ "$TABLES" -gt 0 ]; then
    echo "Tablas detectadas. Cargando datos iniciales desde seeds.sql..."
    PGPASSWORD=${DB_PASS} psql -h db -U ${DB_USER} -d ${DB_NAME} -f /app/seeds.sql
    echo "Datos iniciales cargados exitosamente"
else
    echo "Advertencia: No se detectaron tablas. Los seeds no se cargaron."
fi

# Mantener el servidor corriendo
wait $SERVER_PID
