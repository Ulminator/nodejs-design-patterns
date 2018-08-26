// WeakMap is like Map, but you can't iterate over the entries
// Allows objects used as keys to be garbage collected when the only reference left is inside WeakMap
// Useful when storign metadata associated with an object that might get deleted during the regular lifetime of the application.

let obj = {};
const map = new WeakMap();

map.set(obj, { key: 'some_value' });
console.log(map.get(obj));
obj = undefined;  // obj and associated data in the map will be cleaned up in next gc cycle
