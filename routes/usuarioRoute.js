import express from 'express'
import { obtenerUsuarios, registrarUsuario } from '../controllers/usuarioController'

const app = express()

// Ruta para consultar usuarios a la DB
app.get('/obtener-usuarios', obtenerUsuarios)

// Ruta para registrar usuarios a la DB
app.post('/registrar-usuario', registrarUsuario)

export default app