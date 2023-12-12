const{Router} = require('express')

const router = Router()

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controller.js')

// Cargar la vista del formulario
router.get('/portafolio/add', renderPortafolioForm)
// Ruta para capturar y guardar datos del form y guardar en BD
router.post('/portafolio/add', createNewPortafolio)

// Presentar todos los formularios
router.get('/portafolios', renderAllPortafolios)
// Presentar detalle de un formulario
router.get('/portafolio/:id', renderPortafolio)

// Cargar vista del formulario
router.get('/portafolio/edit/:id', renderEditPortafolioForm)
// Ruta para capturar y guardar los datos en BD
router.put('/portafolio/edit/:id', updatePortafolio)

// Ruta para eliminar el portafolio
router.delete('/portafolio/delete/:id', deletePortafolio)

// Exportar
module.exports = router