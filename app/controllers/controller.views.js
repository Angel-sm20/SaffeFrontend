const apiUrl = process.env.BACKEND_URL || "http://localhost:3000";

export const getLogin = (req, res) => res.render("login", { apiUrl });
export const getRegistrarse = (req, res) => res.render("registrarse", { apiUrl });
export const getEscaneo = (req, res) => res.render("escaneo", { apiUrl });
export const getAccesoAutorizado = (req, res) => res.render("acceso_autorizado", { apiUrl });
export const getAccesoDenegado = (req, res) => res.render("acceso_denegado", { apiUrl });
export const getDetalleUsuario = (req, res) => res.render("detalle_usuario", { apiUrl });