import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routeUsuario from './routes/usuarioRoute'
import './config'

const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routeUsuario)

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