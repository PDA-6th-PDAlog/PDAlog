//mainService.js

const mainRepository = require("../repository/mainRepository");

// async function getAllStudies() {
//   return await mainRepository.findAll();
// }

async function getAllStudies() {
  const result = await mainRepository.findAll();
  console.log("🔥 mainService getAllStudies result:", result);
  return result;
}

async function getMyStudyRooms(userId) {
  const rows = await mainRepository.getMyStudyRooms(userId);
  console.log("🔥 getMyStudyRooms controller:", rows);
  return rows;
}
module.exports = {
  getAllStudies,
  getMyStudyRooms,
};
