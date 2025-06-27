import pool from "../config/db.js"; // 실제 경로에 맞게 조정

export async function findAll() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM test");
    return rows;
  } finally {
    if (conn) await conn.release();
  }
}
