# EndPoints

 Todos
 
  - /get/:recurso/all       Requiere: Nombre de la tabla.


 Pacientes
 
  - /Paciente/:dni                  Parametro: DNI del paciente
  - /Paciente/                      Query String: DNI, name, email
  - /Paciente/:dni                  Parametro: DNI | Query String: email
  - /Paciente/:dni                  Parametro: DNI del paciente

 Patologias

  - /Patologia/:id_patologia        Parametro: id_patologia
  - /Patologia/                     Query String: id_patologia, descripcion de la patologia
  - /Patologia/:id_patologia        Parametro: id_patologia | QueryString: descripcion de la patologia
  - /Patologia/:id_patologia        Parametro: id_patologia
 
 Patologias Del Paciente

 - /Paciente/:dni/Patologia/         Parametro: DNI del paciente
 - /Paciente/:dni/Patologia/         Parametro: DNI del paciente | Query String: descripcion de la patologia
 - /Paciente/:dni/Patologia/         Parametro: DNI del paciente
    
 Psicólogo
  
  - /Psicólogo/:id_psicologo         Requiere: ID del psicólogo, Authenticación y Rol de psicólogo.
  - /Psicólogo/                      Requiere: Datos del psicólogo, Authenticación y Rol de administrador.
  - /Psicólogo/:id_psicologo         Requiere: ID del psicólogo y turno o email a modificar, Authenticación y Rol de psicólogo.
  - /Psicólogo/:id_psicologo         Requiere: ID del psicólogo, Authenticación y Rol de administrador.

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

