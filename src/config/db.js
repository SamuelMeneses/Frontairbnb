import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "alquiler_apartamentos",
    password: "postgres",
    port: 5432, // Puerto por defecto de PostgreSQL
});

export default pool;