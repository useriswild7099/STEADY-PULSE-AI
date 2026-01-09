const http = require('http');

console.log('Checking server health...');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode === 200) {
        console.log('Server is healthy!');
        process.exit(0);
    } else {
        console.error('Server returned non-200 status');
        process.exit(1);
    }
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
    process.exit(1);
});

req.end();
