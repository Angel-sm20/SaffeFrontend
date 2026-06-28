document.addEventListener("DOMContentLoaded", async () => {
    // 1. Capturamos los elementos del HTML
    const nombreEl = document.getElementById("nombre-usuario");
    const rangoEl = document.getElementById("rango-usuario"); // Mostrará el "rol"
    const horaEl = document.getElementById("hora-ingreso");

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
    try {
        // Asegúrate de que esta ruta exista en tu backend para devolver los datos del usuario logueado
        const respuesta = await fetch("http://localhost:3000/api/perfil", {
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
        }
    } catch (error) {
        console.error("Error consultando al servidor:", error);
        alert("Error de conexión con el servidor. Revisa que el backend esté encendido.");
        window.location.href = "index.html";
    }
});