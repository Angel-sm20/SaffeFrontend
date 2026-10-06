document.addEventListener("DOMContentLoaded", () => {
    const mascota = document.querySelector(".mascota-ayudante");
    const saludoMascota = mascota?.querySelector(".mascota-saludo");

    if (mascota && saludoMascota) {
        const mensajes = [
            "¡Hola! Estoy aquí para ayudarte",
            "Ingresa tus credenciales para continuar",
            "¡Tu seguridad empieza aquí!",
            "También puedes ingresar con reconocimiento facial",
            "¡Vamos, estás a un paso de entrar!"
        ];
        let mensajeActual = 0;
        let posicionArrastre = null;

        if (
            mascota.querySelector(".mascota-parpado") &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            const programarParpadeo = () => {
                window.setTimeout(() => {
                    mascota.classList.add("parpadeando");
                    window.setTimeout(() => {
                        mascota.classList.remove("parpadeando");
                        programarParpadeo();
                    }, 360);
                }, 4500 + Math.random() * 2500);
            };

            programarParpadeo();
        }

        window.setInterval(() => {
            mensajeActual = (mensajeActual + 1) % mensajes.length;
            saludoMascota.textContent = mensajes[mensajeActual];
            saludoMascota.classList.remove("cambiando");
            void saludoMascota.offsetWidth;
            saludoMascota.classList.add("cambiando");
        }, 12000);

        mascota.addEventListener("pointerdown", (event) => {
            if (event.button !== 0) {
                return;
            }

            const limites = mascota.getBoundingClientRect();
            posicionArrastre = {
                offsetX: event.clientX - limites.left,
                offsetY: event.clientY - limites.top
            };
            mascota.classList.add("arrastrando");
            mascota.setPointerCapture(event.pointerId);
        });

        mascota.addEventListener("pointermove", (event) => {
            if (!posicionArrastre) {
                return;
            }

            const limites = mascota.getBoundingClientRect();
            const izquierda = Math.max(
                0,
                Math.min(event.clientX - posicionArrastre.offsetX, window.innerWidth - limites.width)
            );
            const arriba = Math.max(
                0,
                Math.min(event.clientY - posicionArrastre.offsetY, window.innerHeight - limites.height)
            );

            mascota.style.left = `${izquierda}px`;
            mascota.style.top = `${arriba}px`;
            mascota.style.right = "auto";
            mascota.style.bottom = "auto";
        });

        const terminarArrastre = () => {
            posicionArrastre = null;
            mascota.classList.remove("arrastrando");
        };

        mascota.addEventListener("pointerup", terminarArrastre);
        mascota.addEventListener("pointercancel", terminarArrastre);

        mascota.addEventListener("keydown", (event) => {
            const movimientos = {
                ArrowUp: [0, -20],
                ArrowDown: [0, 20],
                ArrowLeft: [-20, 0],
                ArrowRight: [20, 0]
            };
            const movimiento = movimientos[event.key];

            if (!movimiento) {
                return;
            }

            event.preventDefault();
            const limites = mascota.getBoundingClientRect();
            const izquierda = Math.max(
                0,
                Math.min(limites.left + movimiento[0], window.innerWidth - limites.width)
            );
            const arriba = Math.max(
                0,
                Math.min(limites.top + movimiento[1], window.innerHeight - limites.height)
            );

            mascota.style.left = `${izquierda}px`;
            mascota.style.top = `${arriba}px`;
            mascota.style.right = "auto";
            mascota.style.bottom = "auto";
        });
    }

    // 1. Obtener la URL del backend sin barras inclinadas al final para evitar errores en la ruta
    let rawUrl = window.SAFFE_API_URL || "https://saffe-backend.up.railway.app";
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