document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const correo = document.getElementById("user").value;

        const contraseña = document.getElementById("password").value;

        try {

            const respuesta = await fetch("http://localhost:3000/api/login", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    correo,
                    contraseña

                })

            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {

                localStorage.setItem("token", resultado.token);

                window.location.href = "/menu";

            } else {

                alert(resultado.mensaje);

                window.location.href = "/acceso_denegado";

            }

        } catch (error) {

            console.error(error);

            alert("No se pudo conectar con el Backend.");

        }

    });

});