import bcrypt from 'bcrypt'
import { UsuarioSchema} from '../models/usuarioModel'

// Función para consultar usuarios a la DB
export let obtenerUsuarios = (req, res) => {

    UsuarioSchema.find({}).exec((err, data) => {
        if(err) {
            return res.json({
                status: 500,
                mensaje: 'Error en la conexión con el servidor.'
            })
        }

        res.json({
            status: 200,
            data
        })
    })
}

// Función para registrar usuarios a la DB
export let registrarUsuario = (req, res) => {

    let body = req.body
    let usuario = new UsuarioSchema({
        nombres: body.nombres,
        apellidos: body.apellidos,
        telefono: body.telefono,
        email: body.email,
        estado: body.estado,
        rol: body.rol,
        usuario: body.usuario,
        password: bcrypt.hashSync(body.password, 10)
    })

    usuario.save((err, data) => {
        if(err) {
            return res.json({
                status: 400,
                mensaje: 'Error, no se pudo registrar el usuario.',
                err
            })
        }

        res.json({
            status: 200,
            mensaje: 'El usuario se registró con éxito.',
            data
        })

    })
}