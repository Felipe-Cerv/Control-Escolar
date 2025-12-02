# Backend - Sistema de Control Escolar

API REST para la gestión de calificaciones, alumnos, maestros y administración escolar. Desarrollada con Node.js, Express y PostgreSQL.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Arquitectura](#-arquitectura)
- [Endpoints](#-endpoints)
  - [Autenticación](#autenticación)
  - [Usuarios](#usuarios)
  - [Alumnos](#alumnos)
  - [Maestros](#maestros)
  - [Materias](#materias)
  - [Administración](#administración)
- [Modelos de Datos](#-modelos-de-datos)
- [Middleware](#-middleware)
- [Manejo de Errores](#-manejo-de-errores)
- [Scripts Disponibles](#-scripts-disponibles)

---

## 🚀 Tecnologías

### Dependencias Principales

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | LTS (≥18.x) | Runtime de JavaScript |
| **Express** | ^4.18.2 | Framework web |
| **Sequelize** | ^6.37.0 | ORM para PostgreSQL |
| **PostgreSQL** | ^8.11.0 | Base de datos relacional |
| **JWT** | ^9.0.2 | Autenticación con tokens |
| **bcryptjs** | ^2.4.3 | Encriptación de contraseñas |
| **express-validator** | ^7.3.1 | Validación de datos |
| **helmet** | ^7.0.0 | Seguridad HTTP headers |
| **cors** | ^2.8.5 | Manejo de CORS |
| **dotenv** | ^16.4.0 | Variables de entorno |
| **morgan** | ^1.10.0 | Logger HTTP |

### Dependencias de Desarrollo

- **nodemon** ^3.0.2 - Recarga automática en desarrollo
- **eslint** ^8.57.0 - Linter de código
- **prettier** ^3.2.5 - Formateo de código
- **jest** ^29.7.0 - Testing framework
- **supertest** ^7.0.0 - Testing de endpoints

---

## 📦 Requisitos Previos

- **Node.js** versión 18.x o superior
- **PostgreSQL** 13 o superior
- **npm** o **pnpm** (gestor de paquetes)
- Servidor PostgreSQL corriendo localmente o en la nube

---

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Felipe-Cerv/Control-Escolar.git
cd Control-Escolar/Backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto backend:

```env
# Ver sección "Variables de Entorno" más abajo
```

### 4. Ejecutar migraciones y seeders

```bash
# Las tablas se sincronizan automáticamente con Sequelize
# Al ejecutar npm run dev, las tablas se crean/actualizan
```

### 5. Iniciar el servidor

**Modo desarrollo (con hot-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`).

---

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
# Servidor
PORT=3000

# Modo de ejecución
MODE=dev
# MODE=prod

# Base de datos - Producción
DB_HOST=localhost
DB_PORT=5432
DB_NAME=control_escolar
DB_USER=postgres
DB_PASS=tu_contraseña

# Base de datos - Desarrollo/Testing
DB_HOST_TEST=localhost

# JWT
JWT_SECRET=tu_secreto_jwt_muy_seguro_aqui
# Si no se proporciona, se genera uno aleatorio (no recomendado en producción)
```

### Notas importantes:
- **JWT_SECRET**: Debe ser una cadena larga y segura en producción
- **MODE**: Si está en `dev`, usa `DB_HOST_TEST`, de lo contrario usa `DB_HOST`
- **DB_PASS**: Asegúrate de usar una contraseña segura para PostgreSQL

---

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas (MVC)** con la siguiente estructura:

```
Backend/
├── src/
│   ├── config/          # Configuraciones (DB, env, Sequelize)
│   ├── controllers/     # Controladores (lógica HTTP)
│   ├── errors/          # Clases de errores personalizados
│   ├── middleware/      # Middlewares (auth, validación, errores)
│   ├── models/          # Modelos Sequelize
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades (enums, helpers)
│   ├── validators/      # Validaciones personalizadas
│   ├── app.js           # Configuración de Express
│   └── index.js         # Punto de entrada
├── .env                 # Variables de entorno (no versionado)
├── package.json
└── README.md
```

### Capas principales:

1. **Routes**: Define endpoints y aplica middlewares de validación
2. **Controllers**: Maneja peticiones HTTP y respuestas
3. **Services**: Contiene la lógica de negocio
4. **Models**: Define entidades y relaciones de la base de datos
5. **Middleware**: Autenticación, autorización, validación y manejo de errores

---

## 📍 Endpoints

Todos los endpoints están bajo el prefijo `/api`.

### Autenticación

#### `POST /api/auth/login`
Inicia sesión y retorna un token JWT.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Validaciones:**
- `email`: Debe ser un correo válido
- `password`: Mínimo 8 caracteres

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "usuario_id": 1,
    "nombre": "Juan Pérez",
    "email": "usuario@ejemplo.com",
    "fecha_nacimiento": "1990-01-01T00:00:00.000Z"
  }
}
```

---

### Usuarios

> **Nota:** Todos los endpoints de usuarios requieren autenticación con token JWT y rol de **ADMINISTRADOR** (excepto el login).

#### `POST /api/usuarios`
Crea un nuevo usuario en el sistema.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Body:**
```json
{
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "password": "contraseña123",
  "fecha_nacimiento": "1995-05-15",
  "rol_id": 2
}
```

**Validaciones:**
- `nombre`: Obligatorio, string
- `email`: Debe ser un correo válido
- `password`: Mínimo 8 caracteres
- `fecha_nacimiento`: Formato ISO8601 (YYYY-MM-DD)
- `rol_id`: ID de rol válido (1: ADMINISTRADOR, 2: MAESTRO, 3: ALUMNO)

**Respuesta exitosa (201):**
```json
{
  "ok": true,
  "user": {
    "usuario_id": 5,
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "fecha_nacimiento": "1995-05-15T00:00:00.000Z"
  }
}
```

---

#### `PATCH /api/usuarios/rolUsuario`
Modifica el rol de un usuario existente.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Body:**
```json
{
  "usuario_id": 5,
  "rol_id": 3
}
```

**Validaciones:**
- `usuario_id`: ID de usuario válido (entero)
- `rol_id`: ID de rol válido (1, 2 o 3)

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "Rol actualizado correctamente"
}
```

---

### Alumnos

#### `POST /api/alumnos`
Registra un nuevo alumno en el sistema.

**Body:**
```json
{
  "nombre": "Pedro López",
  "email": "pedro@ejemplo.com",
  "password": "contraseña123",
  "fecha_nacimiento": "2005-08-20"
}
```

**Validaciones:**
- `nombre`: Obligatorio, string
- `email`: Debe ser un correo válido
- `password`: Mínimo 8 caracteres
- `fecha_nacimiento`: Formato ISO8601

**Respuesta exitosa (201):**
```json
{
  "ok": true,
  "user": {
    "usuario_id": 10,
    "nombre": "Pedro López",
    "email": "pedro@ejemplo.com",
    "fecha_nacimiento": "2005-08-20T00:00:00.000Z"
  }
}
```

---

#### `GET /api/alumnos?matricula=A0001`
Obtiene los datos de un alumno por su matrícula, incluyendo su grupo y calificaciones.

**Query Params:**
- `matricula`: Matrícula del alumno (obligatorio, string)

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": {
    "alumno_id": 1,
    "matricula": "A0001",
    "nombre": "Alumno 1",
    "fecha_nacimiento": "2005-01-15T00:00:00.000Z",
    "grupo": "5-3",
    "calificaciones": [
      {
        "materia": "Matemáticas",
        "nota": 7.6
      },
      {
        "materia": "Español",
        "nota": 8.5
      }
    ]
  }
}
```

---

### Maestros

> **Nota:** Todos los endpoints de maestros requieren autenticación con token JWT y rol de **MAESTRO**.

#### `GET /api/maestros/reporte`
Obtiene el reporte de calificaciones de todos los alumnos del maestro autenticado.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "matricula": "A0001",
      "alumno": "Alumno 1",
      "materia": "Matemáticas",
      "grupo": "5-3",
      "nota": 7.6,
      "observaciones": "Buen desempeño"
    },
    {
      "matricula": "A0002",
      "alumno": "Alumno 2",
      "materia": "Matemáticas",
      "grupo": "5-0",
      "nota": 4.4,
      "observaciones": ""
    }
  ]
}
```

---

#### `GET /api/maestros/grupos?maestro_id=1`
Obtiene los grupos asignados a un maestro.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Query Params:**
- `maestro_id`: ID del maestro (obligatorio, entero)

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "grupo_id": 1,
      "descripcion": "5-3",
      "periodo": "2024-2025"
    }
  ]
}
```

---

#### `GET /api/maestros/materias?maestro_id=1`
Obtiene las materias que imparte un maestro.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Query Params:**
- `maestro_id`: ID del maestro (obligatorio, entero)

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "materia_id": 1,
      "codigo": "MAT01",
      "nombre": "Matemáticas",
      "descripcion": "Álgebra y geometría"
    }
  ]
}
```

---

#### `PATCH /api/maestros/calificacion`
Actualiza la calificación de un alumno.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Body:**
```json
{
  "calificacion_id": 123,
  "nueva_nota": 8.5
}
```

**Validaciones:**
- `calificacion_id`: ID de calificación válido (entero)
- `nueva_nota`: Número entre 0 y 10 con hasta 2 decimales

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "Calificación actualizada correctamente"
}
```

---

### Materias

> **Nota:** Todos los endpoints de materias requieren autenticación con token JWT y rol de **ADMINISTRADOR**.

#### `GET /api/materias`
Obtiene el catálogo completo de materias.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "materia_id": 1,
      "codigo": "MAT01",
      "nombre": "Matemáticas",
      "descripcion": "Álgebra y geometría"
    },
    {
      "materia_id": 2,
      "codigo": "ESP01",
      "nombre": "Español",
      "descripcion": "Lengua y literatura"
    }
  ]
}
```

---

### Administración

> **Nota:** Todos los endpoints de administración requieren autenticación con token JWT y rol de **ADMINISTRADOR**.

#### `GET /api/admin/promediosPorMateria?materias=1,2,3`
Obtiene los promedios generales por materia con el número de alumnos.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Query Params:**
- `materias`: IDs de materias separados por comas (opcional). Si no se proporciona, retorna todas las materias.

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "codigo": "MAT01",
      "nombre": "Matemáticas",
      "total_alumnos": 20,
      "promedio": 6.85
    },
    {
      "codigo": "ESP01",
      "nombre": "Español",
      "total_alumnos": 20,
      "promedio": 7.23
    }
  ]
}
```

---

#### `GET /api/admin/promediosGenerales?periodo_id=1`
Obtiene los promedios generales de todos los alumnos.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Query Params:**
- `periodo_id`: ID del periodo escolar (obligatorio, entero)

**Validaciones:**
- `periodo_id`: Debe ser un entero válido

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "matricula": "A0001",
      "nombre": "Alumno 1",
      "promedio": 7.45
    },
    {
      "matricula": "A0002",
      "nombre": "Alumno 2",
      "promedio": 6.82
    }
  ]
}
```

---

#### `GET /api/admin/calificaciones?alumno_id=1&periodo_id=1`
Obtiene las calificaciones detalladas de un alumno específico.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Query Params:**
- `alumno_id`: ID del alumno (obligatorio, entero)
- `periodo_id`: ID del periodo escolar (obligatorio, entero)

**Validaciones:**
- `alumno_id`: Debe ser un entero válido
- `periodo_id`: Debe ser un entero válido

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "codigo": "MAT01",
      "materia": "Matemáticas",
      "nota": 7.6,
      "maestro": "Maestro 1"
    },
    {
      "codigo": "ESP01",
      "materia": "Español",
      "nota": 8.5,
      "maestro": "Maestro 2"
    }
  ]
}
```

---

#### `DELETE /api/admin/calificaciones/:calificacion_id`
Inactiva una calificación (soft delete) cambiando su estatus a 2.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Params:**
- `calificacion_id`: ID de la calificación (obligatorio, entero)

**Validaciones:**
- `calificacion_id`: Debe ser un entero válido en la URL

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": {
    "calificacion_id": 123,
    "estatus_calificacion_id": 2
  }
}
```

**Errores:**
- `404 Not Found`: Si no existe la calificación con ese ID

---

## 🗃️ Modelos de Datos

### Principales entidades:

| Modelo | Descripción |
|--------|-------------|
| **Usuario** | Datos generales de usuarios del sistema |
| **Rol** | Roles del sistema (Admin, Maestro, Alumno) |
| **UsuarioRol** | Relación many-to-many entre Usuario y Rol |
| **Alumno** | Información específica de estudiantes |
| **Maestro** | Información específica de maestros |
| **Materia** | Catálogo de asignaturas |
| **Grupo** | Grupos escolares |
| **Periodo** | Periodos escolares (ciclos) |
| **Calificacion** | Notas de alumnos en materias |
| **GrupoMateriaMaestro** | Asignación de materias a maestros por grupo |
| **AlumnoGrupoPeriodo** | Inscripción de alumnos en grupos por periodo |
| **EstatusCalificacion** | Estados de las calificaciones (1: Activa, 2: Inactiva) |
| **EstatusPeriodo** | Estados de los periodos (1: Actual, 2: Futuro, 3: Pasado) |

### Relaciones principales:

- Un **Usuario** puede tener múltiples **Roles**
- Un **Usuario** puede ser un **Alumno** o un **Maestro**
- Un **Maestro** imparte varias **Materias** en distintos **Grupos**
- Un **Alumno** pertenece a un **Grupo** en un **Periodo** específico
- Una **Calificacion** vincula un **Alumno**, una **Materia** y un **Maestro**

---

## 🔒 Middleware

### Authentication (`auth.js`)
Valida el token JWT en el header `Authorization: Bearer <token>`.

**Uso:**
```javascript
import auth from './middleware/auth.js';
router.get('/protected', auth, controller);
```

### Authorization (`authorize.js`)
Verifica que el usuario tenga el rol requerido.

**Uso:**
```javascript
import { requireRole } from './middleware/authorize.js';
import Roles from './utils/enums.js';

router.get('/admin-only', auth, requireRole(Roles.ADMINISTRADOR), controller);
```

### Validation (`validateRequest.js`)
Procesa las validaciones de `express-validator` y retorna errores estructurados.

**Uso:**
```javascript
import { body } from 'express-validator';
import validateRequest from './middleware/validateRequest.js';

router.post('/endpoint', [
  body('email').isEmail(),
  validateRequest
], controller);
```

### Error Handler (`errorHandler.js`)
Middleware global que captura todos los errores y retorna respuestas JSON estructuradas.

---

## ⚠️ Manejo de Errores

El sistema utiliza clases de error personalizadas que heredan de `AppError`:

| Clase | Código HTTP | Uso |
|-------|-------------|-----|
| **BadRequestError** | 400 | Datos de entrada inválidos |
| **UnauthorizedError** | 401 | Token inválido o ausente |
| **ForbiddenError** | 403 | Sin permisos para el recurso |
| **NotFoundError** | 404 | Recurso no encontrado |
| **ConflictError** | 409 | Conflicto (ej: email duplicado) |

### Formato de respuesta de error:

```json
{
  "ok": false,
  "error": "Mensaje descriptivo del error",
  "code": "ERROR_CODE",
  "details": {
    "field": "campo_con_error",
    "message": "Detalle específico"
  }
}
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Producción
npm start

# Linting
npm run lint

# Tests (requiere configuración)
npm test
```

---

## 🔧 Configuración Adicional

### Base de datos

Las tablas se crean/actualizan automáticamente usando `sequelize.sync({ alter: true })` al iniciar el servidor.

**Para producción**, se recomienda:
1. Deshabilitar `alter: true`
2. Usar migraciones de Sequelize CLI
3. Ejecutar seeders para datos iniciales

### CORS

El servidor acepta peticiones de cualquier origen por defecto. Para restringir orígenes en producción, modifica `src/app.js`:

```javascript
app.use(cors({
  origin: 'https://tu-frontend.com'
}));
```

### Seguridad

- **JWT_SECRET**: Usa una clave segura en producción (mínimo 32 caracteres aleatorios)
- **Helmet**: Ya configurado para headers de seguridad
- **Validación**: Todos los endpoints críticos tienen validación de entrada
- **Autenticación**: Token JWT con expiración de 30 minutos

---

## 📚 Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [express-validator](https://express-validator.github.io/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 👥 Roles del Sistema

| ID | Nombre | Descripción |
|----|--------|-------------|
| 1 | **ADMINISTRADOR** | Acceso completo al sistema, gestión de usuarios y reportes |
| 2 | **MAESTRO** | Gestión de calificaciones de sus materias asignadas |
| 3 | **ALUMNO** | Consulta de calificaciones propias |

---

## 🐛 Troubleshooting

### Error: "port is already in use"
Cambia el puerto en `.env` o mata el proceso:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Error: "Unable to connect to database"
Verifica:
1. PostgreSQL está corriendo
2. Credenciales en `.env` son correctas
3. La base de datos existe: `CREATE DATABASE control_escolar;`

### Error: "JWT_SECRET is required"
Define `JWT_SECRET` en tu archivo `.env`.

---

## 📄 Licencia

Este proyecto es parte de una prueba técnica para desarrolladores Full Stack.

---

## 👨‍💻 Autor

**Felipe Cervantes**
- GitHub: [@Felipe-Cerv](https://github.com/Felipe-Cerv)
- Repositorio: [Control-Escolar](https://github.com/Felipe-Cerv/Control-Escolar)

---

**¿Dudas o sugerencias?** Abre un issue en el repositorio o contacta al equipo de desarrollo.
