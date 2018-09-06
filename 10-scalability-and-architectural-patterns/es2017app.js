import http from 'http';
const { pid } = process;

let book = {
    author: 'Home Depot Jr',
    title: 'The Orange Method',
    website: '2kool4school.com',
    chapters: 1
}

console.log(Object.values(book));

http.createServer((req, res) => {
    for (let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
}).listen(8080, () => {
    console.log(`Started pid ${pid}`);
})