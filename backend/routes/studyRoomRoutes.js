const express = require("express");
const router = express.Router();
const studyRoomController = require("../controller/studyRoomController");
const authenticate = require("../common/middlewareAuth");

router.post(
  "/",
  (req, res, next) => {
    console.log("[ROUTER] POST /study-rooms 요청 들어옴");
    next();
  },
  authenticate,
  studyRoomController.createStudyRoom
);

router.get(
  "/:id",
  async (req, res, next) => {
    console.log(`[ROUTER] GET /study-rooms/${req.params.id} 요청 들어옴`);
    next();
  },
  studyRoomController.getStudyRoom
);

router.post(
  "/:id/join",
  (req, res, next) => {
    console.log(`[ROUTER] POST /study-rooms/${req.params.id}/join 요청 들어옴`);
    next();
  },
  authenticate,
  studyRoomController.joinStudyRoom
);

router.delete(
  "/:id/leave",
  (req, res, next) => {
    console.log(
      `[ROUTER] DELETE /study-rooms/${req.params.id}/leave 요청 들어옴`
    );
    next();
  },
  authenticate,
  studyRoomController.leaveStudyRoom
);

module.exports = router;
