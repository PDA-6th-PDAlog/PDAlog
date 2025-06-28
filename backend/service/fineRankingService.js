import pool from "../config/db.js";
import dayjs from "dayjs";

/**
 * 스터디 시작 요일 기준으로
 * 지난 주 스터디 기간 (시작일 ~ 종료일) 계산해주는 함수
 *
 * @param {number} startWeekday - 스터디 시작 요일 (0=일, 1=월, … 6=토)
 * @param {Date} today - 기준일
 * @returns {Object} { startDate, endDate }
 */
function getLastWeekRange(startWeekday, today) {
  // 이번 주의 startWeekday 날짜 계산
  const weekdayToday = today.day();
  let diff = weekdayToday - startWeekday;
  if (diff < 0) diff += 7;
  const thisWeekStart = today.subtract(diff, "day");

  // 오늘이 startWeekday보다 이전이면 → 지난 주 아님, 지지난주 범위
  let startDate, endDate;

  if (weekdayToday < startWeekday) {
    // 지지난 주 start date ~ 지난 주 end date
    const lastWeekStart = thisWeekStart.subtract(7, "day");
    const lastWeekEnd = thisWeekStart.subtract(1, "day");
    startDate = lastWeekStart;
    endDate = lastWeekEnd;
  } else {
    // 지난 주 start date ~ 이번 주 start date -1
    const lastWeekStart = thisWeekStart.subtract(7, "day");
    const lastWeekEnd = thisWeekStart.subtract(1, "day");
    startDate = lastWeekStart;
    endDate = lastWeekEnd;
  }

  return {
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
  };
}

export async function calculateFineRanking() {
  try {
    // 모든 user들 가져오기
    const [users] = await pool.execute(`
      SELECT id, username, email, profile_image FROM USERS
    `);

    const result = [];

    for (const user of users) {
      console.log("현재 유저 id:", user.id);

      const [studies] = await pool.execute(
        `SELECT study_id FROM STUDY_MEMBERS WHERE user_id = ?`,
        [user.id]
      );

      let total_fine = 0;

      for (const study of studies) {
        const [studyInfoRows] = await pool.execute(
          `SELECT penalty_amount, start_date, end_date, weekly_required_count, start_weekday 
           FROM STUDY_ROOMS 
           WHERE id = ?`,
          [study.study_id]
        );

        const studyInfo = studyInfoRows[0];

        const today = dayjs();
        const startDate = dayjs(studyInfo.start_date);
        const endDate = dayjs(studyInfo.end_date);

        // 지난 주 기간 계산
        const { startDate: lastWeekStart, endDate: lastWeekEnd } =
          getLastWeekRange(studyInfo.start_weekday, today);

        console.log("지난 주 시작일:", lastWeekStart, "종료일:", lastWeekEnd);

        // 지난 주 기간 내의 해당 유저 인증 횟수
        const [countRows] = await pool.execute(
          `SELECT COUNT(*) as count 
           FROM WEEKLY_STUDIES 
           WHERE study_id = ? AND user_id = ? 
             AND week_date BETWEEN ? AND ?`,
          [study.study_id, user.id, lastWeekStart, lastWeekEnd]
        );

        const lastWeekCertCount = Number(countRows[0].count);
        console.log("지난 주 인증 횟수:", lastWeekCertCount);

        // 지난 주에 유저가 해야 할 인증 횟수
        const requiredCount = studyInfo.weekly_required_count;

        const lackCount = Math.max(requiredCount - lastWeekCertCount, 0);
        const penalty = lackCount * studyInfo.penalty_amount;
        total_fine += penalty;

        console.log(
          `벌금계산 → 부족 ${lackCount}회 x ${studyInfo.penalty_amount} = ${penalty}`
        );
      }

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
