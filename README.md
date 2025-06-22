# 📋 Proyecto de Gestión de Tareas con Node.js

Este proyecto es una aplicación de gestión de tareas que incluye funcionalidades avanzadas como la gestión de imágenes, autenticación de usuarios, envío de correos electrónicos y notificaciones en tiempo real mediante WebSockets. Está desarrollado utilizando **Node.js**, **Mongoose** y **MongoDB**, y cuenta con una arquitectura modular que incluye **middlewares**, **modelos**, **validaciones** y **enrutamiento**.

---

## 🌟 Funcionalidades Principales

### 1. 🖼️ Gestión de Imágenes
- Subir, mostrar y eliminar imágenes utilizando **Multer**.
- Las imágenes se almacenan en un directorio local.
- Gestión protegida por autenticación.

### 2. 🔒 Autenticación y Autorización
- Sistema de **login y registro** utilizando **bcrypt** para el hash de contraseñas.
- Autenticación de usuarios mediante **JWT (JSON Web Tokens)**.
- **Roles de usuario**:
  - Los usuarios con rol de **admin** tienen permisos para **crear, actualizar y eliminar tareas SUS PROPIAS TAREAS**.
  - Los usuarios **no admin** solo pueden visualizar todas las tareas disponibles.

### 3. 📧 Envío de Correos Electrónicos
- Integración con **NodeMailer** para el envío automático de correos electrónicos al registrarse un usuario.
- Los correos incluyen un mensaje de verificación para confirmar la creación de la cuenta.

### 4. 🔔 Notificaciones en Tiempo Real
- Implementación de **WebSocket** para enviar mensajes en tiempo real a todos los usuarios cuando se realiza una actualización en las tareas (crear, actualizar o eliminar).
- Sincronización en tiempo real para mantener a los usuarios actualizados.

### 5. ✅ Gestión de Tareas
- Los usuarios pueden gestionar tareas con las siguientes características:
  - **Crear, editar y eliminar tareas** (solo para administradores).
  - **Visualizar tareas**:
    - Los usuarios **no admin** pueden ver **todas las tareas**.
    - Los usuarios **admin** solo pueden ver y gestionar **sus propias tareas**.
- Las tareas incluyen campos como:
  - Título
  - Descripción
  - Estado
  - Fecha



---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**:
   ```En la consola
   git clone https://github.com/Juanmadator/taskPlanerPro
   cd nombre-repositorio-clonado

2. ## Instalar dependencias
## **npm install**

3. ## Crear un .ENV en la raíz si no existe con estos datos:

- **EMAIL_USER=evolvejuanmadator@gmail.com**
- **EMAIL_PASS=qpcz sktd gnjp cgkp**
- **JWT_SECRET= sdkakdakjdkakdjakdj99923**

4. ## Arrancar el servidor
- **node server.js / npm start**

---

## 🚀 Iniciar el Frontend

1. **Abrir con Live Server**:
   - Para iniciar el frontend, abre el archivo `index.html` utilizando **Live Server**.
   - Esto asegurará que la aplicación funcione correctamente con las rutas relativas y las peticiones al backend.

2. **Modo incógnito recomendado**:
   - Se recomienda abrir el navegador en **modo incógnito** para facilitar el cierre de sesión rápido en caso de querer salir o iniciar sesión varias veces.

---

## 🛠️ Uso de la Aplicación

### 1. **Inicio de Sesión y Registro**
- Al abrir la aplicación, serás redirigido automáticamente al formulario de **login**.
- Si no tienes una cuenta, deberás registrarte primero.
- Una vez registrado, inicia sesión con tus credenciales.

### 2. **Roles de Usuario**
- **Usuarios Administradores**:
  - Pueden **crear, editar, eliminar y visualizar sus propias tareas**.
  - Pueden **crear, visualizar y eliminar eventos**.
  - Pueden **insertar, visualizar y eliminar imágenes**.
- **Usuarios No Administradores**:
  - Solo pueden visualizar las tareas, eventos disponibles e imágenes
  ## Los usuarios "normales" pueden ver todas las tareas, eventos e imágenes (ya que no pueden crear/eliminar/editar les permito verlas todas, sin embargo los admins solo ven las sus tareas (aunque los eventos de todos) )

---

## 🔒 Seguridad con JWT

- Las rutas para **crear, eliminar y actualizar** están protegidas con **JWT (JSON Web Tokens)**.
- Un token solo se genera cuando un usuario administrador inicia sesión.
- Este token se utiliza para autenticar las peticiones protegidas al backend.

---

## 📅 Gestión de Eventos

### Crear un Evento:
- Haz clic en el día del mes en el calendario donde deseas crear el evento.
- Completa los datos solicitados en los cuadros de diálogo.
- Los eventos se cargarán automáticamente en el calendario una vez creados.

### Eliminar un Evento:
- Haz clic en el evento directamente en el calendario.
- Confirma la eliminación en el cuadro de diálogo.

---

## 🌐 WebSocket en Tiempo Real

- Se recomienda iniciar sesión en **2 navegadores diferentes** al mismo tiempo para observar los mensajes en tiempo real.
- Los mensajes de WebSocket se envían al **crear, actualizar o eliminar tareas y eventos**.
- Esto permite que los usuarios conectados estén sincronizados con los cambios realizados en la aplicación.

---

## 💡 Recomendaciones

- Usa **modo incógnito** para facilitar el cierre de sesión rápido.
- Inicia sesión en **2 navegadores diferentes** para aprovechar las notificaciones en tiempo real mediante WebSocket.
- Asegúrate de que el backend esté corriendo correctamente para que las funcionalidades del frontend funcionen sin problemas.

---

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **Express.js**: Framework para la creación de rutas y middlewares.
- **MongoDB**: Base de datos NoSQL para almacenar usuarios, tareas e imágenes.
- **Mongoose**: ODM para modelar los datos en MongoDB.
- **Multer**: Middleware para la gestión de archivos (imágenes).
- **bcrypt**: Para el hash de contraseñas.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios.
- **NodeMailer**: Para el envío de correos electrónicos.
- **WebSocket**: Para la comunicación en tiempo real.
- **HTML, CSS y JavaScript**: Para el frontend.