let obj1 = {key: 'value1'}
let obj2 = {key: 'value2'}

const weakSet = new WeakSet([obj1, obj2]);
const set = new Set([obj1, obj2]);

console.log('Weak Set: ' + weakSet.has(obj1));
console.log('Set :', set);

obj1 = undefined;

console.log('Weak Set: ' + weakSet.has(obj1));
console.log('Set :', set);

// Set will still contian the information that was in obj1, while weak set will not.