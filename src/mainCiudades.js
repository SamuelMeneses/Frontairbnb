document.addEventListener("DOMContentLoaded", async () => {
// 🔹 Cargar ciudades en dropdown (seleccionar-ciudad.html)
const dropdownCiudad = document.getElementById("ciudad");

if (dropdownCiudad) {

    fetch("http://localhost:8080/api/reservations/cities")
        .then(response => response.json()) // Convertir respuesta a JSON
        .then(data => {
            data.forEach(opcion => {
                const option = document.createElement("option");
                option.value = opcion.city_name; // Guardar city_name en el value
                option.textContent = opcion.city_name; // Mostrar city_name en el <select>
                dropdownCiudad.appendChild(option); // Agregar al <select>
            });
        })
        .catch(error => console.error("❌ Error al cargar las ciudades:", error));
}
});