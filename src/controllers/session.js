const em = require('../errors/messages');
const { validacionEntrada } = require('./generalFunctions');
const { getUsuario } = require('./paciente');
const jwt = require('jsonwebtoken');


const logIn = async (req, res) =>{
    var message = "";
    message = validacionEntrada(req);

    try{
        if(message !== "") throw new Error(message);
        const { dni } = req.params;

        
        const usuario = await getUsuario(dni); 
        if(!usuario) throw new Error("No existe el usuario..");

        const userSesion = {
            id: dni,
        }

        const token = jwt.sign(
            userSesion, 
            process.env.SECRET,
            {
                expiresIn: "5d",
            }
           
        );
        
        

        return res.status(202).json({"status": "success", "message": "Session iniciada!", "token": token});
    }catch(error){
        return res.status(401).json({"status": "Error", "message": error.message});
    }

}

module.exports = {

    logIn,
    
}