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
    })
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(STATUS.INTERNAL_ERROR.code).json({
      message: STATUS.INTERNAL_ERROR.message,
    });
  }
}
// Function to get user's study rooms
// const getUserStudyRooms = async (req, res) => {
//   try {
//     const rows = await mainService.getMyStudyRooms();
//     console.log("🔥 getMyStudyRooms rows 확인: controller", rows);
//     return rows;
//   } catch (error) {
//     console.error("[ERROR] getUserStudyRooms:", error);
//     throw error;
//   }
// };
// module.exports = {
//   getAllStudies,
//   getUserStudyRooms,
// };

// //// mainController.js
// const getUserStudyRooms = async (req, res) => {
//   try {
//     const userId = req.user.id; // JWT에서 꺼내거나, 세션 등
//     const rows = await mainService.getMyStudyRooms(userId);
//     console.log("🔥 getMyStudyRooms rows 확인: controller", rows);
//     return res.status(200).json({
//       message: "내가 가입한 스터디 조회 성공",
//       data: rows,
//     });
//   } catch (error) {
//     console.error("[ERROR] getUserStudyRooms:", error);
//     return res.status(500).json({
//       message: "서버 오류",
//     });
//   }
// };
const getUserStudyRooms = async (req, res) => {
  try {
    const userId = 1; // 테스트용 하드코딩
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

module.exports = {
  getAllStudies,
  getUserStudyRooms,
};
