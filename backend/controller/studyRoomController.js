const studyRoomService = require("../service/studyRoomService");
const STATUS = require("../common/status");

async function createStudyRoom(req, res) {
  console.log("[CONTROLLER] req.body:", req.body);
  try {
    const newRoom = await studyRoomService.createStudyRoom(req.body);
    console.log("[CONTROLLER] 새 스터디룸 생성 완료:", newRoom);

    res.status(STATUS.SUCCESS.code).json({
      message: STATUS.SUCCESS.message,
      data: newRoom,
    });
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(STATUS.INTERNAL_ERROR.code).json({
      message: STATUS.INTERNAL_ERROR.message,
    });
  }
}

async function getStudyRoom(req, res) {
  const { id } = req.params;
  try {
    const study = await studyRoomService.getStudyRoom(Number(id));
    if (!study) {
      return res.status(404).json({ message: "스터디가 존재하지 않습니다." });
    }

    res.status(200).json(study);
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
}

module.exports = { createStudyRoom, getStudyRoom };
