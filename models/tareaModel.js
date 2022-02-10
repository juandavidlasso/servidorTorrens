const mongoose = require('mongoose')

let Schema = mongoose.Schema

// Modelo de la tabla de tareas
let tareaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    tiempo: {
        type: Number,
        required: [true, 'El tiempo es obligatorio']
    },
    idUsuario: {
        type: Number,
        required: [true, 'El usuario asignado es obligatorio']
    }
})

export const TareaSchema = mongoose.model('tareas', tareaSchema)