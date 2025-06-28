const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        let token = req.cookies.authToken;
        const headerToken = req.headers.authorization;

        if (!token && headerToken?.startsWith("Bearer ")) {
            token = headerToken.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "인증 토큰이 없습니다." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
};

module.exports = authenticate;
