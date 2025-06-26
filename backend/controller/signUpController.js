const signUpService = require("../service/signUpService");
const STATUS = require("../common/status");

async function signUp(req, res) {
  console.log("[CONTROLLER] req.body:", req.body);
  try {
    const newUser = await signUpService.signUp(req.body);
    console.log("[CONTROLLER] 회원정보 저장 완료:", newUser);

    res.status(STATUS.SUCCESS.code).json({
      message: STATUS.SUCCESS.message,
      data: newUser,
    });
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(STATUS.INTERNAL_ERROR.code).json({
      message: STATUS.INTERNAL_ERROR.message,
    });
  }
}

module.exports = { signUp };
