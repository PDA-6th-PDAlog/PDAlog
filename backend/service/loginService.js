import * as loginRepository from "../repository/loginRepository.js";

export async function login(email, password) {
  const user = await loginRepository.findByEmail(email);
  console.log("로그인서비스 user", user);
  if (!user) {
    throw new Error("가입되지 않은 이메일입니다.");
  }

  // 비밀번호 단순 문자열 비교
  if (user.passwd !== password) {
    console.log("user.ps", user.passwd);
    console.log("pw", password);
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  return user;
}
