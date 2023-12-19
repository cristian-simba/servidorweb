// Importar el modelo
const Portfolio = require('../models/Portfolio')
const { uploadImage } = require('../config/cloudinary')

// Método para Listar Portafolios
const renderAllPortafolios = async(req,res)=>{
    // Listar todos los portafolios y transformar en Objetos lean
    const portfolios = await Portfolio.find({user:req.user._id}).lean()

    // Mandar a la vista los portafolios
    res.render("portafolio/allPortfolios",{portfolios})

    // Mandar vista con JSON
    //res.json(portfolios)
}

// Listar Detalle de un Portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

// Mandar a la vista de new Portafolio
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

// Crear un Nuevo Portafolio
const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    // Asociar el portafolio con el usuario
    newPortfolio.user = req.user._id
    // Validar si existe una imagen
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // Usar el metodo
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
    public_id:imageUpload.public_id,
    secure_url:imageUpload.secure_url
    }
    await newPortfolio.save()
    res.redirect('/portafolios')
    }

// Convertir en JSON y mandar a la vista de editar portafolio
const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}

// Actualizar Portafolio
const updatePortafolio = async(req,res)=>{
    // Capturar los datos del Body
    const {title,category,description}= req.body
    // Actualizar la BD
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}

// Eliminar Portafolio
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    // Mandar vista
    res.redirect('/portafolios')
}

module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}

