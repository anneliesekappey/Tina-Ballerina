console.log('script is connected');

const gameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    stopTinas: [],
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        cleanStage()
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Component {
    constructor (x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
    }

    move () {
        const ctx = gameArea.context
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    } 

    moveAgain () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function stopTina () {
    let x = gameArea.canvas.width
    let minHeight = 80;
    let maxHeight = 150;
    let height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));

    let minWidth = 80;
    let maxWidth = 150;
    let width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));

    let notBallerina = new Component(x, 280, width, height, 'blue');
    gameArea.stopTinas.push(notBallerina)
}

function throwStopTina () {
    if (gameArea.frames % 180 === 0) {
        stopTina()
    }

    for (tina of gameArea.stopTinas) {
        tina.x -= 1
        tina.move();
    }

    gameArea.stopTinas = gameArea.stopTinas.filter(tina => tina.x > 0 + tina.width)
}

const ballerina = new Component(0, 280, 120, 120, 'pink');

function cleanStage () {
    gameArea.clear()
    ballerina.moveAgain()
    ballerina.move()
    throwStopTina()

    gameArea.frames += 1

    requestAnimationFrame(cleanStage)
}

document.addEventListener('keydown', (e) => {
    const key = e.code;
    switch (key) {
        case 'ArrowUp':
            ballerina.speedY -= 1;
            break;
        case 'ArrowDown':
            ballerina.speedY += 1;
            break;
        case 'ArrowRight':
            ballerina.speedX += 1;
            break;
        case 'ArrowLeft':
            ballerina.speedX -= 1
            break;
    }
})

document.addEventListener('keyup', (e) => {
    ballerina.speedX = 0
    ballerina.speedY = 0
})

