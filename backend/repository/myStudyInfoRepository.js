import pool from "../config/db.js";
import { uploadFile } from "../service/uploadS3Service.js";
import fs from "fs";
import path from "path";

export async function postStudyAuth({
  studyId, userId, weekDate, content, file, currentWeek}) {
  let conn;

  try {
    // 1. S3 업로드
    const localFilePath = file.path;
    const s3Key = Date.now() + path.extname(file.originalname);
    const uploadResult = await uploadFile(localFilePath, s3Key);
    const s3Url = uploadResult.Location;

    // 2. DB INSERT
    conn = await pool.getConnection();

    const query = `
            INSERT INTO WEEKLY_STUDIES (study_id, user_id, week_date, week_number, proof_image, content)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    const values = [studyId, userId, weekDate, currentWeek, s3Url, content];

    await conn.execute(query, values);

    // 3. 로컬 파일 삭제
    fs.unlinkSync(localFilePath);

    return { success: true, imageUrl: s3Url };
  } catch (err) {
    console.error("Repository Error:", err);
    throw err;
  } finally {
    if (conn) await conn.release();
  }
}


export async function getmyTeamInfoList(otherUserid, studyRoomId, currentWeek) {
  let conn;
  try {
    conn = await pool.getConnection();

    const query = `
      SELECT *
      FROM WEEKLY_STUDIES
      WHERE study_id = ? AND user_id = ? AND week_number = ?
    `;

    const rows = await conn.query(query, [studyRoomId, otherUserid, currentWeek]);

    return rows;
  } catch (e) {
    console.error("getMyTeamInfoList error:", e);
    return [];
  } finally {
    if (conn) await conn.release();
  }
}


//userid랑 studyid랑 넣어서 STUDY_MEMBERS 테이블에 들어가서 유저가 있으면 true 없으면 false
export async function getStudyRoomInUser(userId, studyRoomId) {
  let conn;

  try {
    conn = await pool.getConnection();

    const [rows] = await conn.query(
      `
        SELECT EXISTS (
          SELECT 1
          FROM STUDY_MEMBERS
          WHERE user_id = ? AND study_id = ?
        ) AS exist
      `,
      [userId, studyRoomId]
    );

    if (Array.isArray(rows)) {
      if (rows.length === 0 || typeof rows[0].exist === "undefined") {
        return false;
      }
      return rows[0].exist === 1;
    }
    if (rows && typeof rows.exist !== "undefined") {
      return rows.exist === 1;
    }

    return false;
  } catch (error) {
    console.error("getStudyRoomInUser error:", error);
    throw error;
  } finally {
    if (conn) await conn.release();
  }
}

export async function getStudyRoomInfo(studyRoomId) {
  let conn;
  try {
    conn = await pool.getConnection();

    console.log(studyRoomId);
    const [rows] = await conn.query(`SELECT * FROM STUDY_ROOMS WHERE id = ?`, [
      Number(studyRoomId),
    ]);

    const proofRows = await conn.query(
      `SELECT * FROM WEEKLY_STUDIES WHERE study_id = ?;`,
      [Number(studyRoomId)]
    );

    return { rows, proofRows };
  } catch (error) {
    console.error("❌ no find Study Room", error);
    throw error;
  } finally {
    if (conn) await conn.release();
  }
}

export async function getStudyRoomMemberProfile(userId, studyRoomId) {
  let conn;
  try {
    conn = await pool.getConnection();

    const rows = await conn.query(
        `
      SELECT 
        u.id AS user_id,
        u.username,
        u.profile_image
      FROM 
        STUDY_MEMBERS sm
      JOIN 
        USERS u ON sm.user_id = u.id
      WHERE 
        sm.study_id = ?
      `,
        [studyRoomId]
    );

    return rows;
  } catch (err) {
    console.error("getStudyRoomMemberProfile error:", err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

export async function CommentStudyMember(studyRoomId, studyMemberId) {
  let conn;
  try {
    conn = await pool.getConnection();

    const comments = await conn.query(
        `
      SELECT 
        *
      FROM COMMENTS
      WHERE study_room_id = ?
        AND study_member_id = ?
        AND create_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      ORDER BY create_at DESC;
      `,
        [studyRoomId, studyMemberId]
    );

    return { comments };
  } catch (error) {
    console.error("❌ 댓글 조회 실패", error);
    throw error;
  } finally {
    if (conn) await conn.release();
  }
}

export async function PostCommentStudyRoom(studyRoomId, studyMemberId, userId, userName, userProfile, content) {
  let conn;
  try {
    conn = await pool.getConnection();

    console.log("DB에 저장할 데이터:", { studyRoomId, studyMemberId, userId, userName, userProfile, content });

    const now = new Date();

    await conn.query(
        `INSERT INTO COMMENTS (user_id, user_name, user_profile, study_room_id, study_member_id, content, create_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, userName, userProfile, studyRoomId, studyMemberId, content, now]
    );

    return { success: true };
  } catch (error) {
    console.error("❌ 댓글 등록 실패", error);
    throw error;
  } finally {
    if (conn) await conn.release();
  }
}

