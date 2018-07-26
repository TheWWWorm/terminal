'use strict';

window.onload = () => {

    console.log('App Started');

    const terminalInput = document.querySelector('#terminalInput');
    const terminalOutput = document.querySelector('#terminalOutput');
    const Terminal = new window.Terminal();

    document.querySelectorAll('p').forEach((p) => {
        //p.innerHTML = p.innerHTML.trim().replace(/ /g, '&nbsp;')
    });

    function copyText() {
        const selected = document.getSelection().toString();

        if (selected) {
            document.execCommand('copy')
        }
    }

    document.onmouseup = copyText;

    function catchPress(event) {

        if (event.ctrlKey && event.keyCode === 65) { //Ctrl + A
        }
        if (event.keyCode === 13) { //Enter
            if (document.activeElement === terminalInput) {
                const command = terminalInput.value.trim();
                console.log(`Executing command, "${command}"`);
                terminalInput.value = '';
                
                terminalOutput.innerHTML = '> ' + Terminal.execute(command);
            } else {
                terminalInput.focus();
            }
        }
    }

    document.onkeydown = catchPress;

};
