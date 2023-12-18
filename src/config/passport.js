// Importar Passport
const passport = require('passport')
// Importar el Modelo
const User = require('../models/User')
// Establecer Estrategia
const LocalStrategy = require('passport-local').Strategy

// Implementar estrategia Local
passport.use(new LocalStrategy({
    // En base a email y password
    usernameField:'email',
    passwordField:'password'
    // Función para hacer el proceso de inicio de sesión
},async(email,password,done)=>{
    // Buscar mail en BD    
    const userBDD = await User.findOne({email})
    // Verificar si existe usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    // Desencriptar el password
    const passwordUser = await userBDD.matchPassword(password)
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // Retornar el Usuario de BD
    return done(null,userBDD)
}))


// Serializar el Usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// Deserealizar el Usuario
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});