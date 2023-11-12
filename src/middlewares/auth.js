const em = require('../errors/messages');
const paciente = require('../controllers/paciente');
const psicologo = require('../controllers/psicologo');


const jwt = require('jsonwebtoken');

async function authenticacionToken(req, res, next){
    try{
        // Busco en los headers la autorizacion
        const authorization = req.get('Authorization');
        let token = '';
        
        if(authorization && authorization.toLowerCase().startsWith('bearer')){
            token = authorization.substring(7);
        }
        // Decodifico el token si es que no expiró o es erroneo
        const decodedToken = jwt.verify(token, process.env.SECRET);
            
        if(!token || !decodedToken.id) throw new Error(em.NO_TOKEN);
      
        // Obtengo el id del usuario que obtuvo el token
        const { id, rol } = decodedToken;
        if(id.length == 8){
            const user = await paciente.getUsuario(id);
            if(!user) throw new Error(em.NO_ENCONTRO_PACIENTE);

        }else{
            const user = await psicologo.getUsuario(id);
            if(!user) throw new Error(em.NO_ENCONTRO_PSICOLOGO);
        }
        
       
        // Guardo los datos del usuario en el request
        req.usuario = {
            id: id,
            rol: rol
        };
        return next();
    }catch(error){
        
        return res.status(401).json({"status": "error", "Error": error.message});
        
    }
}

async function verifyPaciente(req, res, next){
    try{
        const { rol } = req.usuario;
        if(!(rol==="Paciente")) throw new Error(em.ACCESO_DENEGARO_ROL);
        return next();
        
        
    }catch(error){
        return res.status(401).json({"status":"error","mensaje":error.message})
    }
}

async function verifyPsicologo(req, res, next){
    try{
        const { rol } = req.usuario;
        if(!(rol==="Psicologo")) throw new Error(em.ACCESO_DENEGARO_ROL);
        return next();

    }catch(error){
        return res.status(401).json({"status":"error","mensaje":error.message})
    }
}


module.exports={
    authenticacionToken,
    verifyPaciente,
    verifyPsicologo,
}