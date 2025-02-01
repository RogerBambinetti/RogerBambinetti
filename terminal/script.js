var TerminalEmulator = {
    init: function (screen) {
        var inst = Object.create(this);
        inst.screen = screen;
        inst.createInput();

        return inst;
    },

    createInput: function () {
        var inputField = document.createElement('div');
        var inputWrap = document.createElement('div');

        inputField.className = 'terminal_emulator__field';
        inputField.innerHTML = '';
        inputWrap.appendChild(inputField);
        this.screen.appendChild(inputWrap);
        this.field = inputField;
        this.fieldwrap = inputWrap;
    },


    enterInput: function (input) {
        return new Promise((resolve, reject) => {

            var speed = 1;
            var i = 0;
            var str = '';
            var type = () => {

                str = str + input[i];
                this.field.innerHTML = str.replace(/ /g, '&nbsp;');
                i++;

                setTimeout(() => {
                    if (i < input.length) {
                        if (i % 5 === 0) speed = 1;
                        type();
                    } else {
                        console.log('tick');
                        setTimeout(() => {
                            console.log('tock');
                            resolve();
                        }, 400);

                    }
                }, speed);


            };


            type();

        });
    },

    enterCommand: function () {
        return new Promise((resolve, reject) => {
            var resp = document.createElement('div');
            resp.className = 'terminal_emulator__command';
            resp.innerHTML = this.field.innerHTML;
            this.screen.insertBefore(resp, this.fieldwrap);

            this.field.innerHTML = '';
            resolve();
        })
    },

    enterResponse: function (response) {

        return new Promise((resolve, reject) => {
            var resp = document.createElement('div');
            resp.className = 'terminal_emulator__response';
            resp.innerHTML = response;
            this.screen.insertBefore(resp, this.fieldwrap);

            resolve();
        })


    },

    wait: function (time, busy) {
        busy = (busy === undefined) ? true : busy;
        return new Promise((resolve, reject) => {
            if (busy) {
                this.field.classList.add('waiting');
            } else {
                this.field.classList.remove('waiting');
            }
            setTimeout(() => {
                resolve();
            }, time);
        });
    },

    reset: function () {
        return new Promise((resolve, reject) => {
            this.field.classList.remove('waiting');
            resolve();
        });
    }

};


/*
 * 
 * This is where the magic happens
 *
 */


var TE = TerminalEmulator.init(document.getElementById('screen'));


async function runTerminalEmulator() {
    await TE.wait(1000, false);
    await TE.enterInput("Welcome to my GitHub profile!");
    await TE.enterCommand();
    await TE.enterResponse("Here you'll find some of my personal projects and contributions...");
    await TE.wait(2000);
    await TE.enterResponse('- style v9.9.9 installed.');
    await TE.wait(600);
    await TE.enterResponse('- markup v0.1.0 installed.');
    await TE.wait(600);
    await TE.enterResponse('- scripts v9.9.9 installed.');
    await TE.wait(300);
    await TE.enterResponse('- 10 billion dependencies installed.');
    await TE.wait(700);
    await TE.enterResponse('Make website responsive? (y/y)');
    await TE.wait(2000, false);
    await TE.enterInput('y');
    await TE.enterCommand();
    await TE.wait(400);
    await TE.enterResponse('Make website accessible? (y/y)');
    await TE.wait(1800, false);
    await TE.enterInput('y');
    await TE.enterCommand();
    await TE.wait(400);
    await TE.enterResponse('finalizing...');
    await TE.wait(2000);
    await TE.enterResponse('Website complete! Wasn\'t that easy?');
    await TE.reset();
}

runTerminalEmulator();

function captureScreenshot() {
    html2canvas(document.body).then(canvas => {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'screenshot.png';
        link.click();
    });
}

// Include the html2canvas library
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js';
script.onload = function () {
    captureScreenshot();
};
document.head.appendChild(script);