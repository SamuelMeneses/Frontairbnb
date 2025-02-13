document.addEventListener("DOMContentLoaded", async () => {

    const idApto = localStorage.getItem("aptoSeleccionado"); // 🔹 Obtener el ID guardado

    if (!idApto) {
        alert("⚠️ No se seleccionó un apartamento.");
        window.location.href = "seleccionar-apartamentos-PorCiudad.html";
        return;
    }

    console.log(`Obteniendo datos de: http://localhost:8080/api/reservations/apartment-by-id/${idApto}`);

    try {
        const response = await fetch(`http://localhost:8080/api/reservations/apartment-by-id/${idApto}`);
        if (!response.ok) throw new Error(`Error en la respuesta: ${response.statusText}`);

        const apto = await response.json();

        const imagenPrincipal = document.getElementById("imagen-principal");
        const galeria = document.getElementById("imagenes-secundarias");

        // ✅ Guarda la imagen original
        const imagenOriginal = apto.image_default || "https://via.placeholder.com/600x400";
        imagenPrincipal.src = imagenOriginal;

        document.getElementById("titulo").textContent = apto.title;
        document.getElementById("descripcion").textContent = apto.description;
        document.getElementById("capacidad").textContent = apto.capacity;
        document.getElementById("precio").textContent = apto.price_per_night;

        if (!galeria) {
            console.error("❌ Error: No se encontró el contenedor de imágenes secundarias.");
        } else {
            // Limpia la galería antes de agregar imágenes
            galeria.innerHTML = "";

            if (Array.isArray(apto.url) && apto.url.length > 0) {
                apto.url.forEach(img => {
                    const imagen = document.createElement("img");
                    imagen.src = img;
                    imagen.alt = "Imagen del apartamento";
                    imagen.classList.add("miniatura");

                    // ✅ Cambiar la imagen principal al hacer clic
                    imagen.addEventListener("click", () => {
                        imagenPrincipal.src = img;
                    });

                    galeria.appendChild(imagen);
                });
            } else {
                galeria.innerHTML = "<p>No hay imágenes disponibles.</p>";
            }
        }

        // ✅ Agregar botón para restaurar la imagen principal
        const btnRestaurar = document.createElement("button");
        btnRestaurar.textContent = "Restaurar Imagen Principal";
        btnRestaurar.classList.add("boton-reserva");
        btnRestaurar.style.marginTop = "10px";
        btnRestaurar.addEventListener("click", () => {
            imagenPrincipal.src = imagenOriginal;
        });

        document.querySelector(".container").appendChild(btnRestaurar);

    } catch (error) {
        console.error("❌ Error al obtener detalles del apartamento:", error);
        document.body.innerHTML = "<p>Error al cargar los detalles.</p>";
    }
});