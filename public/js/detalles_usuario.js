document.addEventListener("DOMContentLoaded", () => {
    const cuerpoTabla = document.getElementById("cuerpo-tabla");

    // Simulamos una base de datos de accesos recientes (Para cumplir Evidencia 2)
    const historialAccesos = [
        { usuario: "102345678", hora: "08:15", dia: "13", mes: "05", anio: "2026" },
        { usuario: "109876543", hora: "09:30", dia: "13", mes: "05", anio: "2026" },
        { usuario: "Admin_01", hora: "14:45", dia: "12", mes: "05", anio: "2026" },
        { usuario: "753159842", hora: "16:20", dia: "11", mes: "05", anio: "2026" },
        { usuario: "Admin_02", hora: "07:05", dia: "10", mes: "05", anio: "2026" }
    ];

    // Función que lee los datos y crea las filas HTML
    function cargarTabla() {
        cuerpoTabla.innerHTML = ""; // Limpiamos la tabla por seguridad

        if (historialAccesos.length === 0) {
            cuerpoTabla.innerHTML = "<tr><td colspan='5'>No hay registros de acceso recientes.</td></tr>";
            return;
        }

        historialAccesos.forEach(acceso => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${acceso.usuario}</td>
                <td>${acceso.hora}</td>
                <td>${acceso.dia}</td>
                <td>${acceso.mes}</td>
                <td>${acceso.anio}</td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    }

    // Ejecutamos la función apenas cargue la página
    cargarTabla();
});