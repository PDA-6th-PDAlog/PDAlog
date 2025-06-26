import pool from "../config/db.js";

export async function create(roomData) {
  const {
    title,
    description,
    start_date,
    end_date,
    penalty_amount,
    host_id,
    weekly_required_count,
  } = roomData;

  try {
    const result = await pool.execute(
      `INSERT INTO STUDY_ROOMS 
        (title, description, start_date, end_date, penalty_amount, host_id, weekly_required_count)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        start_date,
        end_date,
        penalty_amount,
        host_id,
        weekly_required_count,
      ]
    );

    return {
      id: Number(result.insertId),
      ...roomData,
    };
  } catch (err) {
    console.error("repository error:", err);
    throw err;
  }
}
