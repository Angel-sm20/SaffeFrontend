document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = (window.SAFFE_API_URL || "https://saffe-backend.up.railway.app")
        .replace(/\/+$/, "");
    const recoverForm = document.getElementById("recoverForm");
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    const documentoInput = document.getElementById("documento");
    const codigoInput = document.getElementById("codigo");
    const btnEnviarCodigo = document.getElementById("btnEnviarCodigo");
    const btnReenviarCodigo = document.getElementById("btnReenviarCodigo");
    const btnConfirmarCodigo = document.getElementById("btnConfirmarCodigo");
    const recoverStatus = document.getElementById("recoverStatus");
    const resetStatus = document.getElementById("resetStatus");
    const resetPasswordDialog = document.getElementById("resetPasswordDialog");
    const btnCancelarCambio = document.getElementById("btnCancelarCambio");
    const btnGuardarContrasena = document.getElementById("btnGuardarContrasena");
    let tokenRecuperacion = "";
    let intervaloReenvio;

    const iniciarEsperaReenvio = () => {
        let segundosRestantes = 60;
        btnReenviarCodigo.disabled = true;
        btnReenviarCodigo.textContent = `Reenviar en ${segundosRestantes} s`;
        window.clearInterval(intervaloReenvio);
        intervaloReenvio = window.setInterval(() => {
            segundosRestantes -= 1;
            if (segundosRestantes <= 0) {
                window.clearInterval(intervaloReenvio);
                btnReenviarCodigo.disabled = false;
                btnReenviarCodigo.textContent = "¿No recibiste el código? Reenviar";
                return;
            }
            btnReenviarCodigo.textContent = `Reenviar en ${segundosRestantes} s`;
        }, 1000);
    };

    const solicitarCodigo = async (boton) => {
        const documento = documentoInput.value.trim();
        if (!documento) {
            recoverStatus.textContent = "Ingresa tu documento para solicitar el código.";
            documentoInput.focus();
            return;
        }

        boton.disabled = true;
        boton.textContent = "Enviando...";
        recoverStatus.textContent = "";
        let solicitudExitosa = false;

        try {
            const respuesta = await fetch(`${apiUrl}/api/recuperacion/codigo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documento }),
                signal: AbortSignal.timeout(20000)
            });
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || "No se pudo enviar el código.");
            }

            documentoInput.readOnly = true;
            codigoInput.disabled = false;
            btnConfirmarCodigo.disabled = false;
            btnReenviarCodigo.hidden = false;
            recoverStatus.textContent = resultado.mensaje;
            codigoInput.focus();
            solicitudExitosa = true;
        } catch (error) {
            recoverStatus.textContent = error.name === "TimeoutError"
                ? "El servidor tardó demasiado en procesar la solicitud. Inténtalo de nuevo."
                : error.message;
            boton.disabled = false;
        } finally {
            if (solicitudExitosa) {
                iniciarEsperaReenvio();
                if (boton === btnEnviarCodigo) {
                    boton.textContent = "Código enviado";
                }
            } else {
                boton.textContent = boton === btnReenviarCodigo
                    ? "¿No recibiste el código? Reenviar"
                    : "Enviar código";
            }
        }
    };

    btnEnviarCodigo.addEventListener("click", () => solicitarCodigo(btnEnviarCodigo));
    btnReenviarCodigo.addEventListener("click", () => solicitarCodigo(btnReenviarCodigo));

    recoverForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        btnConfirmarCodigo.disabled = true;
        recoverStatus.textContent = "Verificando código...";

        try {
            const respuesta = await fetch(`${apiUrl}/api/recuperacion/verificar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    documento: documentoInput.value.trim(),
                    codigo: codigoInput.value.trim()
                })
            });
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || "No se pudo verificar el código.");
            }

            tokenRecuperacion = resultado.token;
            recoverStatus.textContent = "Código confirmado. Crea tu nueva contraseña.";
            resetPasswordForm.reset();
            resetStatus.textContent = "";
            resetPasswordDialog.showModal();
        } catch (error) {
            recoverStatus.textContent = error.message;
        } finally {
            btnConfirmarCodigo.disabled = false;
        }
    });

    btnCancelarCambio.addEventListener("click", () => resetPasswordDialog.close());

    resetPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const contrasena = document.getElementById("nuevaContrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;

        if (contrasena.length < 8) {
            resetStatus.textContent = "La contraseña debe tener al menos 8 caracteres.";
            return;
        }
        if (new TextEncoder().encode(contrasena).length > 72) {
            resetStatus.textContent = "La contraseña no puede superar los 72 bytes.";
            return;
        }
        if (contrasena !== confirmarContrasena) {
            resetStatus.textContent = "Las contraseñas no coinciden.";
            return;
        }

        btnGuardarContrasena.disabled = true;
        resetStatus.textContent = "Actualizando contraseña...";

        try {
            const respuesta = await fetch(`${apiUrl}/api/recuperacion/restablecer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    documento: documentoInput.value.trim(),
                    token: tokenRecuperacion,
                    contrasena
                })
            });
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || "No se pudo actualizar la contraseña.");
            }

            tokenRecuperacion = "";
            resetPasswordDialog.close();
            recoverStatus.textContent = `${resultado.mensaje} Ya puedes iniciar sesión.`;
            recoverForm.reset();
            documentoInput.readOnly = false;
            codigoInput.disabled = true;
            btnConfirmarCodigo.disabled = true;
            btnEnviarCodigo.disabled = false;
            btnEnviarCodigo.textContent = "Enviar código";
            window.clearInterval(intervaloReenvio);
            btnReenviarCodigo.disabled = false;
            btnReenviarCodigo.hidden = true;
        } catch (error) {
            resetStatus.textContent = error.message;
        } finally {
            btnGuardarContrasena.disabled = false;
        }
    });
});
