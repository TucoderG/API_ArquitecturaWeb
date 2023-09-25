// Importación de modulos
const express = require('express');

const router = express();

// EndPoints
router.get('/', (req, res)=>{
    return res.status(200).json({"status": "success", "message": "Hola!"});
})

module.exports = router;