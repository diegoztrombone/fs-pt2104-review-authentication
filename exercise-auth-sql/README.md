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
  - `multer`
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
  - (OK) Para el registro hará falta `email`, `username` y `password` 
  - (OK) Si alguno de los campos faltan, no se debe permitir el registro (crea un middleware para ello)
  - (OK) Si el `email` o `username` están en uso, no se debe permitir el registro
  - (OK) Si todo ha ido bien, se devuelve una respuesta satisfactoria y se enviará un email de confirmacióin al usuario (recuerda que tienes que generar un token de confirmación, tanto para el correo como para la base de datos)
  - (OK) Cuando el usuario acceda a su correo y haga click sobre el enlace, si todo ha ido bien, se cambiará el campo de la columna `active` a `true` y se eliminará el token de confirmación de la base de datos de ese usuario
  - (OK) Tras el paso anterior, se volverá a enviar otro correo al usuario, con sus datos más básicos (email y username) en el contenido con algún mensaje confirmatorio de que ya puede acceder a la plataforma

2. Acceso (POST)
  - (OK) Para hacer login se necesitará `email` o `username` indistintamente y `password`
  - (OK) Si alguno de los campos faltan, no se debe permitir el acceso
  - (OK) Si el usuario no existe, no se debe permitir el acceso
  - (OK) Si todo ha ido bien, se devolverá algún dato básico del usuario (email, username) y se creará en la respuesta del back una cookie que contendrá un jwt con la información del usuario `email`, `username` y el valor del campo `active`

3. Salida (POST)
  - (OK) Para hacer logout se necesitará enviar la cookie para poder eliminarla

4. (OK) Contraseña olvidada (POST)
  - No hará falta tener una cookie con jwt válido para esto
  - Para poder pedir una nueva contraseña por olvido de la anterior, necesitaremos que el usuario nos envíe el `email` o su `username`
  - Recibido el `email` o `username` y comprobado que existe, se le enviará un mail con una url y un token. Esta url no será igual que la de confirmación; esta url deberá lleva el token y el mail del usuario como query params.
    Ej: `http://localhost:3000/auth/password/request?token=123123&email=user@gmail.com`
  - La siguiente petición NO deberá ser un GET, con lo que no valdrá clickar en el enlace y ya (al menos no aún, cuando tengamos el front sí podremos hacerlo). La petición a través del endpoint enviado en el mail será un POST con la nueva contraseña
  - El back, el recurso al que vaya la url creada antes, deberá recibir la nueva contraseña en el `body` de la petición y el `email` y el `token` en `query`
  - Tras comprobar que el `token` y el `email` coinciden, guarda la nueva contraseña cifrándola antes

### Autorización

5. (OK) Ver la información de mi perfil (GET)
  - Para acceder a la información del perfil de usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Si el usuario no existe o hay algún problema obteniendo la información, se devolverá un error genérico al usuario
  - Si todo ha ido bien, se devolverá: `email`, `username`, `age`, `profile_pic`, `bio`

6. Actualizar mi perfil (PUT)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Crea una transacción para hacer todo este proceso y constará de los siguientes pasos:
    1. Traer la información del usuario para tener su id
    2. Actualizar la información que dependa solo de la base de datos (acuérdate de la columna `updated_at`)
    3. Subir la imagen (si existiera)
    4. Actualizar el campo de la foto si se llegó a subir (acuérdate de la columna `updated_at`)
    5. Devolver los mismo campos que en el punto 4, pero actualizados
    6. Recuerda que el usuario no siempre querrá cambiar la foto de perfil, con lo que es posible que tengas que idear algún middleware para controlar que haya más información que solo la foto, por si ésta no está en el `formData` y `multer` ignora el resto de el contenido

7. (OK) Actualizar contraseña (PATCH)
  - Sí, sé lo que estás pensando, ¿acaso no entraría dentro de actualizar el perfil? Sí y no, aunque forme parte del pefil, suele tratarse aparte.
  - Para poder actualizar la contraseña, hará falta tener la cookie con el token
  - El usuario deberá enviar su contraseña actual y la nueva contraseña para poder hacer el cambio
  - Antes de cambiar la vieja por la nueva, comprueba que a nueva coincide
  - No te olvides de cifrar la nueva antes de guardarla!

8. (OK)Desactivar la cuenta del usuario (PATCH)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Cambia el campo `deleted` a `true`
  - Modifica también la lógica para que ninguno de los endpoints anteriormente creados pueda hacer nada como mostrar o actualizar información si el campo `deleted` del usuario es `true` (tampoco devolverás ninguna cookie) 

9.(OK) Activar la cuenta del usuario (PATCH)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Cambia el campo `deleted` a `false`
  - Todos los recursos que antes no tenían acción ninguna por estar este campo a `false` vuelven a funcionar para el usuario dado

10. Borra permanentemente la cuenta del usuario (DELETE)
  - Para poder eliminar al usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá hacer dicha acción
  - Solo se podrá eliminar la cuenta definitivamente si antes se ha desactivado la cuenta, si no, se
devolverá un error al usuario
  - Si todo es correcto se eliminará la fila completa del usuario devolviendo un mensaje satisfactorio y no se podrá acceder más a esa cuenta
