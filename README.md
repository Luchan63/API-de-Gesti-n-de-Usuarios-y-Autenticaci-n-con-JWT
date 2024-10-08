<table align= "center">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/22992f16-b5c2-4bba-ac99-ccd164e3489b" alt="JavaScript + React + Vite" width="90" /></td>
    <td><img src="https://github.com/user-attachments/assets/23888328-f831-4250-ac0b-b3e0db55a89c" alt="Java" width="50" /></td>
    <td><img src="https://github.com/user-attachments/assets/c6b75730-c3cf-41a1-82fb-d40e17bfd097" alt="Spring Boot" width="50" /></td>
    <td><img src="https://github.com/user-attachments/assets/f3c6c52e-9c3d-419f-b0a0-9c34d01c3728" alt="MySQL" width="50" /></td>
    <td><img src="https://github.com/user-attachments/assets/114f2c7f-7cda-4494-ad3e-2a03fbdadab4" alt="JWT" width="80" /></td>
  </tr>
</table>

# API de Gestión de Usuarios y Autenticación con JWT

Este proyecto es una aplicación completa de gestión de usuarios con roles y autenticación, que incluye un frontend desarrollado con React y Vite, y un backend utilizando Spring Boot, Java y MySQL. La autenticación se realiza mediante JWT (JSON Web Tokens) para garantizar la seguridad.

## Tecnologías Utilizadas

### Frontend:
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para React.
- **javaScript**: Lenguaje de programación para la logica del frontend.
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

