document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = window.SAFFE_API_URL || "https://saffe-backend.up.railway.app";
    const form = document.getElementById("form-registro");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            nombre: document.getElementById("nombre").value.trim(),
            apellido: document.getElementById("apellidos").value.trim(),
            documento: document.getElementById("cedula").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            contraseña: document.getElementById("password").value,
            rango: document.getElementById("rango").value
        };

        try {
            const respuesta = await fetch(`${apiUrl}/api/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.error || resultado.mensaje || "Error al registrar");
            }

            alert("Registro exitoso.");
            form.reset();
        } catch (error) {
            console.error("Error de registro:", error);
            alert(`Error: ${error.message}`);
        }
    });
});
