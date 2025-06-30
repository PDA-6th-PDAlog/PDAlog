const cron = require('node-cron');
const db = require('../config/db'); // mysql2 pool 또는 connection 객체
require('dotenv').config();

// ✅ 매주 일요일 자정(00:00)에 실행
cron.schedule('0 0 * * 0', async () => {
    console.log('[스케줄러] 매주 썸네일 업데이트 시작');

    const query = `
        WITH study_weeks AS (
            SELECT
                id AS study_room_id,
                FLOOR(DATEDIFF(CURDATE(), start_date) / 7) + 1 AS current_week
            FROM STUDY_ROOMS
            WHERE end_date >= CURDATE()
        ),
             auth_counts AS (
                 SELECT
                     sr.id AS study_room_id,
                     u.id AS user_id,
                     u.username,
                     u.profile_image,
                     IFNULL(COUNT(ws.id), 0) AS user_auth_count
                 FROM STUDY_ROOMS sr
                          JOIN study_weeks sw ON sr.id = sw.study_room_id
                          JOIN STUDY_MEMBERS sm ON sm.study_id = sr.id
                          JOIN USERS u ON u.id = sm.user_id
                          LEFT JOIN WEEKLY_STUDIES ws
                                    ON ws.study_id = sr.id
                                        AND ws.user_id = sm.user_id
                                        AND ws.week_number = sw.current_week
                 GROUP BY sr.id, u.id
             ),
             ranked_auths AS (
                 SELECT *,
                        ROW_NUMBER() OVER (PARTITION BY study_room_id ORDER BY user_auth_count ASC, user_id ASC) AS rnk
                 FROM auth_counts
             )
        SELECT
            study_room_id,
            user_id,
            username,
            profile_image,
            user_auth_count
        FROM ranked_auths
        WHERE rnk = 1
        ORDER BY study_room_id;
    `;

    try {
        const [rows] = await db.query(query);

        for (const row of rows) {
            const updateQuery = `
                UPDATE STUDY_ROOMS
                SET thumbnail_url = ?
                WHERE id = ?
            `;
            await db.execute(updateQuery, [row.profile_image, row.study_room_id]);

            console.log(`🟢 썸네일 업데이트 완료: study_room_id=${row.study_room_id}, profile_image=${row.profile_image}`);
        }

        console.log('✅ [스케줄러] 썸네일 전체 업데이트 완료');
    } catch (error) {
        console.error('❌ [스케줄러 오류]', error);
    }
});
