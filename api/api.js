import axios from "axios";

const API_URL = "http://localhost:8080/api/reservations";

export const getHealthCheck = async () => {
    try {
        const response = await axios.get(`${API_URL}/health`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el estado del backend:", error);
        return null;
    }
};