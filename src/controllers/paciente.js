const em = require('../errors/messages');
const { validacionEntrada } = require('./generalFunctions');
const { getConnection, closeConnection, commitPool } = require('../database/oracle');


const getUsuario = async(dni) => {
    const pool = await getConnection();
    
    const result = await pool.execute("SELECT * FROM Paciente WHERE dni = :dni", [dni]);
    closeConnection(pool);
    if(!result.rows[0]) throw new Error(em.NO_ENCONTRO_PACIENTE);
    return true;
    
}

const getPaciente = async (req, res) => {
    var message = "";
    /*
        Trae de la BD un paciente con sus 3 campos (DNI, NOMBRE, EMAIL) desde su DNI 
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { dni } = req.params;
        const result = await pool.execute("SELECT * FROM Paciente where dni = :dni", [dni]);
        if(!result.rows[0]) throw new Error(em.NO_ENCONTRO_PACIENTE);
        return res.status(200).json({"status": "succes", "Paciente": result.rows});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}

const postPaciente = async (req, res) => {
    var message = "";
    /*
        Crea un Paciente
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        
        const { dni, name, email } = req.query;
        const result = await pool.execute("INSERT INTO Paciente(dni, nombre, email) VALUES (:dni, :name, :email)", [dni, name, email]);
        if(result.rowsAffected < 1) throw new Error(em.PACIENTE_NO_INSERTADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Paciente creado correctamente!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});


    }finally{
        closeConnection(pool); 
    }
}

const putPaciente = async (req, res) => {
    var message = "";
    /*
        Trae de la BD un paciente desde su DNI y modifica el email
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { dni, email } = req.query;
        const result = await pool.execute("UPDATE Paciente SET(email) = (:email) WHERE dni = :dni", [email, dni]);
        if(result.rowsAffected < 1) throw new Error(em.PACIENTE_NO_INSERTADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Email del paciente modificado con exito!"});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}


const deletePaciente = async (req, res) => {
    var message = "";
    /*
        Elimina un paciente de la BD desde su DNI 
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { dni } = req.params;
        
        const result = await pool.execute("DELETE Paciente where dni = :dni", [dni]);
        if(result.rowsAffected < 1) throw new Error(em.PACIENTE_NO_ELIMINADO);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "Paciente eliminado correctamente!"});
        
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
    getPaciente,
    postPaciente,
    putPaciente,
    deletePaciente,

}