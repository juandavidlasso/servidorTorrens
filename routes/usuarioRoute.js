import express from 'express'
import { verificarToken } from '../middleware/authentication'
import { obtenerUsuarios, registrarUsuario, loginUsuario } from '../controllers/usuarioController'

const app = express()

// Ruta para consultar usuarios a la DB
app.get('/obtener-usuarios', verificarToken, obtenerUsuarios)

// Ruta para registrar usuarios a la DB
app.post('/registrar-usuario', verificarToken, registrarUsuario)

// Ruta para loguear usuarios a la DB
app.post('/login-usuario', loginUsuario)

export default app