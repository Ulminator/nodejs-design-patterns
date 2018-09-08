const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

// More practical to add functionality that goes beyond the mere production of new events
// A way to make any object observable
// Server from core HTTP defines methods such as listen(), close(), setTimeout() and inherets from EventEmitter
// This allows it to produce events, such as request, when a new request is received.
class FindPattern extends EventEmitter {
    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file);
        return this;
    }

    find() {
        this.files.forEach(file => {
            fs.readFile(file, 'utf8', (err, content) => {
                if (err) return this.emit('error', err);

                this.emit('fileread', file);

                let match;
                if (match = content.match(this.regex)) {
                    match.forEach(elem => this.emit('found', file, elem));
                }
            });
        });
        return this;
    }
}

const findPatternObject = new FindPattern(/hello \w+/);
findPatternObject
    .addFile('fileA.txt')
    .addFile('fileB.json')
    .find()
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
    .on('error', err => console.log(`Error emitted: ${err.message}`));

// Above the events are emitted asynchronously
// This means that new listeners can be registered after EventEmitter is initailized.
// Events emitting synchronously requires that all listeners are registered before any events are emitted.

class SyncEmit extends EventEmitter {
    constructor() {
        super();
        this.emit('ready');
    }
}

const syncEmit = new SyncEmit();
syncEmit.on('ready', () => console.log('Object is ready to be used'));
