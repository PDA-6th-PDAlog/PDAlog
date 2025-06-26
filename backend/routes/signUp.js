// backend/routes/signUp.js
const express = require("express");
const router = express.Router();
const signUpController = require("../controller/signUpController");

// router.post("/", (req, res) => {
//   console.log("회원가입 요청 도착");
//   res.send("회원가입 완료");
// });

router.post(
  "/",
  (req, res, next) => {
    console.log("[ROUTER] POST /study-rooms 요청 들어옴");
    next();
  },
  signUpController.signUp
);

module.exports = router;
