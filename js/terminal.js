'use strict';

const translations = {
    'Command not found': {
        'en': 'Command was not found!',
        'ru': 'Команда не найдена!'
    },
    'Wrong lang': {
        'en': 'Wrong language, languages available are: ',
        'ru': 'Неверный язык, доступные языки: '
    },
    'Language set': {
        'en': 'Language is set to English',
        'ru': 'Язык сменен на Русский'
    },
    'Available commands': {
        'en': 'Available commands: ',
        'ru': 'Доступные команды: '
    },
};

const languages = ['en', 'ru'];

const commands = {
    history: function () {
        return this.history.join(', ');
    },
    help: function () {
        return this.getText('Available commands') + commandList.join(', ');
    },
    lang: function (lang) {
        if (!~languages.indexOf(lang) || !lang) {
            return this.getText('Wrong lang') + languages;
        }
        this.lang = lang;
        return this.getText('Language set');
    }
};

const commandList = Object.keys(commands);

class Terminal {
    constructor(lang) {
        this.history = [];
        this.lang = ~languages.indexOf(lang) ? lang : 'en';
        this.historyCursor = null;
        this.showedBlank = false;
        window.Terminal = this;
    }

    getText(text) {
        // @TODO: write analogue of util.format(text, ...args) from node js
        return translations[text][this.lang] || text;
    }

    resetCursor() {
        this.historyCursor = null;
    }

    getHistoryElem(direction) {
        const entries = this.history.length - 1; //Starts with 0!
        const showCurrent = this.showedBlank;
        let wantedCursor = null;

        if (this.historyCursor === null) {
            this.showedBlank = true;
            this.historyCursor = entries;
        }

        if (direction) {
            this.showedBlank = false;

            if (direction > 0 && !(this.historyCursor >= entries)) { //Move cursor forvard
                wantedCursor = this.historyCursor + 1;
            } else if (direction < 0 && this.historyCursor !== 0) { //Else move it backwards
                wantedCursor = this.historyCursor - 1;
            } else {
                this.showedBlank = true;
                return '';
            }
        }

        if (!showCurrent && wantedCursor !== null) {
            this.historyCursor = wantedCursor;
        }

        return this.history[this.historyCursor];
    }

    lookup(command) {
        return commandList.find((cmd) => cmd.indexOf(command) === 0);
    }

    execute(command) {
        if (command) {
            this.history.push(command);

            if (command.substr(0, 4) === 'sudo') {
                command = command.substr(4).trim();
            }

            const [cmd, ...args] = command.split(' ');
            this.resetCursor();

            if (!commands[cmd]) {
                return this.getText('Command not found');
            }

            return commands[cmd].apply(this, args);
        }
    }
}

window.Terminal = Terminal;
