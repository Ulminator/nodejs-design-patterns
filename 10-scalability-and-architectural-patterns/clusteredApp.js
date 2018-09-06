const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Clustering to ${numCPUs} CPUSs`);
    for (let i = 0; i < numCPUs; i++) {
        // the current main module is run again, but this time in a worker mode
        cluster.fork();
    }
} else {
    // starts a new http server
    require('./app');
}