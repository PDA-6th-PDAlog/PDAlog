const express = require("express");
const router = express.Router();
const studyRoomController = require("../controller/studyRoomController");

router.post(
  "/",
  (req, res, next) => {
    console.log("[ROUTER] POST /study-rooms 요청 들어옴");
    next();
  },
  studyRoomController.createStudyRoom
);

module.exports = router;
