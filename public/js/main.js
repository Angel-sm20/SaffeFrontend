document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener la URL del backend sin barras inclinadas al final para evitar errores en la ruta
    let rawUrl = window.SAFFE_API_URL || "https://saffebackend-production.up.railway.app";
    const apiUrl = rawUrl.replace(/\/+$/, "");

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const documentoInput = document.getElementById("documento");
        const passwordInput = document.getElementById("password");

        if (!documentoInput || !passwordInput) {
            alert("Error en el formulario: no se encontraron los campos requeridos.");
            return;
        }

        const documento = documentoInput.value.trim();
        const contraseña = passwordInput.value;

        if (!documento || !contraseña) {
            alert("Por favor, ingrese su documento y contraseña.");
            return;
        }

        try {
            // 2. Petición POST al endpoint del backend desplegado en Railway
            const respuesta = await fetch(`${apiUrl}/api/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ documento, contraseña })
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                alert(resultado.mensaje || "Credenciales incorrectas");
                return;
            }

            // 3. Almacenar el token e ingresar al sistema
            if (resultado.token) {
                localStorage.setItem("token", resultado.token);
            }
            
            window.location.href = "/acceso_autorizado";

        } catch (error) {
            console.error("Error de conexión con el backend:", error);
            alert("No se pudo conectar con el Backend. Verifique la conexión.");
        }
    });
});