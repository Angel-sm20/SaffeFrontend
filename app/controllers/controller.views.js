
// -----------
// VISTA LOGIN
// -----------|

export const getLogin = (req, res) => {

    res.render("login");

};

// ----------
// VISTA MENÚ
// ----------

export const getMenu = (req, res) => {

    res.render("menu");

};

// ---------------
// VISTA REGISTRO
// ---------------

export const getRegistrarse = (req, res) => {

    res.render("registrarse");

};

// --------------
// VISTA ESCANEO
// --------------

export const getEscaneo = (req, res) => {

    res.render("escaneo");

};

// ----------------
// DETALLE USUARIO
// ----------------

export const getDetalleUsuario = (req, res) => {

    res.render("detalle_usuario");

};

// ------------------
// ACCESO AUTORIZADO
// ------------------

export const getAccesoAutorizado = (req, res) => {

    res.render("acceso_autorizado");

};

// ----------------
// ACCESO DENEGADO
// ----------------

export const getAccesoDenegado = (req, res) => {

    res.render("acceso_denegado");

};