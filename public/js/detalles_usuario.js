document.addEventListener("DOMContentLoaded", async () => {
    const cuerpoTabla = document.getElementById("cuerpo-tabla");
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/";
        return;
    }

    try {
        const respuesta = await fetch("http://localhost:3000/api/historial", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || "Error al obtener historial");
        }

        const historial = await respuesta.json();
        cuerpoTabla.innerHTML = "";

        if (historial.length === 0) {
            cuerpoTabla.innerHTML = "<tr><td colspan='6'>No hay registros de acceso aún.</td></tr>";
            return;
        }

        historial.forEach((acceso) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${acceso.documento || "N/A"}</td>
                <td>${acceso.nombre || "N/A"} ${acceso.apellido || ""}</td>
                <td>${acceso.hora || "--:--"}</td>
                <td>${acceso.dia || "--"}</td>
                <td>${acceso.mes || "--"}</td>
                <td>${acceso.anio || "----"}</td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al obtener historial:", error);
        cuerpoTabla.innerHTML = `<tr><td colspan='6'>Error: ${error.message}</td></tr>`;
    }
});
