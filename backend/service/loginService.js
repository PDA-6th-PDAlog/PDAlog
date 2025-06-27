const loginRepository = require("../repository/loginRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {
  const user = await loginRepository.findByEmail(email);
  if (!user) {
    throw new Error("가입되지 않은 이메일입니다.");
  }

  const isMatch = await bcrypt.compare(password, user.passwd);
  if (!isMatch) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  delete user.passwd;

  return {
    user,
    token,
  };
};
