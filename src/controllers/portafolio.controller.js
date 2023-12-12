// Importar el modelo
const Portfolio = require('../models/Portfolio')

// Método para Listar Portafolios
const renderAllPortafolios = async(req,res)=>{
    // Listar todos los portafolios y transformar en Objetos lean
    const portfolios = await Portfolio.find().lean()

    // Mandar a la vista los portafolios
    res.render("portafolio/allPortfolios",{portfolios})
}

// Listar Detalle de un Portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    await newPortfolio.save()
    res.json({newPortfolio})
}


const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}

const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}

const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
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

