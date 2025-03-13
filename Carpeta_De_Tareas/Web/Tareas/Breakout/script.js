// Tablero
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Jugador
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x : boardWidth / 2 - playerWidth / 2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
}

// Pelota
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x : boardWidth / 2,
    y : boardHeight / 2,
    height : ballHeight,
    width : ballWidth,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Se crea el jugador
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    // Jugador
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Pelota
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Que la pelota rebote al chocar con la pared
    if (ball.y <= 0) {
        // Si la pelota choca con la pared superior, se invierte su dirección.
        ball.velocityY *= -1; 
    } else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) { 
        // Si la pelota cualquiera de las paredes laterales, se invierte su dirección.
        ball.velocityX *= -1;
    } else if (ball.y + ball.height >= boardHeight) {
        // Se pierde una vida
    }


}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer (e) {
    if (e.code == "ArrowLeft") {
        let nextPlayerX = player.x - player.velocityX;
        if (!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX;
        }
    } else if (e.code == "ArrowRight") {
        let nextPlayerX = player.x + player.velocityX;
        if (!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && 
            a.x + a.width > b.x && 
            a.y < b.y + b.height && 
            a.y + a.height > b.y;
}

function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block)
}
