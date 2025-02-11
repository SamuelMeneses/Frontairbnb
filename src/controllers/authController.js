import bcrypt from 'bcrypt';
import pool from '../config/db.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.json({ message: "Login exitoso", token: "fake-jwt-token" });
            } else {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }
        } else {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};