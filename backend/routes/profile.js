const express = require("express");
const router = express.Router();
const pool = require("../config/db.js"); // DB pool 불러오기

router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  console.log("userId", userId);
  try {
    const rows = await pool.execute(
      `SELECT username, email, profile_image FROM USERS WHERE id = ?`,
      //   `SELECT sr.*
      //  FROM STUDY_ROOMS sr
      //  JOIN STUDY_MEMBERS sm ON sr.id = sm.study_id
      //  WHERE sm.user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
