const User = require('../models/User')
const passport = require("passport")

// Mostrar Formulario de Registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

// Configurar y Almacenar en BDD
const registerNewUser = async(req,res)=>{

    // Captura los datod del body
    const{name,email,password,confirmpassword} = req.body

    // Validar todos los campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    
    // Validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    const userBDD = await User.findOne({email})

    // Validar si ya está registrado
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")

    // Crear una nueva instancia del Usuario
    const newUser = await new User({name,email,password,confirmpassword})

    // Encriptar el password
    newUser.password = await newUser.encrypPassword(password)

    // Guardar en BBD
    newUser.save()

    // Redireccionar
    res.redirect('/user/login')
}

// Mostrar login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

// Capturar los datos del formulario y realizar el proceso login en BDD
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

// Cerrar sesión de Usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

// Exportar Métodos (Controladores)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}