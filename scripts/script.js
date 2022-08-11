//console.log('script is connected');//

const gameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    stopTinas: [],
    question: false,
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        cleanStage()
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function () {
        const points = Math.floor(this.frames / this.question);
        this.context.font = '14px arial';
        this.context.fillStyle = 'purple';
        this.context.fillText(`Score: ${points}, 350, 50`);
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

    top () {
        return this.y
    }

    bottom () {
        return this.y + this.height
    }

    left () {
        return this.x
    }

    right () {
        return this.x + this.width
    }

    crashInto(stopTinas) {
        return ! (
            this.bottom() < tina.top()
            || this.top() > tina.bottom()
            || this.right() < tina.left()
            || this.left() > tina.right()
        )
    }
}

function stopTina () {
    let x = gameArea.canvas.width
    let minHeight = 40;
    let maxHeight = 120;
    let height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));

    let minWidth = 40;
    let maxWidth = 90;
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

function checkPointQuestion () {
    const crashed = gameArea.stopTinas.some(tina => ballerina.crashInto(tina))
    if (crashed) {
        gameArea.question = true
    }
}

const ballerina = new Component(0, 280, 120, 120, 'pink');

function cleanStage () {
    gameArea.clear()
    ballerina.moveAgain()
    ballerina.move()
    throwStopTina()

    gameArea.frames += 1

    checkPointQuestion()
    if (!gameArea.question) {
    requestAnimationFrame(cleanStage)
    }
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

