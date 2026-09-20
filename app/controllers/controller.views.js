// =========================
// CONTROLADORES DE VISTAS
// =========================

<<<<<<< HEAD
// -----------
// VISTA LOGIN
// -----------

=======
/**
 * Renderiza la vista de inicio de sesión
 */
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
export const getLogin = (req, res) => {
  return res.render("login");
};

<<<<<<< HEAD
// ---------------
// VISTA REGISTRO
// ---------------

=======
/**
 * Renderiza la vista del menú principal
 */
export const getMenu = (req, res) => {
  return res.render("menu");
};

/**
 * Renderiza la vista de registro
 */
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
export const getRegistrarse = (req, res) => {
  return res.render("registrarse");
};

/**
 * Renderiza la vista de escaneo
 */
export const getEscaneo = (req, res) => {
  return res.render("escaneo");
};

<<<<<<< HEAD
// ------------------
// ACCESO AUTORIZADO
// ------------------

=======
/**
 * Renderiza la vista de detalle del usuario
 */
export const getDetalleUsuario = (req, res) => {
  return res.render("detalle_usuario");
};

/**
 * Renderiza la vista de acceso autorizado
 */
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
export const getAccesoAutorizado = (req, res) => {
  return res.render("acceso_autorizado");
};

/**
 * Renderiza la vista de acceso denegado
 */
export const getAccesoDenegado = (req, res) => {
<<<<<<< HEAD

    res.render("acceso_denegado");

};

// ------------------
// DETALLE DE USUARIO
// ------------------

export const getDetalleUsuario = (req, res) => {

    res.render("detalle_usuario");

=======
  return res.render("acceso_denegado");
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
};