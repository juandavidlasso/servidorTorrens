import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
    
    // Valido formato del correo
    var patronCorreo = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    if(patronCorreo.test(body.email) === false) {
        return res.json({
            status: 400,
            mensaje: 'Error, el correo no tiene el formato correcto.'
        })
    }

    // Valido formato del password
    var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/
    if(patron.test(body.password) === false) {
        return res.json({
            status: 400,
            mensaje: 'Error, la contraseña no tiene el formato correcto.'
        })
    }

    let usuario = new UsuarioSchema({
        nombres: body.nombres,
        apellidos: body.apellidos,
        telefono: body.telefono,
        email: body.email,
        estado: body.estado,
        rol: body.rol,
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



// Función para loguear usuarios a la DB
export let loginUsuario = (req, res) => {

    let body = req.body
    
    UsuarioSchema.findOne({ email: body.email }, (err, data) => {
        if(err) {
            return res.json({
                status: 500,
                mensaje: 'Error en la conexión con el servidor.',
                err
            })
        }

        if(!data) {
            return res.json({
                status: 400,
                mensaje: 'Error, el usuario es incorrecto.'
            })
        }

        if(!bcrypt.compareSync(body.password, data.password)) {
            return res.json({
                status: 400,
                mensaje: 'Error, la contraseña es incorrecta.'
            })
        }

        let token = jwt.sign({
            data
        }, process.env.SECRET, { expiresIn: 60*60*24*1 })

        res.json({
            status: 200,
            token,
            data
        })
    })
}
