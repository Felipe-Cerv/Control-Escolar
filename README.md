# Sistema de Control Escolar

Sistema web full-stack para la gestión académica de una institución educativa, permitiendo administrar alumnos, maestros, materias, grupos, periodos escolares y calificaciones.

## 🎯 Descripción

El Sistema de Control Escolar es una aplicación web moderna que facilita la gestión administrativa y académica de instituciones educativas. Permite a los administradores gestionar toda la información del plantel, mientras que los maestros pueden consultar y administrar las calificaciones de sus grupos asignados.

### Características Principales

- **Gestión de Usuarios**: Administración de alumnos, maestros y administradores con sistema de roles
- **Control de Materias**: Creación y gestión de materias del plan de estudios
- **Grupos y Periodos**: Organización de grupos por periodo escolar con asignación de maestros
- **Calificaciones**: Sistema completo de registro y consulta de calificaciones con diferentes estatus
- **Dashboard por Rol**: Interfaces personalizadas según el rol del usuario
- **Autenticación Segura**: Sistema de login con JWT y protección de rutas

## 🏗️ Arquitectura

El proyecto está dividido en dos aplicaciones principales:

```
Control-Escolar/
├── Backend/          # API REST con Node.js y Express
├── Frontend/         # Aplicación React con TypeScript
├── docker-compose.yml
└── seeds.sql         # Datos iniciales
```

### Backend (API REST)

**Tecnologías:**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcryptjs** - Hash de contraseñas
- **express-validator** - Validación de datos de entrada
- **CORS** - Control de acceso entre dominios

**Características:**
- Arquitectura RESTful organizada por capas (routes, controllers, services, models)
- Validación de datos con express-validator
- Manejo centralizado de errores
- Middleware de autenticación y autorización por roles
- Modelos de base de datos con Sequelize ORM
- Asociaciones complejas entre modelos (uno a muchos, muchos a muchos)

**Endpoints principales:**
- `/api/auth` - Autenticación y login
- `/api/admin` - Operaciones administrativas
- `/api/maestros` - Gestión de maestros
- `/api/alumnos` - Gestión de alumnos
- `/api/materias` - Gestión de materias
- `/api/usuarios` - Gestión de usuarios

### Frontend (SPA)

**Tecnologías:**
- **React 18** - Biblioteca de UI con hooks
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Build tool y dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM v6** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para peticiones a la API
- **Context API** - Manejo de estado global para autenticación

**Características:**
- Aplicación SPA (Single Page Application)
- Rutas protegidas con autenticación y autorización
- Componentes reutilizables y modulares
- Layouts específicos por rol (Admin, Maestro)
- Interceptores de Axios para manejo automático de tokens
- Tipado completo con TypeScript
- Estilos con Tailwind CSS (diseño responsivo)

**Módulos por Rol:**

**Administrador:**
- Dashboard con estadísticas generales
- CRUD de alumnos, maestros y materias
- Gestión de grupos y asignación de materias/maestros
- Gestión de periodos escolares
- Consulta de calificaciones por alumno o materia
- Asignación y edición de calificaciones

**Maestro:**
- Dashboard personal
- Vista de grupos asignados
- Gestión de calificaciones de sus materias
- Consulta de alumnos por grupo

### Base de Datos (PostgreSQL)

**Modelo de datos:**
- **usuarios** - Información básica de todos los usuarios
- **roles** - Catálogo de roles (Administrador, Maestro, Alumno)
- **usuario_roles** - Relación muchos a muchos entre usuarios y roles
- **alumnos** - Información específica de alumnos
- **maestros** - Información específica de maestros
- **materias** - Catálogo de materias
- **grupos** - Grupos escolares
- **periodos** - Periodos escolares con estatus
- **grupo_materia_maestro** - Asignación de materias y maestros a grupos
- **alumno_grupo_periodo** - Inscripción de alumnos a grupos por periodo
- **calificaciones** - Registro de calificaciones
- **estatus_calificacion** - Catálogo de estatus (Activa, Inactiva, En Revisión)
- **estatus_periodo** - Catálogo de estatus (Actual, Pasado)

## 🚀 Inicio Rápido con Docker

### Requisitos

- Docker
- Docker Compose

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Felipe-Cerv/Control-Escolar.git
cd Control-Escolar
```

2. Levantar los servicios:
```bash
docker-compose up --build
```

3. Acceder a la aplicación:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3003

### Credenciales de Prueba

El sistema carga automáticamente datos de prueba desde `seeds.sql`:

**Administrador:**
- Email: `admin1@example.com`
- Password: `12345678`

**Maestro:**
- Email: `maestro1@example.com`
- Password: `12345678`

**Alumno:**
- Email: `alumno1@example.com`
- Password: `12345678`

> Todas las contraseñas en seeds están hasheadas con bcrypt

## 💻 Desarrollo Local

### Backend

```bash
cd Backend
npm install
```

Configurar `.env`:
```env
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_NAME=control_escolar
DB_USER=postgres
DB_PASS=tu_password
JWT_SECRET=tu_secret_jwt
```

Iniciar servidor:
```bash
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
```

Configurar `.env`:
```env
VITE_API_BASE_URL=http://localhost:3003/api
```

Iniciar desarrollo:
```bash
npm run dev
```

## 📦 Servicios Docker

El `docker-compose.yml` define tres servicios:

1. **db** - PostgreSQL 15 Alpine
   - Puerto: 5432
   - Volumen persistente para datos
   - Healthcheck automático

2. **backend** - Node.js 18 Alpine
   - Puerto: 3003 (configurable desde .env)
   - Incluye PostgreSQL client para seeds
   - Espera a que la DB esté lista
   - Ejecuta Sequelize sync para crear tablas
   - Carga datos iniciales desde seeds.sql

3. **frontend** - Nginx Alpine
   - Puerto: 80
   - Build multi-etapa (Node.js → Nginx)
   - Proxy reverso para API (/api → backend:3003)
   - SPA routing con try_files

## 🔧 Variables de Entorno

### Backend (`Backend/.env`)
```env
PORT=3003
DB_HOST=db              # 'db' para Docker, 'localhost' para local
DB_PORT=5432
DB_NAME=control_escolar
DB_USER=postgres
DB_PASS=tu_password
JWT_SECRET=tu_secret_cambiar_en_produccion
```

### Frontend
**Desarrollo** (`.env`):
```env
VITE_API_BASE_URL=http://localhost:3003/api
```

**Producción** (`.env.production`):
```env
VITE_API_BASE_URL=/api  # Ruta relativa para proxy de Nginx
```

## 📚 Documentación Adicional

- [README Backend](./Backend/README.md) - Detalles del API REST
- [README Frontend](./Frontend/README.md) - Detalles de la aplicación React
- [README Docker](./README.Docker.md) - Guía completa de Docker

## 🛠️ Stack Tecnológico Completo

### Backend
- Node.js 18+
- Express.js 4
- PostgreSQL 15
- Sequelize ORM 6
- JWT Authentication
- bcryptjs
- express-validator
- CORS

### Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Axios
- Context API

### DevOps
- Docker & Docker Compose
- Nginx (production)
- PostgreSQL Alpine
- Node.js Alpine
- Multi-stage builds

## 📝 Scripts Disponibles

### Backend
```bash
npm run dev      # Desarrollo con nodemon
npm start        # Producción
npm run lint     # Linting
npm test         # Tests
```

### Frontend
```bash
npm run dev      # Desarrollo con Vite
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linting
npm test         # Tests
```

### Docker
```bash
docker-compose up --build           # Construir e iniciar
docker-compose down                 # Detener servicios
docker-compose down -v              # Detener y eliminar volúmenes
docker-compose logs -f backend      # Ver logs del backend
docker-compose restart backend      # Reiniciar servicio
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- Autenticación JWT con expiración
- Validación de datos en backend
- CORS configurado
- Variables de entorno para secretos
- Rutas protegidas por rol

## 🤝 Contribución

Este proyecto fue desarrollado como prueba técnica para desarrollador Full Stack.

## 📄 Licencia

Este proyecto es privado y fue desarrollado con fines académicos/demostrativos.

## 👤 Autor

**Felipe Cervantes**
- GitHub: [@Felipe-Cerv](https://github.com/Felipe-Cerv)

---

Desarrollado con ❤️ usando Node.js, React y PostgreSQL
