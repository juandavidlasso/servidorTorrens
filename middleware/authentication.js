import jwt from 'jsonwebtoken'

// Verifico el token para proteger las rutas del servidor
export let verificarToken = (req, res, next) => {
    let token = req.get('Authorization')

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.json({
                status: 401,
                err
            })
        }

        req.usuario = decoded.usuario
        next()
    })
}