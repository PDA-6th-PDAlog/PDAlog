const testService = require('../service/testService');
const STATUS = require('../common/status');

async function getAllTests(req, res) {
    try {
        const tests = await testService.getAllTests();
        res.status(STATUS.SUCCESS.code).json({
            message: STATUS.SUCCESS.message,
            data: tests,
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR.code).json({
            message: STATUS.INTERNAL_ERROR.message,
        });
    }
}

module.exports = { getAllTests };
