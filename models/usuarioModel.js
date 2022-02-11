const mongoose = require('mongoose')

let Schema = mongoose.Schema

// Modelo de la tabla de usuarios
let usuarioSchema = new Schema({
    nombres: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    telefono: {
        type: Number,
        required: [true, 'El teléfono es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado es obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
})

usuarioSchema.methods.toJSON = function() {
    let usu = this
    let usuarioObject = usu.toObject()
    delete usuarioObject.password

    return usuarioObject
}

export const UsuarioSchema = mongoose.model('usuarios', usuarioSchema)