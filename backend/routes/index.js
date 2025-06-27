const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController");

// 루트 주소로 들어왔을 때 DB 데이터 보내기
router.get("/", mainController.getAllStudies);
router.get("/my-studies", mainController.getUserStudyRooms);

module.exports = router;
