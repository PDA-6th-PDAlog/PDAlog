const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const testController = require("../controller/testController");
const {uploadFile} = require("../service/uploadS3Service");
const {extname} = require("node:path");

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
router.get("/", testController.getAllTests);

const upload = multer({dest: 'uploads/'})

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const localFilePath = req.file.path;
        const s3Key = Date.now() + extname(req.file.originalname);
        const result = await uploadFile(localFilePath, s3Key);

        fs.unlinkSync(localFilePath);

        res.json({ url: result.Location });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'S3 upload failed' });
    }

});

module.exports = router;
