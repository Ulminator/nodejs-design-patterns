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
});

setTimeout(() => {
    throw new Error('Ooops');
}, Math.ceil(Math.random() * 3) * 1000); //Exits after 1-3 seconds