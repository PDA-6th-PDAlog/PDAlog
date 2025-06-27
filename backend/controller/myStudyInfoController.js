const myStudyInfoRepository = require('../repository/myStudyInfoRepository');
const myStudyInfoService = require('../service/myStudyInfoService');

const STATUS = require('../common/status');

async function getStudyById(req, res, studyRoomId) {
    const {userId} = req.query;

    //사용자가의 유저 아이디와 유저 이름을 통해서
    const getStudyhasMyInfo = await myStudyInfoRepository.getStudyRoomInUser(userId, studyRoomId);

    if (!getStudyhasMyInfo) {
        return res.status(403).json({ message: "스터디 멤버가 아닙니다." });
    }

    const getStudyRoomInfo = await myStudyInfoRepository.getStudyRoomInfo(studyRoomId);

    const getStudyRoomMemberProfile = await myStudyInfoRepository.getStudyRoomMemberProfile(userId, studyRoomId);


    //현재 몇주차인지
    const room = getStudyRoomInfo.rows;
    const roomStartDate = room.start_date;
    const roomEndDate = room.end_date;

    const toWeek = await myStudyInfoService.goToCalculateWeek(roomStartDate, roomEndDate);
    console.log(`현재 ${toWeek.currentWeek}주차입니다.`);
    console.log(`총 ${toWeek.totalWeeks}주차입니다.`);

    const weeklyAuthCount = room.weekly_required_count;
    console.log("Total Auth Count:", weeklyAuthCount);
    // 통계 계산해서 넣어야함

    const getMyBoardInfo = await myStudyInfoService.getMyBoardInfo(userId, getStudyRoomInfo.proofRows);

    //내가 인증한 총 횟수, 내가 인증한 날짜들
    console.log(getMyBoardInfo.AuthCount, getMyBoardInfo.authDates);
    //내가 인증한 주차별 횟수
    const getMyWeekAuthCount = await myStudyInfoService.getMyWeekAuthCount(userId, toWeek.currentWeek, getStudyRoomInfo.proofRows);
    console.log(getMyWeekAuthCount);


    //다른 사람 조회 study원들을 다 가져와야함 ProofRows에서 모든 userId마다 각각의 개수를 가져와야함 해당하는 week_number 주차로CurrentWeek,
    //toWeek.currentWeek 현재 주차에서 전체 인원의 진척도
    const getStudyRoomTeamInfo = await myStudyInfoService.getStudyRoomTeamInfo(getStudyRoomInfo.proofRows, toWeek.currentWeek)

    console.log(getStudyRoomTeamInfo);

    // const getStudyRoomUserInfo = await myStudyInfoRepository.getStudyRoomUserInfo(userId, studyRoomId);

    return res.status(200).json({
        studyRoomInfo: {
            id: room.id,
            title: room.title,
            description: room.description,
            start_date: room.start_date,
            end_date: room.end_date,
            weekly_required_count: room.weekly_required_count,
            host_id: room.host_id,
        },
        MemberProfile: getStudyRoomMemberProfile.map(member => ({
            user_id: member.user_id,
            username: member.username,
            user_profile: member.profile_image
        }))
        ,
        myInfo: {
            userId: Number(userId),
            authCount: getMyBoardInfo.AuthCount,
            authDates: getMyBoardInfo.authDates,
            currentWeekAuthCount: getMyWeekAuthCount
        },
        progress: {
            currentWeek: toWeek.currentWeek,
            totalWeeks: toWeek.totalWeeks,
            weeklyRequiredCount: weeklyAuthCount,
            members: getStudyRoomTeamInfo
        }
    });
}

async function postStudyAuth(req, res) {
    try {
        const { studyId, userId, weekDate, content, isFull} = req.body;
        const file = req.file;

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

        //만약 꽉 찼다면
        if(isFull) {
            return res.status(422).json({
                message: "정원이 가득 찼습니다. 더 이상 참여할 수 없습니다."
            });
        }

        const result = await myStudyInfoRepository.postStudyAuth({
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

module.exports = { postStudyAuth, getStudyById };
