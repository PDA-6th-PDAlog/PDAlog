// swagger.js
const swaggerAutogen = require('swagger-autogen')({autoBody: false});

const doc = {
    info: {
        title: 'Study API',
        description: '스터디 모집 플랫폼 API 문서',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = [
    './routes/index.js',
    './routes/users.js',
    './routes/test.js',  // 여기에 반드시 추가
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger 문서 생성 완료');
});
