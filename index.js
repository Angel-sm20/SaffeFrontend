// --------------
// IMPORTACIONES
// --------------

// Framework Express
import express from "express";

// Manejo de sesiones
import session from "express-session";

// Rutas del proyecto
import rutas from "./app/routes/routes.views.js";

// ----------------------
// CONFIGURACIÓN INICIAL
// ----------------------

const app = express();

// Puerto del Frontend
const PORT = Number(process.env.PORT || 4000);

// -------------------
// CONFIGURACIÓN EJS
// -------------------

app.set("view engine", "ejs");
app.set("views", "./views");

// -----------
// MIDDLEWARE
// -----------

// Leer formularios
app.use(express.urlencoded({ extended: true }));

// Leer JSON
app.use(express.json());

app.get("/config.js", (req, res) => {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
    const comprefaceUrl = process.env.COMPREFACE_URL || "http://localhost:8000";
    const comprefaceKey = process.env.COMPREFACE_API_KEY || "";

    res.type("application/javascript").send(
        `window.SAFFE_API_URL = ${JSON.stringify(backendUrl)};\n` +
        `window.SAFFE_COMPREFACE_URL = ${JSON.stringify(comprefaceUrl)};\n` +
        `window.SAFFE_COMPREFACE_KEY = ${JSON.stringify(comprefaceKey)};`
    );
});

// Archivos públicos
app.use(express.static("public"));

// Sesiones
app.use(session({

    secret: process.env.SESSION_SECRET || "saffe_frontend",

    resave: false,

    saveUninitialized: false,

    cookie: {

        maxAge: 2 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"

    }

}));

// ------
// RUTAS
// ------

app.use("/", rutas);

// -----------------
// INICIAR SERVIDOR
// -----------------

app.listen(PORT, () => {

    console.log(`Frontend ejecutándose en el puerto ${PORT}`);

});