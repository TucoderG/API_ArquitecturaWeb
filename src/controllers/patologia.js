const em = require('../errors/messages');
const { validacionEntrada } = require('./generalFunctions');
const { getConnection, closeConnection, commitPool } = require('../database/oracle');


const getPatologia = async (req, res) => {
    var message = "";
    /*
        Trae de la BD una Patologia con su descripcion desde su ID
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { id_patologia } = req.params;
        const result = await pool.execute("SELECT * FROM Patologia where id_patologia = :id_patologia", [id_patologia]);
        if(!result.rows[0]) throw new Error(em.NO_ENCONTRO_PACIENTE);
        return res.status(200).json({"status": "succes", "Patologia": result.rows});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}

const postPatologia = async (req, res) => {
    var message = "";
    /*
        Crea una Patologia 
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        
        const { descripcion } = req.query;
        
        var maxId = await getMaxIdPatologia(pool, descripcion);
        if(maxId == null) throw new Error(em.PATOLOGIA_EXISTENT);
        maxId = parseInt(maxId) + 1;

        const result = await pool.execute("INSERT INTO Patologia(id_patologia, descripcion) VALUES (:maxId, :descripcion)", [maxId, descripcion]);
        if(result.rowsAffected < 1) throw new Error(em.PACIENTE_NO_INSERTADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Patologia creado correctamente!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});


    }finally{
        closeConnection(pool); 
    }
}

const putPatologia = async (req, res) => {
    var message = "";
    /*
        Trae de la BD un paciente desde su DNI y modifica el email
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { id_patologia, descripcion } = req.query;
        const result = await pool.execute("UPDATE Patologia SET(descripcion) = (:descripcion) WHERE id_patologia = :id_patologia", [descripcion, id_patologia]);
        if(result.rowsAffected < 1) throw new Error(em.PACIENTE_NO_INSERTADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Descripcion de la Patologia modificado con exito!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}


const deletePatologia = async (req, res) => {
    var message = "";
    /*
        Elimina una Patologia de la BD desde su ID
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { id_patologia } = req.params;
        
        const result = await pool.execute("DELETE Patologia where id_patologia = :id_patologia", [id_patologia]);
        if(result.rowsAffected < 1) throw new Error(em.PACIENTE_NO_ELIMINADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Patologia eliminada correctamente!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}

const getIdPatologia = async (pool, nombre_patologia) => {

    /*

        Obtengo el ID de una patologia desde su descripcion

    */
    const result = await pool.execute("SELECT id_patologia FROM Patologia WHERE descripcion LIKE :nombre_patologia", [nombre_patologia]);
    if(!result.rows[0]) throw new Error(em.NO_ENCONTRO_PATOLOGIA);
    return result.rows[0][0];
    
}

const getMaxIdPatologia = async (pool, descripcion) =>{
    /*

        Obtengo el maximo id de la patologia para crear una nueva

    */
    const existPatologia = await pool.execute("SELECT id_patologia FROM Patologia WHERE descripcion LIKE :descripcion", [descripcion]);
    if(existPatologia.rows[0]) return null;
    
    const result = await pool.execute("SELECT MAX(id_patologia) FROM Patologia");
    return result.rows[0][0]
}

module.exports = {
    getPatologia,
    postPatologia,
    putPatologia,
    deletePatologia,
    getIdPatologia,

}