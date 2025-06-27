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
module.exports = {
  getAllStudies,
};
