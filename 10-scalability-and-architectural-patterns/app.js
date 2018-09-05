const http = require('http');
const pid = process.pid;

// Send pid to identify which instance of the application is handling the request.
// Perform an empty loop to simulate actual CPU work
http.createServer((req, res) => {
    for (let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
}).listen(8080, () => {
    console.log(`Started pid ${pid}`);
})

//Apache Benchmark

// 200 concurrent connections for 10 seconds
//ab -c200 -t10 http://localhost:8080/

// 4 processors is in the order of 90 tps with an average CPU utilization of only 20%

// Finished 1535 requests


// Server Software:        
// Server Hostname:        localhost
// Server Port:            8080

// Document Path:          /
// Document Length:        17 bytes

// Concurrency Level:      200
// Time taken for tests:   10.260 seconds
// Complete requests:      1535
// Failed requests:        0
// Total transferred:      148580 bytes
// HTML transferred:       27455 bytes
// Requests per second:    149.61 [#/sec] (mean)
// Time per request:       1336.768 [ms] (mean)
// Time per request:       6.684 [ms] (mean, across all concurrent requests)
// Transfer rate:          14.14 [Kbytes/sec] received

// Connection Times (ms)
//               min  mean[+/-sd] median   max
// Connect:        0    4   2.1      3      10
// Processing:   611 1213 262.2   1192    1575
// Waiting:       14  923 266.5    968    1280
// Total:        618 1217 262.0   1192    1576

// Percentage of the requests served within a certain time (ms)
//   50%   1192
//   66%   1448
//   75%   1480
//   80%   1491
//   90%   1506
//   95%   1511
//   98%   1576
//   99%   1576
//  100%   1576 (longest request)