
# API de Gestión de Usuarios y Autenticación con JWT

Este proyecto es una aplicación completa de gestión de usuarios con roles y autenticación, que incluye un frontend desarrollado con React y Vite, y un backend utilizando Spring Boot, Java y MySQL. La autenticación se realiza mediante JWT (JSON Web Tokens) para garantizar la seguridad.

## Tecnologías Utilizadas

### Frontend:
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para React.
- **HTML5**: Lenguaje de marcado para estructurar el contenido web.
- **Bootstrap**: Framework de CSS para el diseño responsivo y componentes UI.

### Backend:
- **Java**: Lenguaje de programación para la lógica del backend.
- **Spring Boot**: Framework de Java para crear aplicaciones robustas y escalables.
- **MySQL**: Base de datos relacional utilizada para almacenar usuarios y roles.
- **JWT**: JSON Web Tokens para la autenticación segura.

## Funcionalidades

- **Gestión de Usuarios**: Registro, edición, eliminación y consulta de usuarios.
- **Roles de Usuario**: Definición y asignación de roles para usuarios.
- **Autenticación JWT**: Autenticación basada en tokens para proteger rutas y recursos.
- **Frontend React**: Interfaz de usuario moderna para gestionar las acciones.

## Requisitos Previos

- Node.js y npm (para ejecutar el frontend).
- JDK 17 o superior (para el backend Java).
- MySQL instalado y configurado.
- Maven (para construir y ejecutar el proyecto Spring Boot).

## Instrucciones para Ejecutar

### Backend (Spring Boot y MySQL)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/API-de-Gestion-de-Usuarios-JWT.git
   cd backend
   ```

2. Configura la base de datos en el archivo `application.properties` con tus credenciales de MySQL:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/nombre_base_datos
   spring.datasource.username=usuario
   spring.datasource.password=contraseña
   ```

3. Ejecuta el backend:
   ```bash
   mvn spring-boot:run
   ```

### Frontend (React con Vite)

1. Dirígete a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Ejecuta el frontend:
   ```bash
   npm run dev
   ```

## Autor

**Luis Anibal Figuereo Ali**  
Desarrollador Web Junior especializado en Java, React y Spring Boot.

