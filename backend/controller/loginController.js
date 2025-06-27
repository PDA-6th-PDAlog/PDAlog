const loginService = require("../service/loginService");
const STATUS = require("../common/status");

async function login(req, res) {
  console.log("[CONTROLLER] req.body:", req.body);

  const { email, password } = req.body;

  try {
    const user = await loginService.login(email, password);
    console.log("[CONTROLLER] 로그인 성공:", user);

    // 토큰 없이 그냥 user 정보만 응답
    res.status(STATUS.SUCCESS.code).json({
      message: STATUS.SUCCESS.message,
      data: user,
    });
  } catch (error) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(STATUS.UNAUTHORIZED.code).json({
      message: error.message || STATUS.UNAUTHORIZED.message,
    });
  }
}

module.exports = { login };
