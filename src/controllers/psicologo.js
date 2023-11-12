const em = require('../errors/messages');
const { validacionEntrada } = require('./generalFunctions');
const { getConnection, closeConnection, commitPool } = require('../database/oracle');

const getUsuario = async(id_psicologo) => {
    const pool = await getConnection();
    
    const result = await pool.execute("SELECT * FROM Psicologo WHERE id_psicologo = :id_psicologo", [id_psicologo]);
    closeConnection(pool);
    if(!result.rows[0]) throw new Error(em.NO_ENCONTRO_PACIENTE);
    return true;
    
}

const getPsicologo = async (req, res) => {
    var message = "";
    /*
        Trae de la BD un Psicologo con sus 3 campos (ID_PSICOLOGO, NOMBRE, TURNO) desde su id_psicologo 
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { id_psicologo } = req.params;
        const result = await pool.execute("SELECT * FROM Psicologo where id_psicologo = :id_psicologo", [id_psicologo]);
        if(!result.rows[0]) throw new Error(em.NO_ENCONTRO_PSICOLOGO);
        return res.status(200).json({"status": "succes", "Psicologo": result.rows});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}

const postPsicologo = async (req, res) => {
    var message = "";
    /*
        Crea un Psicologo
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        
        const { id_psicologo, name, turno } = req.query;
        const result = await pool.execute("INSERT INTO Psicologo(id_psicologo, nombre, turno) VALUES (:id_psicologo, :name, :turno)", [id_psicologo, name, turno]);
        if(result.rowsAffected < 1) throw new Error(em.PSICOLOGO_NO_INSERTADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Psicologo creado correctamente!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});


    }finally{
        closeConnection(pool); 
    }
}

const putPsicologo = async (req, res) => {
    var message = "";
    /*
        Trae de la BD un Psicologo desde su ID y modifica el turno
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { id_psicologo } = req.params;
        const { turno } = req.query;
        const result = await pool.execute("UPDATE Psicologo SET(turno) = (:turno) WHERE id_psicologo = :id_psicologo", [turno, id_psicologo]);
        if(result.rowsAffected < 1) throw new Error(em.PSICOLOGO_NO_INSERTADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Turno del Psicologo modificado con exito!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}


const deletePsicologo = async (req, res) => {
    var message = "";
    /*
        Elimina un Psicologo de la BD desde su ID 
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { id_psicologo } = req.params;
        
        const result = await pool.execute("DELETE Psicologo where id_psicologo = :id_psicologo", [id_psicologo]);
        if(result.rowsAffected < 1) throw new Error(em.PSICOLOGO_NO_ELIMINADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Psicologo eliminado correctamente!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}



module.exports = {
    getUsuario,
    getPsicologo,
    postPsicologo,
    putPsicologo,
    deletePsicologo,

}