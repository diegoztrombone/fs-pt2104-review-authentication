## Antes de empezar

1. Inicializar un proyecto con `npm`
2. Instalar las dependencias de:
  - `express`
  - `slonik`
  - `jsonwebtoken`
  - `cookie-parser`
  - `dotenv` (desarrollo)
  - `nodemailer`
  - `cloudinary`
  - `nodemon` (desarrollo)
3. Escribir los dos scripts típicos en el fichero `package.json`
4. Tener a punto el fichero de docker `docker-compose.yml` con la configuración de siempre
5. Escribir el script `.sql` para la creación de la tabla `users`. Esta tabla tendrá las siguientes columnas:
  - id (única, pk, not null)
  - username (única, not null)
  - email (única, not null)
  - hash (not null)
  - birthdate (not null)
  - active (not null, false por defecto)
  - confirmation_token (null por defecto)
  - profile_pic (null por defecto)
  - bio (string vacío por defecto)
  - deleted (false por defecto)
  - created_at (timestamp, actual sin zona horaria por defecto)
  - updated_at (timestamp, actual sin zona horaria por defecto)
6. Levanta base de datos y adminer con `docker-compose up`
7. Importa tu script `sql` en adminer
8. Crea el fichero `.env` en el mismo directorio que el fichero `package.json` (es decir, en la raíz del proyecto)
9. Crea el fichero `.gitignore` y añade `node_modules` y el fichero de variables de entorno
10. Respira hondo

## Ejercicio

Vamos a crear todo el flujo de autenticación y añadiremos la autorización a algunas rutas específicas del usuario

### Autenticación

1. Registro (POST)
  - Para el registro hará falta `email`, `username` y `password`
  - Si alguno de los campos faltan, no se debe permitir el registro (crea un middleware para ello)
  - Si el `email` o `username` están en uso, no se debe permitir el registro
  - Si todo ha ido bien, se devuelve una respuesta satisfactoria y se enviará un email de confirmacióin al usuario (recuerda que tienes que generar un token de confirmación, tanto para el correo como para la base de datos)
  - Cuando el usuario acceda a su correo y haga click sobre el enlace, si todo ha ido bien, se cambiará el campo de la columna `active` a `true` y se eliminará el token de confirmación de la base de datos de ese usuario
  - Tras el paso anterior, se volverá a enviar otro correo al usuario, con sus datos más básicos (email y username) en el contenido con algún mensaje confirmatorio de que ya puede acceder a la plataforma

2. Acceso (POST)
  - Para hacer login se necesitará `email` o `username` indistintamente y `password`
  - Si alguno de los campos faltan, no se debe permitir el acceso
  - Si el usuario no existe, no se debe permitir el acceso
  - Si todo ha ido bien, se devolverá algún dato básico del usuario (email, username) y se creará en la respuesta del back una cookie que contendrá un jwt con la información del usuario `email`, `username` y el valor del campo `active`

3. Salida (POST)
  - Para hacer logout se necesitará enviar la cookie para poder eliminarla

### Autorización

4. Ver la información de mi perfil (GET)
  - Para acceder a la información del perfil de usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Si el usuario no existe o hay algún problema obteniendo la información, se devolverá un error genérico al usuario
  - Si todo ha ido bien, se devolverá: `email`, `username`, `age`, `profile_pic`, `bio`

5. Actualizar mi perfil (PUT)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Crea una transacción para hacer todo este proceso y constará de los siguientes pasos:
    1. Traer la información del usuario para tener su id
    2. Actualizar la información que dependa solo de la base de datos (acuérdate de la columna `updated_at`)
    3. Subir la imagen (si existiera)
    4. Actualizar el campo de la foto si se llegó a subir (acuérdate de la columna `updated_at`)
    5. Devolver los mismo campos que en el punto 4, pero actualizados
    6. Si

6. Desactivar la cuenta del usuario (PATCH)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Cambia el campo `deleted` a `true`
  - Modifica también la lógica para que ninguno de los endpoints anteriormente creados pueda hacer nada como mostrar o actualizar información si el campo `deleted` del usuario es `true` (tampoco devolverás ninguna cookie) 

7. Activar la cuenta del usuario (PATCH)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Cambia el campo `deleted` a `false`
  - Todos los recursos que antes no tenían acción ninguna por estar este campo a `false` vuelven a funcionar para el usuario dado

8. Borra permanentemente la cuenta del usuario (DELETE)
  - Para poder eliminar al usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá hacer dicha acción
  - Solo se podrá eliminar la cuenta definitivamente si antes se ha desactivado la cuenta, si no, se
devolverá un error al usuario
  - Si todo es correcto se eliminará la fila completa del usuario devolviendo un mensaje satisfactorio y no se podrá acceder más a esa cuenta
