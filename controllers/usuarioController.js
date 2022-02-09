import { UsuarioSchema} from '../models/usuarioModel'

export let obtenerUsuarios = (req, res) => {

    UsuarioSchema.find({}).exec((err, data) => {
        if(err) {
            return res.json({
                status: 500,
                mensaje: 'Error en la peticion'
            })
        }

        res.json({
            status: 200,
            data
        })
    })
}