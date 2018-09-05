const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`Clustering to ${cpus} CPUSs`);
    for (let i = 0; i < cpus; i++) {
        // the current main module is run again, but this time in a worker mode
        cluster.fork();
    }

    cluster.on('exit', (worker, code) => {
        if (code != 0 && !worker.suicide) {
            console.log(`Worker process ${worker.process.pid} crashed: Starting a new worker`);
            cluster.fork();
        }
    });
} else {
    // starts a new http server
    require('./crashingApp');
}

// brew install siege
// siege -c200 -t10s http://localhost:8080/