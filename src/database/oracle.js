// Importación de modulos
const oracle = require('oracledb');

// Me permite utilizar las variables de entorno
require('dotenv').config(options = {path: '.env'});

// Atributos de Conexión 

const connection = {
    user: process.env.BD_ORACLE_USERNAME,
    password: process.env.DB_ORACLE_PASSWORD,
    connectionString: process.env.DB_ORACLE_CONNECTIONSTRING,
    port: process.env.DB_ORACLE_PORT,
    trustServerCertificate: true,
    stream: true,
}


// Obtengo la conexión
async function getConnection(){
    
    try{
        const pool = await oracle.getConnection(connection);
        return pool;
    }catch(error){
        console.log(error.message);
    }
}

// Cierro la Conexión
async function closeConnection(pool){
    
    pool.close((err) =>{
        if(err) throw new Error('Error al finalizar la conexion...');
    }); 
    

}


// Commit sobre la base de datos
async function commitPool(pool){

    pool.commit((err) => {
        if (err) throw new Error(err.message);  
    });
    
}

module.exports = {
    getConnection,
    closeConnection,
    commitPool,
}