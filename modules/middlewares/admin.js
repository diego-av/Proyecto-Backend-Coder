import Router from "express";

const router = Router()

const sesion = {admin: true}

const isAdmin = router.use((req, res, next) => {
    // console.log(req);

    if(sesion.admin !== true){
        res.status(401).send({ error : -1, descripcion: `ruta 'x' método 'y' no autorizada` })
        return
    }
    
    next();
})

export default isAdmin