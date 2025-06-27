import pool from "../config/db.js";

export async function findByEmail(email) {
  try {
    const [rows] = await pool.execute(`SELECT * FROM USERS WHERE email = ?`, [
      email,
    ]);

    if (rows.length === 0) {
      return null;
    }

    return rows;
  } catch (err) {
    console.error("repository error:", err);
    throw err;
  }
}
