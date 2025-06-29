const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController.js");
const authenticate = require("../common/middlewareAuth");
router.get("/", mainController.getAllStudies);
router.get("/my-studies", authenticate, mainController.getUserStudyRooms);

router.get("/weekly-fine-ranking", mainController.getWeeklyFineRanking);

module.exports = router;
