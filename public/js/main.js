document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = window.SAFFE_API_URL || "http://localhost:3000";
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const documento = document.getElementById("documento").value.trim();
        const contraseña = document.getElementById("password").value;

        try {
            const respuesta = await fetch(`${apiUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documento, contraseña })
            });
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                alert(resultado.mensaje || "Credenciales incorrectas");
                return;
            }

            localStorage.setItem("token", resultado.token);
            window.location.href = "/acceso_autorizado";
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el Backend.");
        }
    });
});
