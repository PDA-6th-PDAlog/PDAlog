const express = require("express");
const router = express.Router();
const fineRankingController = require("../controller/fineRankingController");

router.get("/", fineRankingController.getFineRanking);

module.exports = router;
