document.addEventListener("DOMContentLoaded", async () => {
    const apartamentosContainer = document.getElementById("apartamentos");
    // 🔹 Cargar apartamentos en seleccionar-apartamentos.html
    const cityName = localStorage.getItem("ciudadSeleccionada"); // Recuperar la ciudad
    if (!cityName) {
        alert("⚠️ No se seleccionó ninguna ciudad.");
        window.location.href = "seleccionar-ciudad.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/reservations/apartments-by-city/${cityName}`);
        if (!response.ok) throw new Error(`Error en la respuesta: ${response.statusText}`);

        const data = await response.json();

        // Insertar los apartamentos en la página
        apartamentosContainer.innerHTML = data.map(apartamento => `
            <div class="apartamento">
            <div>
                <img class="imagen" src="${apartamento.image_default || 'https://via.placeholder.com/300x200'}" alt="${apartamento.title}">
            </div>
                <h3>${apartamento.title}</h3>
                <p><strong>Dirección:</strong> ${apartamento.address}</p>
                <p><strong>Descripción:</strong> ${apartamento.description}</p>
                <p><strong>Capacidad:</strong> ${apartamento.capacity} personas</p>
                <p><strong>Precio por noche:</strong> $${apartamento.price_per_night} USD</p>
                <p><strong>Amenidades:</strong> ${apartamento.amenities}</p>
                <p><strong>Reglas:</strong> ${apartamento.rules}</p>
                <p><strong>Estado:</strong> ${apartamento.status}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("❌ Error al obtener apartamentos:", error);
        apartamentosContainer.innerHTML = "<p>Error al cargar los apartamentos.</p>";
    }
});