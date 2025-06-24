const testRepository = require('../repository/test.repository');

async function getAllTests() {
    return await testRepository.findAll();
}

module.exports = { getAllTests };