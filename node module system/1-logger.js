const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('test', { data: 'yay' });
    }
}

module.exports = Logger;
