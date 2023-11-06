const { validationResult } = require('express-validator');



const validacionEntrada = (req) => {
    var message = "";
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        for(error in errors.array()){
            message += `${errors.array()[error].msg}  `; 
        }
        return message;
    }
    return message;
    
}



module.exports = {
    validacionEntrada,
}