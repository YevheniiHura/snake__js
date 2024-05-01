const gameFiled = document.querySelector(".game__field");
const gameScore = document.querySelector(".game__score");
const gameRecordScore = document.querySelector(".game__record");
const gameControls = document.querySelectorAll(".game__controls span");

let gameOver = false;
let appleX, appleY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

const updateAppleAppearance = () => {
  appleX = Math.floor(Math.random() * 30) + 1;
  appleY = Math.floor(Math.random() * 30) + 1;
}

let recordScore = localStorage.getItem("game__record") || 0;
gameRecordScore.innerText = `Record Score: ${recordScore}`;


const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over:( If you want to try again - press 'OK");
    location.reload();
}

const changeDirection = e => {
    if (window.innerWidth > 800 && document.querySelector('.game__controls').style.display === 'flex') {
        return;
    }

    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


gameControls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {

    if (gameOver) {
        return handleGameOver();
    }

    let htmlCode = `<div class="apple" style="grid-area: ${appleY} / ${appleX}"></div>`;
    
    if (snakeX === appleX && snakeY === appleY) {
        updateAppleAppearance();
        snakeBody.push([appleY, appleX]);
        score++;
        recordScore = score >= recordScore ? score : recordScore;
        localStorage.setItem("game__record", recordScore);
        gameScore.innerText = `Score: ${score}`;
        gameRecordScore.innerText = `Record Score: ${recordScore}`;
    }
    

    snakeX += velocityX;
    snakeY += velocityY;
    

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; 

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlCode += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    gameFiled.innerHTML = htmlCode;
}
updateAppleAppearance();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
document.addEventListener("keydown", changeDirection);