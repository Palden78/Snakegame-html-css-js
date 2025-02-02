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

function drawSnakePart(snakePart){
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10,10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
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

function rightadvanceSnake(){
    const dx = 10;

    const head = {
        x: snake[0].x + dx,
        y: snake[0].y 
    }

    snake.unshift(head);
    snake.pop();
}

let firstUp = true
function upadvanceSnake(){
    console.log(firstUp);
    if (firstUp){
        console.log(firstUp);
        rightadvanceSnake()
        firstUp = false;
    }
    console.log(firstUp);
    const dx = 0;
    const dy = -10;

    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }

    snake.unshift(head);
    snake.pop();
}



document.body.addEventListener('keydown', (event)=>{
    if(event.key ==='d'){
        clearCanvas()
        rightadvanceSnake();
        drawSnake();
    }
    else if(event.key==='w'){
        clearCanvas()
        upadvanceSnake();
        drawSnake();
    }else if(event.key==='s'){
        playGame('scissors');
    }
});

function main(){
    setTimeout(function onTick(){
        clearCanvas();
        advanceSnake();
        drawSnake();
        main();
    },100);
}







