// Método para proteger rutas
module.exports.isAuthenticated = (req,res,next)=>{
    // Si existe un inicio de sesión
    if(req.isAuthenticated()){
        // Continuar
        return next()
    }
    // Redireccionamiento
    res.redirect('/user/login')
}

// Método para proteger rutas
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}