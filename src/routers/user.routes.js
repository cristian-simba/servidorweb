const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
const router = Router()

// Ruta para mostrar el formulario de registro
router.get('/user/register',renderRegisterForm)
// Ruta para capturar los datos en BDD
router.post('/user/register',registerNewUser)

// Ruta para mostrar el formulario login
router.get('/user/login',renderLoginForm)
// Ruta para capturar los datos del formulario en BDD
router.post('/user/login',loginUser)

// Ruta para cerrar sesión de usuario
router.post('/user/logout',logoutUser)


module.exports =router