const studyRoomRepository = require("../repository/studyRoomRepository");

exports.createStudyRoom = async (roomData) => {
  // 필요한 유효성 검사 등은 여기서 수행
  return await studyRoomRepository.create(roomData);
};

exports.getStudyRoom = async (studyId) => {
  return await studyRoomRepository.findById(studyId);
};
