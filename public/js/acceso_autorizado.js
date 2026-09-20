document.addEventListener("DOMContentLoaded", async () => {
    // 1. Capturamos los elementos del HTML
    const nombreEl = document.getElementById("nombre-usuario");
    const rangoEl = document.getElementById("rango-usuario"); // Mostrará el "rol"
    const horaEl = document.getElementById("hora-ingreso");
<<<<<<< HEAD
    const token = localStorage.getItem("token");

    horaEl.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    if (!token) {
        window.location.href = "/";
        return;
    }

=======

    // 2. Calculamos y mostramos la hora actual de ingreso
    const ahora = new Date();
    horaEl.textContent = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 3. Verificación de seguridad: ¿Hay token guardado?
    const token = localStorage.getItem("token");
    
    // Si no tiene token (intentó entrar por la URL directo sin login), lo devolvemos
    if (!token) {
        window.location.href = "index.html";
        return; 
    }

    // 4. Pedimos los datos del usuario autorizado al Backend
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
    try {
        // Asegúrate de que esta ruta exista en tu backend para devolver los datos del usuario logueado
        const respuesta = await fetch("http://localhost:3000/api/perfil", {
<<<<<<< HEAD
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || "Sesión inválida");
=======
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            
            // Juntamos nombre y apellido exactos como vienen de tu DB
            nombreEl.textContent = `${datos.nombre} ${datos.apellido}`; 
            
            // Asignamos el rol (que equivale al rango en tu sistema)
            rangoEl.textContent = datos.rol;   
            
        } else {
            // Si el token expiró o es inválido, borramos todo y lo sacamos
            const errorData = await respuesta.json();
            alert("Acceso denegado o sesión expirada: " + (errorData.mensaje || "Token inválido"));
            localStorage.removeItem("token");
            window.location.href = "index.html";
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
        }

        const datos = await respuesta.json();
        nombreEl.textContent = `${datos.nombre} ${datos.apellido}`.trim();
        rangoEl.textContent = datos.rango || "Sin rango";
    } catch (error) {
<<<<<<< HEAD
        console.error("Error de sesión:", error);
        localStorage.removeItem("token");
        window.location.href = "/";
=======
        console.error("Error consultando al servidor:", error);
        alert("Error de conexión con el servidor. Revisa que el backend esté encendido.");
        window.location.href = "index.html";
>>>>>>> 2b34021d83839b54ff5cdb06a2271eea0af7f87f
    }
});
