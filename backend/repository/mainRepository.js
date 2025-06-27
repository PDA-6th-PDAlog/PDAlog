const pool = require("../config/db");

async function findAll() {
  const rows = await pool.execute(`
    SELECT id, title, description, thumbnail_url, start_date, end_date, penalty_amount, weekly_required_count
    FROM STUDY_ROOMS
    ORDER BY id DESC
  `);
  console.log("🔥 findAll rows 확인:", rows[0]);
  console.log("🔥 typeof rows:", typeof rows); // object
  console.log("🔥 findAll rows 확인:", rows); // ← 진짜 배열인지 확인
  return rows;
}

const getMyStudyRooms = async (userId) => {
  const rows = await pool.query(
    `SELECT sr.* 
     FROM STUDY_ROOMS sr 
     JOIN STUDY_MEMBERS sm ON sr.id = sm.study_id 
     WHERE sm.user_id = ?`,
    [userId]
  );
  console.log("🔥 getMyStudyRooms rows 확인: repository", rows);
  return rows;
};

module.exports = {
  findAll,
  getMyStudyRooms,
};
