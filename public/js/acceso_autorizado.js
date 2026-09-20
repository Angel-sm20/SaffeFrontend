document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = window.SAFFE_API_URL || "https://saffe-backend.up.railway.app";
    const nombreEl = document.getElementById("nombre-usuario");
    const rangoEl = document.getElementById("rango-usuario");
    const horaEl = document.getElementById("hora-ingreso");
    const token = localStorage.getItem("token");

    horaEl.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    if (!token) {
        window.location.href = "/";
        return;
    }

    try {
        const respuesta = await fetch(`${apiUrl}/api/perfil`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || "Sesión inválida");
        }

        const datos = await respuesta.json();
        nombreEl.textContent = `${datos.nombre} ${datos.apellido}`.trim();
        rangoEl.textContent = datos.rango || "Sin rango";
    } catch (error) {
        console.error("Error de sesión:", error);
        localStorage.removeItem("token");
        window.location.href = "/";
    }
});
