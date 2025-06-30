const signUpService = require("../service/signUpService");
const STATUS = require("../common/status");

async function signUp(req, res) {
  console.log("[CONTROLLER] req.body:", req.body);

  const { authCode } = req.body;

  // ✅ 인증 코드가 일치하지 않으면 바로 응답 후 리턴
  if (authCode !== process.env.PDA_SECRET) {
    return res.status(403).json({ message: "인증 코드가 일치하지 않습니다." });
  }

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
      message: error.message || STATUS.INTERNAL_ERROR.message,
    });
  }
}

module.exports = { signUp };
