import pool from '../config/db.js';
import { uploadFile } from '../service/uploadS3Service.js';
import fs from 'fs';
import path from 'path';

export async function postStudyAuth({ studyId, userId, weekDate, content, file }) {
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
            INSERT INTO WEEKLY_STUDIES (study_id, user_id, week_date, proof_image, content)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [studyId, userId, weekDate, s3Url, content];

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
