const em = require('../errors/messages');
const { getUsuario } = require('../controllers/paciente');
const jwt = require('jsonwebtoken');

async function authenticacionToken(req, res, next){
    try{
        // Busco en los headers la autorizacion
        const authorization = req.get('Authorization')
        let token = ''
        if(authorization && authorization.toLowerCase().startsWith('bearer')){
            token = authorization.substring(7)
        }
        // Decodifico el token si es que no expiró o es erroneo
        const decodedToken = jwt.verify(token, process.env.SECRET)    
            
        if(!token || !decodedToken.id) throw new Error(em.NO_TOKEN)
      
        // Obtengo el id del usuario que obtuvo el token
        const { id } = decodedToken;

        // Verifico que exista
        const usuario = await getUsuario(id);
        if(!usuario) throw new Error(em.NO_USUARIO)
        // Guardo los datos del usuario en el request
        req.usuario = usuario;
        return next();
    }catch(error){
        
        return res.status(401).json({"status": "error", "Error": error.message});
        
    }
}


module.exports={
    authenticacionToken
}