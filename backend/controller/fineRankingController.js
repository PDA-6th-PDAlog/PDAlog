const fineRankingService = require("../service/fineRankingService");
const STATUS = require("../common/status");

exports.getFineRanking = async (req, res) => {
  console.log("🔥 컨트롤러 도착!!! 띠용!");

  try {
    const ranking = await fineRankingService.calculateFineRanking();

    res.status(200).json(ranking);
  } catch (error) {
    console.error("벌금 랭킹 에러:", error);
    res
      .status(500)
      .json({ status: STATUS.SERVER_ERROR, message: "서버 에러 발생" });
  }
};
