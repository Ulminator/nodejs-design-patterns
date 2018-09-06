const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
    for (let i = 1e7; i > 0; i--) {} // simulate cpu work
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
}).listen(8080, () => {
    console.log(`Started pid ${pid}`);
})

//Apache Benchmark

// 200 concurrent connections for 10 seconds
//ab -c200 -t10 http://localhost:8080/