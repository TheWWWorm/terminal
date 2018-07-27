'use strict';

window.onload = () => {

    console.log('App Started');

    //document.querySelector('.textToAppear').classList.toggle('textAppeared', true);

    const terminalInput = document.querySelector('#terminalInput');
    const terminalOutput = document.querySelector('#terminalOutput');
    const Terminal = new window.Terminal(navigator.language.substr(0, 2));
    //Maybe get navigator.deviceMemory, navigator.hardwareConcurrency and stuff to show machine init loading ?

    document.querySelectorAll('p').forEach((p) => {
        //p.innerHTML = p.innerHTML.trim().replace(/ /g, '&nbsp;')
    });

    function copyText() {
        const selected = document.getSelection().toString();

        if (selected) {
            document.execCommand('copy');
        }
    }

    document.onmouseup = copyText;

    function catchPress(event) {

        if (event.ctrlKey && event.keyCode === 65) { //Ctrl + A
        } else if (event.keyCode === 13) { //ENTER
            if (document.activeElement === terminalInput) {
                const command = terminalInput.value.trim();
                console.log(`Executing command, "${command}"`);
                terminalInput.value = '';

                terminalOutput.innerHTML = '> ' + (Terminal.execute(command) || '');
            } else {
                terminalInput.focus();
            }
        } else if ((event.keyCode === 38 || event.keyCode === 40) && document.activeElement === terminalInput) { //UP - 38, DOWN - 40
            event.preventDefault();
            if (!~Terminal.getHistoryElem().indexOf(terminalInput.value)) {
                Terminal.resetCursor();
            }

            terminalInput.value = Terminal.getHistoryElem(
                event.keyCode === 38 ? -1 : +1
            );
            //terminalInput.selectionEnd = terminalInput.value.length;
        } else if (event.keyCode === 9) { //TAB
            event.preventDefault();
            if (document.activeElement === terminalInput && terminalInput.value) {
                terminalInput.value = Terminal.lookup(terminalInput.value) || terminalInput.value;
            }
        }
    }

    document.onkeydown = catchPress;

};
