console.log('script is connected');

const gameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 300;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
}

class Component () {
    constructor (x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
    }

    move () {
        const ctx = gameArea.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    } 
}