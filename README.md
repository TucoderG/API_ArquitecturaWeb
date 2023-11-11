# EndPoints

 Pacientes
 
  - GET /Paciente/:dni                  Parametro: DNI del paciente
  - POST /Paciente/                     Query String: DNI, name, email
  - PUT /Paciente/:dni                  Parametro: DNI | Query String: email
  - DEL /Paciente/:dni                  Parametro: DNI del paciente | Authenticacion JWT

 Patologias

  - GET /Patologia/:id_patologia        Parametro: id_patologia
  - POST /Patologia/                    Query String: id_patologia, descripcion de la patologia
  - PUT /Patologia/:id_patologia        Parametro: id_patologia | QueryString: descripcion de la patologia
  - DEL /Patologia/:id_patologia        Parametro: id_patologia
 
 Patologias Del Paciente

 - GET /Paciente/:dni/Patologia/         Parametro: DNI del paciente
 - POST /Paciente/:dni/Patologia/        Parametro: DNI del paciente | Query String: descripcion de la patologia
 - DEL /Paciente/:dni/Patologia/         Parametro: DNI del paciente
    
 Psicólogo
  
  - GET /Psicólogo/:id_psicologo         Parametro: ID del psicologo
  - POST /Psicólogo/                     Query String: ID del psicologo, nombre, turno
  - PUT /Psicólogo/:id_psicologo         Parametro: ID del psicologo | Query String: turno 
  - DEL /Psicólogo/:id_psicologo         Parametro: ID del psicólogo,

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

# Middleware

Body-parser: Sirve para agregar al request un body de acuerdo al header
Express-validator: Validación de datos recibidos en el body del request.
JWT: Sesion de usuario y authenticación para restringir el acceso de algunas rutas.


# Información

La API estará construida de manera modular, es decir, mantendré separada cada parte que conforme este software en grupos como, por ejemplo, rutas, controladores, middlewares, funciones, base de datos (Oracle), variables de entorno. etc.
Para ver los datos obtenidos por las distintas rutas utilizaré Postman en un servidor local con las rutas y los métodos correspondientes para las acciones CRUD (limitadas según el rol del usuario que quiera acceder). 
