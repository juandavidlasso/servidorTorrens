import express from 'express'
import { verificarToken } from '../middleware/authentication'
import { obtenerTareas, registrarTarea, actualizarTarea, eliminarTarea, obtenerTareaUsuario } from '../controllers/tareaController'

const app = express()

// Ruta para consultar tareas a la DB
app.get('/obtener-tareas', verificarToken, obtenerTareas)

// Ruta para crear tareas a la DB
app.post('/crear-tarea', verificarToken, registrarTarea)

// Ruta para actualizar tareas a la DB
app.put('/actualizar-tarea/:id', verificarToken, actualizarTarea)

// Ruta para eliminar tareas a la DB
app.delete('/borrar-tarea/:id', verificarToken, eliminarTarea)

// Ruta para consultar tareas de cada usuario a la DB
app.get('/obtener-tarea', verificarToken, obtenerTareaUsuario)

export default app