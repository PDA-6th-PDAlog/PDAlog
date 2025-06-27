//mainController.js

const STATUS = require("../common/status");

const mainService = require("../service/mainService");
console.log("🔍 mainService 위치:", require.resolve("../service/mainService"));

async function getAllStudies(req, res) {
  try {
    const studies = await mainService.getAllStudies();
    console.log("[DEBUG] studies:", studies);

    res.status(STATUS.SUCCESS.code).json({
      message: STATUS.SUCCESS.message,
      data: studies,
    }),
      console.log("[CONTROLLER] DB에서 가져온 데이터:", studies);
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(STATUS.INTERNAL_ERROR.code).json({
      message: STATUS.INTERNAL_ERROR.message,
    });
  }
}

module.exports = {
  getAllStudies,
};

//// mainController.js
