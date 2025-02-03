console.log('hi')

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');



function clearCanvas(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,300,300)
    ctx.strokeRect(0, 0, 300,300);
}

clearCanvas()

let snake = [
    {
        x:150,
        y:150
    },
    {
        x:140,
        y:150
    },
    {
        x:130,
        y:150
    },
    {
        x:120,
        y:150
    },
    {
        x:110,
        y:150
    }
];

let dx = 10;
let dy = 0;


function drawSnakePart(snakePart){
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10,10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
}

function changeDirection(event){
    const keyPressed = event.key;
    const goingUp = (dy === -10);
    const goingDown = (dy === 10);
    const goingRight = (dx === 10);
    const goingLeft = (dx === -10);

    if((keyPressed === 'ArrowLeft' || keyPressed ==='a') && !goingRight){
        dx = -10;
        dy = 0;
    }

    if((keyPressed === "ArrowUp" || keyPressed==='w') && !goingDown){
        dx = 0;
        dy = -10;
    }

    if((keyPressed === "ArrowRight" || keyPressed ==='d') && !goingLeft){
        dx = 10;
        dy = 0;
    }

    if((keyPressed === "ArrowDown" || keyPressed ==='s')&& !goingUp){
        dx = 0;
        dy = 10;
    }
}


function undrawSnakePart(snakePart){
    ctx.fillStyle = 'white';
    ctx.strokestyle = 'white';
    ctx.fillRect(snakePart.x, snakePart.y, 20,20);
    ctx.strokeRect(snakePart.x, snakePart.y, 0,0);
}

function drawSnake(){
    snake.forEach(drawSnakePart)
}

drawSnake();

function advanceSnake(direction){
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }

    snake.unshift(head);
    snake.pop();
}

function main(){
    setTimeout(function onTick(){
        clearCanvas();
        advanceSnake();
        drawSnake();
        main();
    },100);
}

document.addEventListener("keydown", changeDirection)











