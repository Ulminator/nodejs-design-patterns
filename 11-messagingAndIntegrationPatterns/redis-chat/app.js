const WebSocketServer = require('ws').Server;
const redis = require('redis');

// When creating multiple instance on different ports
// The users will still be able to receive messages from others.
const redisSub = redis.createClient();
const redisPub = redis.createClient();

const server = require('http').createServer(
  require('ecstatic')({ root: `${__dirname}/www` })
);

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    redisPub.publish('chat_messages', msg);
  });
});

redisSub.subscribe('chat_messages');
redisSub.on('message', (channel, message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

server.listen(process.argv[2] || 8080);