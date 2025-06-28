const studyRoomService = require("../service/studyRoomService");
const STATUS = require("../common/status");

async function createStudyRoom(req, res) {
  console.log("[CONTROLLER] req.body:", req.body);
  try {
    // req.user에서 로그인된 사용자 id 가져오기
    const userId = req.user.id;

    // req.body에서 필요한 값만 꺼내오기
    const {
      title,
      description,
      start_date,
      end_date,
      penalty_amount,
      weekly_required_count,
      thumbnail_url,
    } = req.body;

    // host_id를 강제로 userId로 덮어쓰기 보안상
    const roomData = {
      title,
      description,
      start_date,
      end_date,
      penalty_amount,
      weekly_required_count,
      thumbnail_url,
      host_id: userId,
    };

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

async function joinStudyRoom(req, res) {
  const studyId = Number(req.params.id);
  const userId = req.user.id;

  try {
    await studyRoomService.addUserToStudy(studyId, userId);

    res.status(200).json({
      success: true,
      message: "스터디에 성공적으로 참가했습니다.",
    });
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
}

async function leaveStudyRoom(req, res) {
  const studyId = Number(req.params.id);
  const userId = req.user.id;

  try {
    // 방장 여부 확인
    const isHost = await studyRoomService.isHost(studyId, userId);
    if (isHost) {
      return res.status(400).json({
        success: false,
        message: "방장은 스터디를 나갈 수 없습니다.",
      });
    }

    // 나가기 처리
    await studyRoomService.removeUserFromStudy(studyId, userId);

    res.status(200).json({
      success: true,
      message: "스터디에서 나갔습니다.",
    });
  } catch (err) {
    console.error("[CONTROLLER ERROR]", err);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
}

module.exports = {
  createStudyRoom,
  getStudyRoom,
  joinStudyRoom,
  leaveStudyRoom,
};
