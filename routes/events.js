/* 
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Validar JWT
router.use( validarJWT );


// Obtener eventos
router.get('/', getEventos);

// Crear un evento
router.post(
    '/', 
    [
        check('title', 'Titulo obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio obligatoria').custom( isDate ),
        check('end', 'Fecha final obligatoria').custom( isDate ),

        validarCampos
    ],
    crearEvento);

// Actualizar un evento
router.put('/:id', actualizarEvento);

// Borrar un evento
router.delete('/:id', eliminarEvento);







module.exports = router;