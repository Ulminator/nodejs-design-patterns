// Both this and the constructor exports are the same since classes are just syntactic sugar for prototypes.
// Compared to the substack pattern, it exposes a lot more of the module internals.
// However, there is much more power when it comes to extending functionality.
class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }

    info(message) {
        this.log(`info: ${message}`)
    }

    verbose(message) {
        this.log(`verbose: ${message}`)
    }
}

module.exports = Logger;

// const Logger = require('./constructorExports');
const dbLogger = new Logger('DB');
dbLogger.info('This is an informational message');

const accessLogger = new Logger('ACCESS');
accessLogger.verbose('This is a verbose message');