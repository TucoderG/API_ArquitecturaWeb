const em = require('../errors/messages');
const { getConnection, closeConnection, commitPool } = require('../database/oracle');






const getPaciente = async (req, res) => {
    var message = "";
    /*
        Trae de la BD un paciente con sus 3 campos (DNI, NOMBRE, EMAIL) desde su DNI 
    */
    
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
        return res.status(404).json({"status": "error", "Error": error});

    }finally{
        closeConnection(pool); 
    }
    
    
   
    
}


module.exports = {
    getPaciente,
}