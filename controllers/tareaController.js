import { TareaSchema } from '../models/tareaModel'

// Consulto las tareas - CRUD
export let obtenerTareas = (req, res) => {

    TareaSchema.find({}).exec((err, data) => {
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

// Registro una tarea - CRUD
export let registrarTarea = (req, res) => {

    let body = req.body
    let tarea = new TareaSchema({
        titulo: body.titulo,
        descripcion: body.descripcion,
        tiempo: body.tiempo,
        idUsuario: body.idUsuario
    })

    tarea.save((err, data) => {
        if(err) {
            return res.json({
                status: 400,
                mensaje: 'Error, no se pudo registrar la tarea.',
                err
            })
        }

        res.json({
            status: 200,
            mensaje: 'La tarea se registró con éxito.',
            data
        })

    })
}

// Actualizar una tarea - CRUD
export let actualizarTarea = (req, res) => {

    let id = req.params.id

    let body = req.body

    // Valido que exista la tarea
    TareaSchema.findById(id, (err, data) => {
        // Si ocurre error en la conexion
        if(err) {
            return res.json({
                status: 500,
                mensaje: 'Error en la conexión con el servidor.',
                err
            })
        }

        // Si no existe la tarea
        if(!data) {
            return res.json({
                status: 400,
                mensaje: 'Error, la tarea no existe.'
            })
        }

        // Obtengo los datos que voy a actualizar
        let nuevaTarea = {
            titulo: body.titulo,
            descripcion: body.descripcion,
            tiempo: body.tiempo,
            idUsuario: body.idUsuario
        }

        // Actualizo la tarea
        TareaSchema.findByIdAndUpdate(id, nuevaTarea, { new: true, runValidators: true }, (err, data) => {
            if(err) {
                return res.json({
                    status: 400,
                    mensaje: 'Error, no se pudo actualizar la tarea.',
                    err
                })
            }

            res.json({
                status: 200,
                mensaje: 'La tarea se actualizó con éxito.',
                data
            })
        })
    })
}



// Eliminar una tarea - CRUD
export let eliminarTarea = (req, res) => {

    // Capturo el id de la tarea que voy a borrar
    let id = req.params.id

    TareaSchema.findById(id, (err, data) => {
        // Si ocurre error en la conexion
        if(err) {
            return res.json({
                status: 500,
                mensaje: 'Error en la conexión con el servidor.',
                err
            })
        }

        // Si no existe la tarea
        if(!data) {
            return res.json({
                status: 400,
                mensaje: 'Error, la tarea no existe.'
            })
        }

        // Borro la tarea
        TareaSchema.findByIdAndRemove(id, (err, data) => {
            if(err) {
                return res.json({
                    status: 400,
                    mensaje: 'Error, no se pudo eliminar la tarea.',
                    err
                })
            }

            res.json({
                status: 200,
                mensaje: 'La tarea se eliminó con éxito.',
                data
            })
        })
    })
}



// Consulto las tareas de cada usuario
export let obtenerTareaUsuario = (req, res) => {

    let body = req.body

    TareaSchema.find({ idUsuario: body.idUsuario }).exec((err, data) => {
        if(err) {
            return res.json({
                status: 400,
                mensaje: 'Error en la conexión con el servidor.'
            })
        }

        res.json({
            status: 200,
            data
        })
    })
}