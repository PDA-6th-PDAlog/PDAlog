

// async function getStudyRoomTeamPeopleList(proofRows, currentWeek) {
//     const result = {};
//
//     proofRows.forEach((row) => {
//         if (row.week_number === currentWeek) {
//             const userId = row.user_id;
//             if (!result[userId]) {
//                 result[userId] = [];
//             }
//             result[userId].push(row.proof_image);
//         }
//     });
//
//     return result;
// }



async function getStudyRoomTeamInfo(proofRows, currentWeek) {
    // 1. 현재 주차 데이터 필터링
    const currentWeekProofs = proofRows.filter(
        row => row.week_number === Number(currentWeek)
    );

    // 2. 유저별로 집계
    const userMap = new Map();

    currentWeekProofs.forEach(row => {
        const userId = row.user_id;
        const rowDate = new Date(row.week_date);

        if (!userMap.has(userId)) {
            userMap.set(userId, {
                user_id: userId,
                count: 1,
                latestDate: rowDate,
                latestImage: row.proof_image,
            });
        } else {
            const userData = userMap.get(userId);
            userData.count += 1;

            if (rowDate > userData.latestDate) {
                userData.latestDate = rowDate;
                userData.latestImage = row.proof_image;
            }

            userMap.set(userId, userData);
        }
    });

    // 3. 결과 정리
    const result = Array.from(userMap.values()).map(({ user_id, count, latestImage }) => ({
        user_id,
        count,
        latestImage,
    }));

    return result;
}


async function getMyWeekAuthCount(userId, currentWeek, proofRows) {
    const count = proofRows.filter(row =>
        row.user_id === Number(userId) &&
        row.week_number === Number(currentWeek)
    ).length;

    return count;
}


async function getMyBoardInfo(userId, proofRows) {

    const myProofs = proofRows.filter(row => row.user_id === Number(userId));
    const AuthCount = myProofs.length;
    const authDates = [...new Set(myProofs.map(row => row.week_date))];


    return { AuthCount, authDates };
}


async function goToCalculateWeek(roomStartDate, roomEndDate) {
    const startDate = new Date(roomStartDate); // 시작일
    const endDate = new Date(roomEndDate);     // 종료일
    const now = new Date();                    // 현재 시간

    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffDays / 7) + 1;

    const totalDiffTime = endDate.getTime() - startDate.getTime();
    const totalDiffDays = Math.floor(totalDiffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.ceil(totalDiffDays / 7);

    return { currentWeek, totalWeeks };
}
module.exports = { goToCalculateWeek, getMyBoardInfo, getMyWeekAuthCount, getStudyRoomTeamInfo, /**getStudyRoomTeamPeopleList**/};