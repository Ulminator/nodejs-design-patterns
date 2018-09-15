// Substack pattern - Expose the main functionality of a module by exporting only one function.
// Use the exported module as a namespace to expose auxiliary functionality.
module.exports = (message) => {
    console.log(`info: ${message}`)
}

module.exports.verbose = (message) => {
    console.log(`verbose: ${message}`)
}

const logger = require('./functionExports');
logger('This is an informational message');
logger.verbose('This is a verbose message');