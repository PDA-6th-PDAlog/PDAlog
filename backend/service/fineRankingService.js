import pool from "../config/db.js";
import dayjs from "dayjs";

export async function calculateFineRanking() {
  console.log("🚀 [Service] fine-ranking 계산 시작");

  try {
    // 모든 user들 가져오기
    const users = await pool.execute(`
      SELECT id, username, email, profile_image FROM USERS
    `);

    const result = [];

    // user들에 대한 참여 스터디들 가져오기
    for (const user of users) {
      console.log("현재 유저 id");
      console.log(user.id);

      const studies = await pool.execute(
          `SELECT study_id FROM STUDY_MEMBERS WHERE user_id = ?`,
          [user.id]
      );
      console.log("참여한 스터디들 ");
      let total_fine = 0;

      for (const study of studies) {
        console.log("스터디: ", study.study_id);

        const study_info = await pool.execute(
            `SELECT penalty_amount, start_date, end_date, weekly_required_count  FROM STUDY_ROOMS WHERE id = ?`,
            [study.study_id]
        );

        // console.log("스터디 정보: ", study_info[0]);
        const today = dayjs();
        const endDate = dayjs(study_info[0].end_date);
        const lastDate = today.isBefore(endDate) ? today : endDate;
        const startDate = dayjs(study_info[0].start_date);

        const weeksPassed = Math.floor(lastDate.diff(startDate, "day") / 7);
        console.log("🗓️ 주 수:", weeksPassed);

        // 인증한 주차 수 계산 (유저 - 스터디)
        const countPassWeek = await pool.execute(
            `SELECT count(*) as count FROM WEEKLY_STUDIES WHERE study_id = ? and user_id = ? `,
            [study.study_id, user.id]
        );
        const certifiedWeeks = Number(countPassWeek[0].count);
        console.log("인증완료 주차 수 :", certifiedWeeks);

        total_fine +=
            (weeksPassed - certifiedWeeks) * study_info[0].penalty_amount;
      }
      console.log("유저 별 총 벌금 :", total_fine);

      result.push({
        username: user.username,
        email: user.email,
        profileImage: user.profile_image,
        totalPenalty: total_fine,
      });
    }
    result.sort((a, b) => b.totalPenalty - a.totalPenalty);
    return result;
  } catch (err) {
    console.error("안된다 안돼애~~~", err);
    throw err;
  }
}