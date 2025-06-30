import pool from "../config/db.js";
import bcrypt from "bcrypt";

export async function create(userData) {
  const { username, email, passwd, profile_image} = userData;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);

    const result = await pool.execute(
      `INSERT INTO USERS 
        (username, email, passwd, profile_image)
       VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, profile_image || null]
    );

    return {
      id: Number(result.insertId),
      username,
      email,
      profile_image,
    };
  } catch (err) {
    console.error("repository error:", err);
    throw err;
  }
}
