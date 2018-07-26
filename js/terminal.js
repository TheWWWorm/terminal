'use strict';

class Terminal {
    constructor() {
        this.history = [];
    }

    execute(command) {
        this.history.push(command);
        return this.history;
    }
}

window.Terminal = Terminal;
