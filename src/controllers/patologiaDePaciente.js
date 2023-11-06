const em = require('../errors/messages');
const { getConnection, closeConnection, commitPool } = require('../database/oracle');
const { validacionEntrada } = require('./generalFunctions');

const getPatologiasDelPaciente = async (req, res) => {
    var message = "";
    /*
        Trae de la BD una Patologia con su descripcion desde su ID
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { dni } = req.params;

        const paciente = await pool.execute("SELECT * FROM Paciente WHERE dni = :dni", [dni]);
        if(!paciente.rows[0]) throw new Error(em.NO_ENCONTRO_PACIENTE);

        var patologias = await pool.execute("SELECT id_patologia FROM PatologiaDelPaciente WHERE dni_paciente = :dni", [dni]);
        if(!patologias.rows[0]) throw new Error(em.PACIENTE_SIN_PATOLOGIAS);
        patologias = patologias.rows

        const query = `SELECT descripcion FROM Patologia WHERE id_patologia in (${patologias})`;
        const result = await pool.execute(query);
        if(!result.rows[0]) throw new Error(em.ERROR_INESPERADO);

        return res.status(200).json({"status": "succes", "Patologias del paciente": result.rows});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});

    }finally{
        closeConnection(pool); 
    }
}

const postPatologiaDelPaciente = async (req, res) => {
    var message = "";
    /*
        Crea una Patologia 
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        
        const { dni, descripcion } = req.query;
        
        const paciente = await pool.execute("SELECT nombre FROM Paciente WHERE dni = :dni", [dni]);
        if(!paciente.rows[0]) throw new Error(em.NO_ENCONTRO_PACIENTE);
        const namePaciente = paciente.rows[0].toString();
        
        const patologia = await pool.execute("SELECT id_patologia FROM Patologia WHERE descripcion LIKE :descripcion", [descripcion]);
        if(!patologia.rows[0]) throw new Error(em.PATOLOGIA_NO_ENCONTRADA);
        const id_patologia = parseInt(patologia.rows[0])

        const tienePatologia = await pool.execute("SELECT * FROM PatologiaDelPaciente WHERE id_patologia = :id_patologia and dni_paciente = :dni", [id_patologia, dni]);
        if(tienePatologia.rows[0]) throw new Error(em.PACIENTE_TIENE_PATOLOGIA);

        const result = await pool.execute("INSERT INTO PatologiaDelPaciente (dni_paciente, id_patologia) VALUES (:dni, :id_patologia)", [dni, id_patologia]);
        if(result.rowsAffected < 1) throw new Error(em.ERROR_INESPERADO);

        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": `El paciente ${namePaciente} tiene una nueva patologia: ${descripcion}`});
        
    }catch(error){
        if(error.message.includes("Ingrese")){
            return res.status(409).json({status: 'error', error: error.message});
        }
        return res.status(404).json({"status": "error", "Error": error.message});


    }finally{
        closeConnection(pool); 
    }
}




const deletePatologiaDelPaciente = async (req, res) => {
    var message = "";
    /*
        Elimina una Patologia de la BD desde su ID
    */
    message = validacionEntrada(req);
    const pool = await getConnection();
    try{
        if(message !== "") throw new Error(message);
        const { dni } = req.params;
        const { id_patologia } = req.query;
        
        const result = await pool.execute("DELETE PatologiaDelPaciente WHERE dni_paciente = :dni AND id_patologia = :id_patologia", [dni, id_patologia]);
        if(result.rowsAffected < 1) throw new Error(em.NO_ENCONTRO_PACIENTE);
        commitPool(pool);
        return res.status(200).json({"status": "succes", "message": "El paciente ya no tiene esa patologia!"});
        
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
    getPatologiasDelPaciente,
    postPatologiaDelPaciente,
    deletePatologiaDelPaciente,
}