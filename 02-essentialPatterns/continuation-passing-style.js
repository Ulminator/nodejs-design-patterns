// Synchronous
console.log('\nSync')
function add(a, b, callback) {
    callback(a + b);
}

console.log('before');
add(1, 2, result => console.log('Result: ', result));
console.log('after');

// Asynchronous
console.log('\nAsync')
function additionAsyn(a, b, callback) {
    setTimeout(() => callback(a + b), 100);
}

console.log('before');
additionAsyn(1, 2, result => console.log('Result: ', result));
console.log('after');