var express = require('express');
const multer = require('multer');
const studyAuthController = require("../controller/studyAuthController");

var router = express.Router();
const upload = multer({ dest: 'uploads/' });  // multer 설정 추가

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post("/studyAuth", upload.single('file'), studyAuthController.postStudyAuth);

module.exports = router;
