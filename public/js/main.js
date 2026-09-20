document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const documento = document.getElementById("documento").value.trim();
            const contraseña = document.getElementById("password").value;

            try {
                const respuesta = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        documento,
                        contraseña
                    })
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    // Si el backend te devuelve un token o guardas sesión
                    if (resultado.token) {
                        localStorage.setItem("token", resultado.token);
                    }
                    window.location.href = "/acceso_autorizado";
                } else {
                    alert(resultado.mensaje || "Credenciales incorrectas");
                    // Opcional: si prefieres no redirigir de una vez al denegado sino mostrar una alerta:
                    // window.location.href = "/acceso_denegado";
                }

            } catch (error) {
                console.error("Error de conexión:", error);
                alert("No se pudo conectar con el Backend (puerto 3000).");
            }
        });
    }
});