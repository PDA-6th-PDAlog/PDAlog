import pool from "../config/db.js";

export async function create(userData) {
  const { username, email, passwd, profile_image } = userData;

  try {
    const result = await pool.execute(
      `INSERT INTO USERS 
        (username, email, passwd, profile_image)
       VALUES (?, ?, ?, ?)`,
      [username, email, passwd, profile_image || null]
    );

    return {
      id: Number(result.insertId),
      ...userData,
    };
  } catch (err) {
    console.error("repository error:", err);
    throw err;
  }
}
