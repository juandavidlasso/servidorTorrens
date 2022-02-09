import express from 'express'
import { obtenerUsuarios } from '../controllers/usuarioController'

const app = express()

app.get('/obtener-usuarios', obtenerUsuarios)

export default app