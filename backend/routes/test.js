const express = require("express");
const router = express.Router();

const testController = require("../controller/testController");

/**
 * @swagger
 * /test:
 *   get:
 *     tags:
 *       - Test
 *     summary: 테스트 조회
 *     responses:
 *       200:
 *         description: 성공
 */
router.get("/test", testController.getAllTests);

module.exports = router;
