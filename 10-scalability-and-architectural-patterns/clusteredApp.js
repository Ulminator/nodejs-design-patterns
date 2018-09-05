const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`Clustering to ${cpus} CPUSs`);
    for (let i = 0; i < cpus; i++) {
        // the current main module is run again, but this time in a worker mode
        cluster.fork();
    }
} else {
    // starts a new http server
    require('./app');
}

// Completed 5000 requests
// Finished 5712 requests


// Server Software:        
// Server Hostname:        localhost
// Server Port:            8080

// Document Path:          /
// Document Length:        17 bytes

// Concurrency Level:      200
// Time taken for tests:   10.001 seconds
// Complete requests:      5712
// Failed requests:        0
// Total transferred:      525596 bytes
// HTML transferred:       97121 bytes
// Requests per second:    571.15 [#/sec] (mean)
// Time per request:       350.168 [ms] (mean)
// Time per request:       1.751 [ms] (mean, across all concurrent requests)
// Transfer rate:          51.32 [Kbytes/sec] received

// Connection Times (ms)
//               min  mean[+/-sd] median   max
// Connect:        0    1   1.9      0      13
// Processing:    30  343  31.2    348     402
// Waiting:       21  342  33.7    347     399
// Total:         43  344  29.5    348     403

// Percentage of the requests served within a certain time (ms)
//   50%    348
//   66%    351
//   75%    353
//   80%    354
//   90%    357
//   95%    360
//   98%    363
//   99%    365
//  100%    403 (longest request)