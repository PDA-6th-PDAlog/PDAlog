const studyAuthRepository = require('../repository/studyAuthRepository');
const STATUS = require('../common/status');

async function postStudyAuth(req, res) {
    try {
        const { studyId, userId, weekDate, content } = req.body;
        const file = req.file;

        // 파일 업로드 안 된 경우 에러 처리
        if (!file) {
            return res.status(STATUS.BAD_REQUEST.code).json({
                message: "파일이 업로드되지 않았습니다.",
            });
        }

        // studyId, userId, weekDate 같은 필수 필드 유효성 체크 (필요하면 추가)
        if (!studyId || !userId || !weekDate) {
            return res.status(STATUS.BAD_REQUEST.code).json({
                message: "필수 요청 데이터가 누락되었습니다.",
            });
        }

        const result = await studyAuthRepository.postStudyAuth({
            studyId,
            userId,
            weekDate,
            content,
            file,
        });

        res.status(STATUS.SUCCESS.code).json({
            message: STATUS.SUCCESS.message,
            data: result,
        });
    } catch (error) {
        console.error("Controller error:", error);
        res.status(STATUS.INTERNAL_ERROR.code).json({
            message: STATUS.INTERNAL_ERROR.message,
        });
    }
}

module.exports = { postStudyAuth };
