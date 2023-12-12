require('dotenv').config()

// IMPORTAR APP
const app = require('./server.js')
// IMPORTAR DATABASE
const connection = require('./database.js')
connection()

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})