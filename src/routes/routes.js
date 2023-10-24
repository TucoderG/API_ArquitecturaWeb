// Importación de modulos
const express = require('express');
const pacienteDB = require('../controllers/paciente');

const router = express();

// EndPoints
router.get('/get/Paciente/:dni', pacienteDB.getPaciente);

module.exports = router;