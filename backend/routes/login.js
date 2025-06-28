// backend/routes/login.js (파일명 수정 권장)
const express = require("express");
// const jwt = require("jsonwebtoken");
const router = express.Router();
const loginController = require("../controller/loginController");
const authenticate = require("../common/middlewareAuth");

// 로그인 POST
router.post(
    "/",
    (req, res, next) => {
        console.log("[ROUTER] login 요청 들어옴");
        next();
    },
    loginController.login
);

// // 인증 미들웨어
// async function authenticate(req, res, next) {
//     try {
//         let token = req.cookies.authToken;
//         const headerToken = req.headers.authorization;
//
//         if (!token && headerToken?.startsWith("Bearer ")) {
//             token = headerToken.split(" ")[1];
//         }
//
//         if (!token) {
//             return res.status(401).json({ message: "인증 토큰이 없습니다." });
//         }
//
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
//     }
// }

// 로그인 여부 확인용 GET
router.get("/protected", authenticate, (req, res) => {
    const { id, email, username, profile_image } = req.user;

    console.log("a뭐 문제있나?")
    res.cookie("userInfo", JSON.stringify(req.user), {
        httpOnly: false, // 필요 시 secure, sameSite 옵션도 추가 가능
    });

    console.log("login 됐나유?")

    return res.status(200).json({
        isLoggedIn: true,
        user: { id, email, username, profile_image },
    });
});

router.post('/logout', (req, res) => {
    try {

        req.session.destroy(err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: '로그아웃 실패' });
            }

            res.clearCookie('authToken');
            res.clearCookie('cookieName');
            res.clearCookie('connect.sid');
            res.status(200).json({ message: '로그아웃 성공' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = router;
