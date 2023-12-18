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

const {isAuthenticated} = require('../helpers/validate-auth')

// Importar método

// Cargar la vista del formulario
router.get('/portafolio/add',isAuthenticated,renderPortafolioForm)
// Ruta para capturar y guardar datos del form y guardar en BD
router.post('/portafolio/add', isAuthenticated,createNewPortafolio)

// Presentar todos los formularios
router.get('/portafolios',isAuthenticated,renderAllPortafolios)
// Presentar detalle de un formulario
router.get('/portafolio/:id', isAuthenticated,renderPortafolio)

// Cargar vista del formulario
router.get('/portafolio/edit/:id', isAuthenticated,renderEditPortafolioForm)
// Ruta para capturar y guardar los datos en BD
router.put('/portafolio/edit/:id', isAuthenticated,updatePortafolio)

// Ruta para eliminar el portafolio
router.delete('/portafolio/delete/:id', isAuthenticated,deletePortafolio)

// Exportar
module.exports = router