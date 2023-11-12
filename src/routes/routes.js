// Importación de modulos
const express = require('express');
const { query, param } = require('express-validator');
const pacienteDB = require('../controllers/paciente');
const PatologiaDB = require('../controllers/patologia');
const PatologiaDelPacienteDB = require('../controllers/patologiaDePaciente');
const psicologoDB = require('../controllers/psicologo');
const session = require('../controllers/session');
const { authenticacionToken, verifyPaciente, verifyPsicologo } = require('../middlewares/auth');

const router = express();

// EndPoints

// Session ///////////////////////////////////////////////////////
router.get('/Session/Paciente/:dni',
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(),
    session.logInPaciente);

router.get('/Session/Psicologo/:id_psicologo', 
        param('id_psicologo', "Ingrese su ID de Psicologo")
        .trim()
        .escape(),
    session.logInPsicologo)

// Paciente //////////////////////////////////////////////////////
router.get('/Paciente/:dni', authenticacionToken, verifyPaciente, 
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(),

    pacienteDB.getPaciente);

router.post('/Paciente', authenticacionToken, verifyPaciente,
        query('dni', 'Ingrese el DNI del paciente')
        .trim()
        .isLength({min: 8})
        .escape(),

        query('name', 'Ingrese un nombre valido')
        .trim()
        .escape(),

        query('email', 'Ingrese un email valido')
        .trim()
        .isEmail()
        .escape(),

    pacienteDB.postPaciente);

router.put('/Paciente', authenticacionToken, verifyPaciente,
        query('dni', 'Ingrese el DNI del paciente')
        .trim()
        .isLength({min: 8})
        .escape(),
        
        query('email', 'Ingrese un email valido')
        .trim()
        .isEmail()
        .escape(), 

    pacienteDB.putPaciente);

router.delete('/Paciente/:dni', authenticacionToken, verifyPaciente,
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(),

 pacienteDB.deletePaciente);

// Patologia  /////////////////////////////////////////////////////
router.get('/Patologia/:id_patologia', authenticacionToken, verifyPsicologo,
        param('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),
        
    PatologiaDB.getPatologia);

router.post('/Patologia',  authenticacionToken, verifyPsicologo,
        query('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),
        query('descripcion', 'Ingrese la descripcion de la patologia.'),
        
    PatologiaDB.postPatologia);

router.put('/Patologia/:id_patologia',  authenticacionToken, verifyPsicologo,
        param('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),
        query('descripcion', 'Ingrese la descripcion de la patologia.'),
        
    PatologiaDB.putPatologia);

router.delete('/Patologia/:id_patologia',  authenticacionToken, verifyPsicologo,
        param('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),

    PatologiaDB.deletePatologia);

// Patologias De Pacientes ///////////////////////////////////////
router.get('/Paciente/:dni/Patologia/', authenticacionToken,
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(), 
        
    PatologiaDelPacienteDB.getPatologiasDelPaciente);

router.post('/Paciente/:dni/Patologia', authenticacionToken,
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(),

        query('descripcion', 'Ingrese la descripcion de la patologia.'), 
        
    PatologiaDelPacienteDB.postPatologiaDelPaciente);

router.delete('/Paciente/:dni/Patologia', authenticacionToken,
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isNumeric()
        .isLength({min: 8})
        .escape(),

        query('id_patologia', "Ingrese el ID de la patologia..")
        .isNumeric()
        .trim()
        .escape(),

    PatologiaDelPacienteDB.deletePatologiaDelPaciente);

// Psicologo /////////////////////////////////////////////////////
router.get('/Psicologo/:id_psicologo', authenticacionToken, verifyPsicologo,
        param('id_psicologo', "Ingrese un ID del Psicologo")
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),
    
    psicologoDB.getPsicologo);

router.post('/Psicologo', authenticacionToken, verifyPsicologo,
        query('id_psicologo', 'Ingrese un ID de Psicologo valido')
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),

        query('name', 'Ingrese un nombre valido')
        .trim()
        .escape(),

        query('turno', 'Ingrese un turno valido')
        .trim()
        .escape(),

    psicologoDB.postPsicologo);

router.put('/Psicologo/:id_psicologo/', authenticacionToken, verifyPsicologo,
        param('id_psicologo', 'Ingrese el ID del Psicologo')
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),

        query('turno', 'Ingrese un turno valido')
        .trim()
        .escape(),


    psicologoDB.putPsicologo);

router.delete('/Psicologo/:id_psicologo', authenticacionToken, verifyPsicologo,
        param('id_psicologo', "Ingrese el ID del Psicologo")
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),

    psicologoDB.deletePsicologo);


module.exports = router;