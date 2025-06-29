const express = require("express");
const router = express.Router();
const pool = require("../config/db.js"); // DB pool 불러오기
const dayjs = require("dayjs");
const { useEffect } = require("react");

router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  console.log("userId", userId);
  try {
    // 오늘 날짜랑 user 정보 가져오기
    const today = dayjs().format("YYYY-MM-DD");
    const user = await pool.execute(
      `SELECT username, email, profile_image FROM USERS WHERE id = ?`,
      [userId]
    );

    const result = [];

    // user가 참여중인, 종료되지 않은 스터디 내역 가져오기
    const onStudy = await pool.execute(
      `SELECT sr.*
         FROM STUDY_ROOMS sr
         JOIN STUDY_MEMBERS sm ON sr.id = sm.study_id
         WHERE sm.user_id = ?`,
      [userId]
    );
    console.log("참여내역", onStudy);

    for (const std of onStudy) {
      console.log("제출내역", std);
      const summit = await pool.execute(
        // `SELECT username, email, profile_image FROM USERS WHERE id = ?`,
        // `SELECT * FROM WEEKLY_STUDIES
        // WHERE user_id = ?
        // AND week_date BETWEEN DATE_SUB(?, INTERVAL 7 DAY)
        // AND DATE_SUB(?, INTERVAL 1 DAY)
        // AND study_id = ?`,
        `SELECT * FROM WEEKLY_STUDIES
        WHERE user_id = ?
        AND week_date BETWEEN DATE_SUB(?, INTERVAL 6 DAY)
        AND ?
        AND study_id = ?`,
        [userId, today, today, std.id]
      );
      console.log("스터디별 제출 내역", summit);

      // 일주일 날짜 배열 생성
      const dateArray = [];
      for (let i = 6; i >= 0; i--) {
        dateArray.push(dayjs(today).subtract(i, "day").format("YYYY-MM-DD"));
      }
      console.log("생성 날짜 배열", dateArray);

      // O/X 배열 생성
      const dateStatuses = dateArray.map((date) => {
        const found = summit.find(
          (row) => dayjs(row.week_date).format("YYYY-MM-DD") === date
        );
        return found ? "O" : "X";
      });
      console.log("O/X 배열", dateStatuses);

      result.push({ name: std.title, dates: dateStatuses });
    }

    res.json({
      success: true,
      day: today,
      data: user,
      // data1: onStudy,
      data2: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
