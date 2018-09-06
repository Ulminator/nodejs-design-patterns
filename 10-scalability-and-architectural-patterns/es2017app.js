import http from 'http';
const { pid } = process;

let book = {
    author: 'Zsolt Nagy',
    title: 'The Developer\'s Edge',
    website: 'devcareermastery.com',
    chapters: 8
}

console.log(Object.values(book));

http.createServer((req, res) => {
    for (let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
}).listen(8080, () => {
    console.log(`Started pid ${pid}`);
})