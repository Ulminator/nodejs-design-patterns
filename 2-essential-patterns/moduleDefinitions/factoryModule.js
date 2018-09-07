// Guards against invocations that does not use the new constructor.
// function Logger(name) {
//     if (!(this instanceof Logger)) {
//         return new Logger(name);
//     }
//     this.name = name;
// };

// Same as above
function Logger(name) {
    // new.target evaluates to true at runtime if the function was called using the new keyword
    if (!new.target) {
        return new Logger(name);
    }
    this.name = name;
}

Logger.prototype.log = function(message) {
    console.log(`[${this.name}] ${message}`);
};

Logger.prototype.info = function(message) {
    this.log(`info: ${message}`)
};

// const Logger = require('./factoryModule');
const dbLogger = Logger('DB');
dbLogger.info('This is an informational message');
