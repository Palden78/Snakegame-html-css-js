const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

let Xfood = 0;
let Yfood = 0;
let GameScore = 0;
let changingDirection;
let Level = 1;


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

    if (changingDirection){
        return;
    }

    changingDirection = true;
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

function advanceSnake(){
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }

    snake.unshift(head);
    const SnakeAteFood = 
        (snake[0].x === Xfood && snake[0].y ===Yfood)
    if(SnakeAteFood){
        createFood();
        GameScore +=10;
        document.querySelector('.score').innerHTML = `Score: ${GameScore}`;
    }else{
        snake.pop();
    }
}

let GameOverMan = false;

let LevelGame = 100;
function main(Level){
    switch(Level){
        case 2:
            LevelGame = 80;
            break;
        case 3:
            LevelGame = 60;
            break;
        case 4:
            LevelGame = 50; 
            break;
        case 5:
            LevelGame = 49; 
            break;
        case 6:
            LevelGame = 45; 
            break;
        default:
            LevelGame = 100;
            break;
    }

    if(GameEnd()){
        document.querySelector('.StartButton').innerHTML = 'Play again';
        GameOverMan = true;
        document.querySelector('.score').innerHTML = `Your final score is ${GameScore} :D`
        return;
    }
    GameOverMan = false;

    setTimeout(function onTick(){
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main(Level);
    },LevelGame);
}

document.addEventListener("keydown", changeDirection)

snake.forEach(function isFoodOnSnake(part){
    const FoodIsOnSnake = (part.x === Xfood && part.y === Yfood)
    if(!FoodIsOnSnake){
        createFood();
    }
})

createFood();

function drawFood(){
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(Xfood,Yfood,10,10);
    ctx.strokeRect(Xfood,Yfood,10,10);    
}

export function randomLocation(min,max){
    return Math.round((Math.random()*(max-min) +min)/10) *10;
}

export function createFood(){
    Xfood = randomLocation(0, (300-10));
    Yfood = randomLocation(0, (300-10));
}

function GameEnd(){
    for(let i = 4 ; i < snake.length; i++){
        const Collided = (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        if (Collided){
            return true
        }
    }

    const HitLeftWall = snake[0].x < 0;
    const HitRightWall = snake[0].x > 290;
    const HitTopWall = snake[0].y <0;
    const HitBottomWall = snake[0].y > 290;

    return (HitLeftWall || HitRightWall || HitTopWall || HitBottomWall)
}

const radioButtons = document.querySelectorAll('input[name=SelectLevel]');

// Add a change event listener to each radio button
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        let level = document.querySelector('input[name=SelectLevel]:checked');
        
        if (level) {
            console.log(level.value);
            Level = parseInt(level.value);
        } else {
            console.log("No radio button with the name 'SelectLevel' is checked.");
        }
    });
});






document.querySelector('.StartButton').addEventListener('click',()=>{

    if(GameOverMan){
        document.querySelector('.score').innerHTML='Score: 0'
        clearCanvas()
        snake = [
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
        ]
        drawSnake();
        createFood();
        GameOverMan = false;
    }
    else{
        main(Level);
    }
})











