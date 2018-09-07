// Most of node core follows this pattern.
exports.info = (message) => {
    console.log(`info: ${message}`)
}

exports.verbose = (message) => {
    console.log(`verbose: ${message}`)
}

// Usage

const logger = require('./namedExports');
logger.info('This is an informational message');
logger.verbose('This is a verbose message');