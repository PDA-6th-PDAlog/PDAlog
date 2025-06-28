var express = require('express');
const multer = require('multer');
const myStudyInfoController = require("../controller/myStudyInfoController");
const authenticate = require("../common/middlewareAuth");

var router = express.Router();
const upload = multer({ dest: 'uploads/' });  // multer 설정 추가

// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.get("/:studyRoomId", (req, res) => {
    const { studyRoomId } = req.params;

    myStudyInfoController.getStudyById(req, res, studyRoomId);

});

router.post("/studyAuth", upload.single('file'), myStudyInfoController.postStudyAuth);

router.get("/:studyRoomId/:otherUserId", (req, res) => {
    const { studyRoomId, otherUserId } = req.params;
    console.log(otherUserId);
    myStudyInfoController.getOtherUserInfo(req, res, studyRoomId, otherUserId);
});

router.get("/comment/:studyRoomId/:otherUserId", (req, res) => {
    const { studyRoomId, otherUserId } = req.params;
    myStudyInfoController.getCommentMember(req, res, studyRoomId, otherUserId);
})

router.post("/comment/:studyRoomId/:otherUserId", (req, res) => {
    const { studyRoomId, otherUserId } = req.params;
    console.log("+".repeat(100));
    myStudyInfoController.postCommentStudyRoom(req, res, studyRoomId, otherUserId);
})


module.exports = router;
