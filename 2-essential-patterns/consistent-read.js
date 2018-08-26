const fs = require('fs');

const cache = {};

function consistentReadSync(filename) {
    if (cache[filename]) {
        return cache[filename];
    } else {
        cache[filename] = fs.readFileSync(filename, 'utf8');
        return cache[filename];
    }
}

function consistentReadAsync(filename, callback) {
    if (cache[filename]) {
        // process.nextTick schedules synchronous callback invocation to happen in the future instead of being run immediately
        // takes a callback as an arguent and pushes it to the top of the event queue, in front of any pending I/O events, and returns immmediately
        // the callback will then be invoked as soon as the even loop runs again
        process.nextTick(() => callback(cache[filename]));
    } else {
        fs.readFile(filename, 'utf8', (err, data) => {
            cache[filename] = data;
            callback(data);
        })
    }
}

// alternative to process.nextTick
// setImmediate()
//  - While process.nextTick runs before any other I/O event is fired, setImmediate is queued behind any I/O event already in the queue.
//  - process.nextTick can potentially cause I/O starvation with recursive invocations

// It is a gurantee that a callback is invoked asynchronously by deffering its execution using process.nextTick();