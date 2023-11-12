const em = require('../errors/messages');
const { validacionEntrada } = require('./generalFunctions');
const paciente = require('./paciente');
const psicologo = require('./psicologo');
const jwt = require('jsonwebtoken');


const logInPaciente = async (req, res) =>{
    var message = "";
    message = validacionEntrada(req);
    
    try{
        if(message !== "") throw new Error(message);
        // LOGIN PACIENTE
       
        const { dni } = req.params;

        const usuario = await paciente.getUsuario(dni); 
        if(!usuario) throw new Error(em.NO_ENCONTRO_PACIENTE);

        const userSesion = {
            id: dni,
            rol: 'Paciente'
        }

        // SESSION TOKEN
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
const logInPsicologo = async (req, res) =>{
    var message = "";
    message = validacionEntrada(req);
    var userSesion = {
        id: 0,
        rol: ""
    }
    try{
        if(message !== "") throw new Error(message);
        
        const { id_psicologo } = req.params;
        const usuario = await psicologo.getUsuario(id_psicologo); 
        if(!usuario) throw new Error(em.NO_ENCONTRO_PSICOLOGO);
        userSesion = {
            id: id_psicologo,
            rol: 'Psicologo'
        }
        
        // SESSION TOKEN
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

    logInPaciente,
    logInPsicologo,
    
}