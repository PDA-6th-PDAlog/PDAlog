const signUpRepository = require("../repository/signUpRepository");

exports.signUp = async (userData) => {
  // 필요한 유효성 검사 등은 여기서 수행
  console.log("signup 찍힘");
  return await signUpRepository.create(userData);
};
