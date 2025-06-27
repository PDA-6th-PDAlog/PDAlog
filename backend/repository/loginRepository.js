import pool from "../config/db.js";

export async function findByEmail(email) {
  try {
    console.log("로그인레포 들어옴");
    console.log(email);
    const [rows] = await pool.execute(`SELECT * FROM USERS WHERE email = ?`, [
      email,
    ]);
    console.log("row", rows);

    if (rows.length === 0) {
      return null;
    }

    return rows;
  } catch (err) {
    console.error("repository error:", err);
    throw err;
  }
}
