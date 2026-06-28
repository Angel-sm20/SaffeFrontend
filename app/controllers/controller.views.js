// =========================
// CONTROLADORES DE VISTAS
// =========================

/**
 * Renderiza la vista de inicio de sesión
 */
export const getLogin = (req, res) => {
  return res.render("login");
};

/**
 * Renderiza la vista del menú principal
 */
export const getMenu = (req, res) => {
  return res.render("menu");
};

/**
 * Renderiza la vista de registro
 */
export const getRegistrarse = (req, res) => {
  return res.render("registrarse");
};

/**
 * Renderiza la vista de escaneo
 */
export const getEscaneo = (req, res) => {
  return res.render("escaneo");
};

/**
 * Renderiza la vista de detalle del usuario
 */
export const getDetalleUsuario = (req, res) => {
  return res.render("detalle_usuario");
};

/**
 * Renderiza la vista de acceso autorizado
 */
export const getAccesoAutorizado = (req, res) => {
  return res.render("acceso_autorizado");
};

/**
 * Renderiza la vista de acceso denegado
 */
export const getAccesoDenegado = (req, res) => {
  return res.render("acceso_denegado");
};