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

export async function findById(studyId) {
  // 스터디룸 기본 정보 조회
  const [rows, fields] = await pool.execute(
    `SELECT id, title, description, thumbnail_url, start_date, end_date, penalty_amount, weekly_required_count
   FROM STUDY_ROOMS
   WHERE id = ?`,
    [studyId]
  );

  if (!rows || rows.length === 0) return null;
  const study = rows;

  // 참여 멤버 조회
  const members = await pool.execute(
    `SELECT u.id, u.username AS nickname, u.profile_image
     FROM STUDY_MEMBERS sm
     JOIN USERS u ON sm.user_id = u.id
     WHERE sm.study_id = ?`,
    [studyId]
  );

  return {
    ...study,
    members,
  };
}

export async function insertUserToStudy(studyId, userId) {
  console.log("여까지 옴");
  try {
    await pool.execute(
      `INSERT INTO STUDY_MEMBERS (study_id, user_id) VALUES (?, ?)`,
      [studyId, userId]
    );
    console.log(
      `[REPOSITORY] user_id ${userId}가 study_id ${studyId}에 참가 완료`
    );
  } catch (err) {
    console.error("[REPOSITORY ERROR - insertUserToStudy]", err);
    throw err;
  }
}
