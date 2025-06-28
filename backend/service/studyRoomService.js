const studyRoomRepository = require("../repository/studyRoomRepository");

exports.createStudyRoom = async (roomData) => {
  // 필요한 유효성 검사 등은 여기서 수행
  return await studyRoomRepository.create(roomData);
};

exports.getStudyRoom = async (studyId) => {
  return await studyRoomRepository.findById(studyId);
};

exports.addUserToStudy = async (studyId, userId) => {
  // const alreadyJoined = await studyRoomRepository.checkUserJoined(
  //   studyId,
  //   userId
  // );
  // if (alreadyJoined) {
  //   throw new Error("이미 참가 중인 스터디입니다.");
  // }
  // 시간 나면 해야지..

  await studyRoomRepository.insertUserToStudy(studyId, userId);
  console.log(`[SERVICE] user_id ${userId}가 study_id ${studyId}에 참가 완료`);
};

exports.isHost = async (studyId, userId) => {
  const hostId = await studyRoomRepository.findHostIdByStudyId(studyId);
  console.log(hostId);
  console.log(userId);
  return hostId === userId;
};

exports.removeUserFromStudy = async (studyId, userId) => {
  await studyRoomRepository.deleteUserFromStudy(studyId, userId);
};
