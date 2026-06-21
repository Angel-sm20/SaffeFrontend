document.addEventListener("DOMContentLoaded", async () => {
    const nombreEl = document.getElementById("nombre-usuario");
    const rangoEl = document.getElementById("rango-usuario");
    const horaEl = document.getElementById("hora-ingreso");

    // Calculamos la hora actual
    const ahora = new Date();
    horaEl.textContent = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Verificación: ¿Hay token guardado?
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html";
        return;
    }

    // 2. Pedimos los datos reales al Backend
    try {
        const respuesta = await fetch("http://localhost:3000/api/perfil", {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}` 
            }
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            // Juntamos la columna nombres y apellidos
            nombreEl.textContent = `${datos.nombres} ${datos.apellidos}`; 
            rangoEl.textContent = datos.rango;   
        } else {
            const errorData = await respuesta.json();
            alert("Error de sesión: " + errorData.mensaje);
            localStorage.removeItem("token");
            window.location.href = "index.html";
        }
    } catch (error) {
        alert("Error de conexión con el servidor.");
        window.location.href = "index.html";
    }
});