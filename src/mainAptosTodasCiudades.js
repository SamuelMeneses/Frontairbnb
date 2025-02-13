document.addEventListener("DOMContentLoaded", async () => {

    const apartamentosContainer = document.getElementById("apartamentos");

    // 🔹 Recuperar la ciudad seleccionada
    const cityName = localStorage.getItem("ciudadSeleccionada"); // Recuperar la ciudad
    if (!cityName) {
        alert("⚠️ No se seleccionó ninguna ciudad.");
        window.location.href = "seleccionar-ciudad.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/reservations/apartments`);
        if (!response.ok) throw new Error(`Error en la respuesta: ${response.statusText}`);

        const data = await response.json();

        // Insertar los apartamentos en la página
        apartamentosContainer.innerHTML = data.map(apartamento => `
             <div class="apartamento">
                 <div>
                     <img class="imagen" src="${apartamento.image_default || 'https://via.placeholder.com/300x200'}" 
                          alt="${apartamento.title}"
                          data-id="${apartamento.id}"> <!-- Agregar un atributo data-id -->
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

        // 🔹 Agregar evento click a cada imagen
        document.querySelectorAll(".imagen").forEach(img => {
            img.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id"); // Obtener el ID del apartamento
                localStorage.setItem("aptoSeleccionado", id); // Guardar en localStorage
                window.location.href = "detalle-apartamento.html"; // Redirigir
            });
        });

    } catch (error) {
        console.error("❌ Error al obtener apartamentos:", error);
        apartamentosContainer.innerHTML = "<p>Error al cargar los apartamentos.</p>";
    }
});