//mainController.js

const STATUS = require("../common/status");

const mainService = require("../service/mainService");
console.log("🔍 mainService 위치:", require.resolve("../service/mainService"));

async function getAllStudies(req, res) {
  try {
    const studies = await mainService.getAllStudies();

    res.status(STATUS.SUCCESS.code).json({
      message: STATUS.SUCCESS.message,
      data: studies,
    });
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(STATUS.INTERNAL_ERROR.code).json({
      message: STATUS.INTERNAL_ERROR.message,
    });
  }
}

const getUserStudyRooms = async (req, res) => {
  try {
    const userId = req.user.id; // ← 요거!
    const rows = await mainService.getMyStudyRooms(userId);
    // console.log("🔥 getMyStudyRooms rows 확인: controller", rows);
    return res.status(200).json({
      message: "내가 가입한 스터디 조회 성공",
      data: rows,
    });
  } catch (error) {
    console.error("[ERROR] getUserStudyRooms:", error);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
};
const { calculateWeeklyFineRanking } = require("../service/mainService.js");

const getWeeklyFineRanking = async (req, res) => {
  try {
    const result = await calculateWeeklyFineRanking();

    res.status(200).json({
      success: true,
      message: "주간 벌금 랭킹 조회 성공",
      data: result,
    });
  } catch (err) {
    console.error("[ERROR] getWeeklyFineRanking:", err);
    res.status(500).json({
      success: false,
      message: "주간 벌금 랭킹 조회 실패",
    });
  }
};

module.exports = {
  getAllStudies,
  getWeeklyFineRanking,
  getUserStudyRooms,
};
