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
    thumbnail_url,
  } = roomData;

  try {
    // 스터디룸 생성
    const result = await pool.execute(
      `INSERT INTO STUDY_ROOMS 
        (title, description, thumbnail_url, start_date, end_date, penalty_amount, host_id, weekly_required_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        thumbnail_url || null,
        start_date,
        end_date,
        penalty_amount,
        host_id,
        weekly_required_count,
      ]
    );

    const studyId = result.insertId;

    // 2. 방장 STUDY_MEMBERS에 등록
    await pool.execute(
      `INSERT INTO STUDY_MEMBERS (user_id, study_id)
       VALUES (?, ?)`,
      [host_id, studyId]
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
