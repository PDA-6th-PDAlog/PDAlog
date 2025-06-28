const dayjs = require("dayjs");
const mainRepository = require("../repository/mainRepository.js");

/**
 * 전체 스터디 목록 가져오기
 */
async function getAllStudies() {
  const result = await mainRepository.findAll();
  console.log("🔥 mainService getAllStudies result:", result);
  return result;
}

/**
 * 특정 유저가 참여 중인 스터디 목록 가져오기
 * @param {number} userId
 */
async function getMyStudyRooms(userId) {
  const rows = await mainRepository.getMyStudyRooms(userId);
  console.log("🔥 getMyStudyRooms result:", rows);
  return rows;
}

/**
 * 주간 벌금 랭킹 계산
 * - 기준: 매주 목요일 ~ 수요일
 * - 월~수 → 지지난주 목~지난주 수
 * - 목~일 → 지난주 목~이번주 수
 */
async function calculateWeeklyFineRanking() {
  const today = dayjs();
  const weekday = today.day();

  let startDate, endDate;

  if (weekday >= 4) {
    // 목~일~수: 지난주 목 ~ 이번주 수
    startDate = today.day(4).subtract(7, "day");
    endDate = startDate.add(6, "day");
  } else {
    // 월~화~수: 지지난주 목 ~ 지난주 수
    startDate = today.day(4).subtract(14, "day");
    endDate = startDate.add(6, "day");
  }

  const startStr = startDate.format("YYYY-MM-DD");
  const endStr = endDate.format("YYYY-MM-DD");

  console.log("💡 벌금랭킹 집계 기간:", startStr, "~", endStr);

  const rows = await mainRepository.getWeeklyFines(startStr, endStr);

  const studyMap = {};

  for (const row of rows) {
    const {
      study_id,
      study_title,
      user_id,
      weekly_required_count,
      penalty_amount,
      certify_count,
    } = row;

    const missedDays =
      weekly_required_count > certify_count
        ? weekly_required_count - certify_count
        : 0;

    const fine = missedDays * penalty_amount;

    if (!studyMap[study_id]) {
      studyMap[study_id] = {
        studyId: study_id,
        studyTitle: study_title,
        totalFine: 0,
        users: [],
      };
    }

    studyMap[study_id].totalFine += fine;

    studyMap[study_id].users.push({
      userId: user_id,
      fine,
      missedDays,
    });
  }

  return Object.values(studyMap).sort((a, b) => b.totalFine - a.totalFine);
}

module.exports = {
  getAllStudies,
  getMyStudyRooms,
  calculateWeeklyFineRanking,
};
