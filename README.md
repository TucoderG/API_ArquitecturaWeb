# EndPoints

 Todos
 
  - /get/{{recurso}}/all    Requiere: Nombre de la tabla, Authenticación y Rol de administrador.

 Sesion
 
  - /login/singUp/          Requiere: ID de usuario y password.
  - /login/singIn           Requiere: ID de usuario y password.

 Pacientes
 
  - /get/Paciente/          Requiere: DNI del paciente y Authenticación.
  - /post/Paciente/         Requiere: Datos del paciente, Authenticación y Rol que no sea paciente.
  - /put/Paciente           Requiere: DNI del paciente, email para actualizar, Authenticación y Rol de paciente.
  - /remove/Paciente        Requiere: DNI del paciente, Authenticación y Rol de admin.

    Historial:
        - /get/Paciente/Exel      Requiere: DNI del paciente, Authenticación y Rol de paciente.
 
 Turnos
  
  - /get/Turno/             Requiere: ID del turno y Authenticación 
  - /post/Turno/            Requiere: ID del turno y del psicólogo, DNI del paciente, fecha del dia, hora de comienzo, Authenticación y Rol de paciente.
  - /put/Turno/             Requiere: ID del turno y fecha a modificar, Authenticación y Rol de paciente.
  - /remove/Turno/          Requiere: ID del turno, Authenticación y Rol de administrador.
  - /cancelar/Turno/        Requiere: ID del turno, DNI del paciente, Authenticación y Rol de paciente.
  - /get/Turnos/Semama/     Requiere: DNI del paciente y Authenticación.
 
 
 Psicólogo
  
  - /get/psicólogo/         Requiere: ID del psicólogo, Authenticación y Rol de psicólogo.
  - /post/psicólogo/        Requiere: Datos del psicólogo, Authenticación y Rol de administrador.
  - /put/psicólogo/         Requiere: ID del psicólogo y turno o email a modificar, Authenticación y Rol de psicólogo.
  - /remove/psicólogo/      Requiere: ID del psicólogo, Authenticación y Rol de administrador.

-------------------------------------------------------------------------------------------------------------------------------------------------------

# Tecnologías

Gestor de versiones: Git 
Repositorio de código: GitHub
Editor de código: Visual Studio Code.
Lenguaje de programación: JavaScript
Entorno de compilación de código: Node.js
Framework: Express 
Plataforma API: Postman
Base de datos: Oracle
Entorno de desarrollo para base de datos: SQL Developer

# Librerías

Oracledb: Conexión a la base de datos y el entorno de desarrollo SQL Developer
Bcrypt: Encriptación de contraseñas para mayor seguridad.
Excel4node: Creación y descarga de archivo Excel.

# Middleware

Body-parser: Sirve para agregar al request un body de acuerdo al header
Express-validator: Validación de datos recibidos en el body del request.
JWT: Sesion de usuario y authenticación para restringir el acceso de algunas rutas.


# Información

La API estará construida de manera modular, es decir, mantendré separada cada parte que conforme este software en grupos como, por ejemplo, rutas, controladores, middlewares, funciones, base de datos (Oracle), variables de entorno. etc.
Para ver los datos obtenidos por las distintas rutas utilizaré Postman en un servidor local con las rutas y los métodos correspondientes para las acciones CRUD (limitadas según el rol del usuario que quiera acceder). 

# Roles

- Administrador   (Único), tendrá acceso a todas las acciones.
- Paciente        (Lo creará un psicólogo o Administrador), podrá manejar la creación, modificación o eliminación de turnos y ver su historial de citas. 
- Psicólogo       (Lo crea el usuario Administrador) podrá ver el historial de sus turnos (en general o por paciente), modificar o cancelar turnos y cambiar de horario de atención.

