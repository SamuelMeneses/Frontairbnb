document.addEventListener("DOMContentLoaded", async () => {

    // 🔹 Login
    const form = document.getElementById("login-form");

    if (form) {

        const message = document.getElementById("message");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const user_email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:8080/api/reservations/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({user_email, password})
                });

                console.log("🔍 Respuesta del backend:", response);
                if (response.status === 204) {
                    window.location.href = "seleccionar-ciudad.html"; // 🔴 Redirige al usuario
                } else {
                    const data = await response.json();
                    message.textContent = "❌ " + (data.error || "Error desconocido.");
                    message.style.color = "red";
                }

            } catch (error) {
                console.error("❌ Error en la solicitud:", error);
                message.textContent = "❌ Error en el servidor.";
                message.style.color = "red";
            }
        });
    }
});