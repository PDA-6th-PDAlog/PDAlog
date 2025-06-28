const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController.js");

router.get("/", mainController.getAllStudies);
router.get("/my-studies", mainController.getUserStudyRooms);
router.get("/weekly-fine-ranking", mainController.getWeeklyFineRanking);

module.exports = router;
