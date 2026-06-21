import { Router } from "express";

import {

    getLogin,
    getMenu,
    getRegistrarse,
    getEscaneo,
    getDetalleUsuario,
    getAccesoAutorizado,
    getAccesoDenegado

} from "../controllers/controller.views.js";

const router = Router();

// ------
// RUTAS
// ------

router.get("/", getLogin);

router.get("/menu", getMenu);

router.get("/registrarse", getRegistrarse);

router.get("/escaneo", getEscaneo);

router.get("/detalle_usuario", getDetalleUsuario);

router.get("/acceso_autorizado", getAccesoAutorizado);

router.get("/acceso_denegado", getAccesoDenegado);

export default router;