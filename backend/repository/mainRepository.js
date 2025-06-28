const pool = require("../config/db.js");

async function findAll() {
  const [rows] = await pool.execute(`
    SELECT id, title, description, thumbnail_url, start_date, end_date, penalty_amount, weekly_required_count
    FROM STUDY_ROOMS
    ORDER BY id DESC
  `);
  return rows;
}

const getMyStudyRooms = async (userId) => {
  const [rows] = await pool.query(
    `SELECT sr.* 
     FROM STUDY_ROOMS sr 
     JOIN STUDY_MEMBERS sm ON sr.id = sm.study_id 
     WHERE sm.user_id = ?`,
    [userId]
  );
  return rows;
};

const getWeeklyFines = async (startDate, endDate) => {
  console.log("🔥 Repository 진입 startDate:", startDate, endDate);

  try {
    const rows = await pool.query(
      `
      SELECT
          sr.id AS study_id,
          sr.title AS study_title,
          sm.member_count,
          sr.weekly_required_count,
          COALESCE(ws.certify_count, 0) AS certify_count,
          sr.penalty_amount,
          ((sm.member_count * sr.weekly_required_count) - COALESCE(ws.certify_count, 0)) 
              * sr.penalty_amount AS total_penalty
      FROM
          STUDY_ROOMS sr
      JOIN (
          SELECT
              study_id,
              COUNT(*) AS member_count
          FROM
              STUDY_MEMBERS
          GROUP BY
              study_id
      ) sm
          ON sr.id = sm.study_id
      LEFT JOIN (
          SELECT
              study_id,
              COUNT(*) AS certify_count
          FROM
              WEEKLY_STUDIES
          WHERE
              week_date BETWEEN ? AND ?
          GROUP BY
              study_id
      ) ws
          ON sr.id = ws.study_id;
      `,
      [startDate, endDate]
    );

    // BigInt → Number 변환
    const normalizedRows = rows.map((row) => ({
      ...row,
      member_count: Number(row.member_count),
      weekly_required_count: Number(row.weekly_required_count),
      certify_count: Number(row.certify_count),
      penalty_amount: Number(row.penalty_amount),
      total_penalty: Number(row.total_penalty),
    }));

    console.log("✅ Repository 정상 rows:", normalizedRows);
    return normalizedRows;
  } catch (err) {
    console.error("[ERROR] Repository 쿼리 에러:", err);
    throw err;
  }
};

module.exports = {
  findAll,
  getMyStudyRooms,
  getWeeklyFines,
};
