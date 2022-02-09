const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./config')

const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Conexion a la DB
mongoose.connect('mongodb://localhost:27017/pruebaTorrens', (err, res) => {
    if(err) throw err

    console.log('Conectado a la db');
})

// Puerto listen
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${port}`);
})