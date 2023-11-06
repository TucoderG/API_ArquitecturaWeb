// Importación de modulos
const express = require('express');
const { query, param } = require('express-validator');
const pacienteDB = require('../controllers/paciente');
const PatologiaDB = require('../controllers/patologia');
const PatologiaDelPacienteDB = require('../controllers/patologiaDePaciente');
const psicologoDB = require('../controllers/psicologo');

const router = express();

// EndPoints

// Paciente //////////////////////////////////////////////////////
router.get('/Paciente/:dni', 
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 7})
        .escape(),

    pacienteDB.getPaciente);

router.post('/Paciente', 
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

router.put('/Paciente',
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

    pacienteDB.putPaciente);

router.delete('/Paciente/:dni', 
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(),

 pacienteDB.deletePaciente);

// Patologia  /////////////////////////////////////////////////////
router.get('/Patologia/:id_patologia', 
        param('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),
        
    PatologiaDB.getPatologia);

router.post('/Patologia', 
        query('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),
        query('descripcion', 'Ingrese la descripcion de la patologia.'),
        
    PatologiaDB.postPatologia);

router.put('/Patologia', 
        query('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),
        query('descripcion', 'Ingrese la descripcion de la patologia.'),
        
    PatologiaDB.putPatologia);

router.delete('/Patologia/:id_patologia', 
        param('id_patologia', "Ingrese el ID de la patologia..")
        .trim()
        .escape(),

    PatologiaDB.deletePatologia);

// Patologias De Pacientes
router.get('/Paciente/Patologia/:dni',
        param('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(), 
        
    PatologiaDelPacienteDB.getPatologiasDelPaciente);

router.post('/Paciente/Patologia',
        query('dni', "Ingrese el DNI del paciente")
        .trim()
        .isLength({min: 8})
        .escape(),

        query('descripcion', 'Ingrese la descripcion de la patologia.'), 
        
    PatologiaDelPacienteDB.postPatologiaDelPaciente);

router.delete('/Paciente/:dni/Patologia',
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
router.get('/Psicologo/:id_psicologo', 
        param('id_psicologo', "Ingrese un ID del Psicologo")
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),
    
    psicologoDB.getPsicologo);

router.post('/Psicologo',  
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

router.put('/Psicologo/:id_psicologo/',  
        param('id_psicologo', 'Ingrese el ID del Psicologo')
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),

        query('turno', 'Ingrese un turno valido')
        .trim()
        .escape(),


    psicologoDB.putPsicologo);

router.delete('/Psicologo/:id_psicologo', 
        param('id_psicologo', "Ingrese el ID del Psicologo")
        .trim()
        .isNumeric()
        .isLength({min: 3})
        .escape(),

    psicologoDB.deletePsicologo);


module.exports = router;