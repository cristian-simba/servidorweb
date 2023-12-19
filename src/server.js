// Importar express
const express = require('express')
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload')

// Importar path
const path = require('path') //COMMON JS
// Importar Override
const methodOverride = require('method-override');

// Inicializaciones
// Instanciar express
const app = express()
require('./config/passport')

// Configuraciones
// Variables de configuracion
app.set('port', process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Middlewares 
// Servidor va a trabajar con informacion en base a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
// Configura la sesión del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
// Inicializa pasport
app.use(passport.initialize())
app.use(passport.session())

// Variables globales
// Crear variable global
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

// Rutas 
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))

// Archivos estáticos
// Definir archivos estaticos y publicos
app.use(express.static(path.join(__dirname,'public')))

const { engine }  = require('express-handlebars')


// Configuraciones 
// Establecer el path de la carpeta views
app.set('views',path.join(__dirname, 'views'))
// Establecer las configuraciones
app.engine('.hbs',engine({
    // Establecer el master page
    defaultLayout:'main',
    // Establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    // Establecer el path de la carpeta partials
    partialsDir: path.join(app.get('views'),'partials'),
    // Establecer la extension de las paginas
    extname:'.hbs'
}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Establecer el metodo de plantillas
app.set('view engine','.hbs')
app.use(express.static(path.join(__dirname,'public')))
app.use(require('./routers/index.routes'))
module.exports = app