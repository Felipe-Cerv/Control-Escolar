FROM node:18-alpine

# Instalar cliente de PostgreSQL
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el código fuente
COPY . .

# Copiar script de inicialización
COPY init.sh /app/init.sh
RUN chmod +x /app/init.sh

# Exponer el puerto
EXPOSE 3003

# Comando para iniciar la aplicación
CMD ["/app/init.sh"]
