// Need to install this package (not in core library)
const glob = require('glob');

// Function accepts a callback and returns an EventEmitter
// Provides simple and clear entry point for main functionality, while also emitting more fine-grained events.
glob('file.*', (error, files) => console.log(`All files found: ${JSON.stringify(files)}`))
    .on('match', match => console.log(`Match found: ${match}`));