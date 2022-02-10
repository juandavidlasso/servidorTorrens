import express from 'express'
import { obtenerTareas, registrarTarea, actualizarTarea, eliminarTarea } from '../controllers/tareaController'

const app = express()

// Ruta para consultar tareas a la DB
app.get('/obtener-tareas', obtenerTareas)

// Ruta para crear tareas a la DB
app.post('/crear-tarea', registrarTarea)

// Ruta para actualizar tareas a la DB
app.put('/actualizar-tarea/:id', actualizarTarea)

// Ruta para eliminar tareas a la DB
app.delete('/borrar-tarea/:id', eliminarTarea)

export default app