// backend/routes/signUp.js
const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.post(
  "/",
  (req, res, next) => {
    console.log("[ROUTER] login 요청 들어옴");
    next();
  },
  loginController.login
);

module.exports = router;
