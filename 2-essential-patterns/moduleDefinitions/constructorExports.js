function Logger(name) {
    this.name = name;
}

Logger.prototype.log = function(message) {
    console.log(`[${this.name}] ${message}`);
};

Logger.prototype.info = function(message) {
    this.log(`info: ${message}`)
};

Logger.prototype.verbose = function(message) {
    this.log(`verbose: ${message}`)
};

module.exports = Logger;

// const Logger = require('./constructorExports');
// const dbLogger = new Logger('DB');
// dbLogger.info('This is an informational message');

// const accessLogger = new Logger('ACCESS');
// accessLogger.verbose('This is a verbose message');