/*
 * Implementación del juego Breakout
 * 
 * Autor: Juan de Dios Gastélum Flores
 * Fecha: 2025-03-12
 */

"use strict";

// Configuración del juego
const canvasWidth = 790;
const canvasHeight = 600;
const paddleVelocity = 2.5;
const initialSpeed = 2.0;
let score = 0;
let lives = 3;
let oldTime;

// Contexto del canvas
let ctx;

// Configuración de los bloques
let bricks = [];
const brickRows = 4;
const brickCols = 10;
const brickWidth = 70;
const brickHeight = 30;
const brickPadding = 8;

class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.velocity = new Vec(initialSpeed * (Math.random() < 0.5 ? 1 : -1), -initialSpeed);
        this.inPlay = true;
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        // Rebote en los bordes de la pantalla
        if (this.position.x <= 0 || this.position.x + this.width >= canvasWidth) {
            this.velocity.x *= -1;
        }
        if (this.position.y <= 0) {
            this.velocity.y *= -1;
        }
    }

    reset() {
        this.position = new Vec(canvasWidth / 2 - this.width / 2, canvasHeight / 2);
        this.velocity = new Vec(initialSpeed * (Math.random() < 0.5 ? 1 : -1), -initialSpeed);
        this.inPlay = true;
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0, 0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        // Limitar el movimiento dentro del área de juego
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > canvasWidth) this.position.x = canvasWidth - this.width;
    }
}

class Brick extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "brick");
        this.destroyed = false;
    }
}

// Generación de los bloques en el área de juego
function createBricks() {
    const startY = 50;
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];
    
    for (let row = 0; row < brickRows; row++) {
        for (let col = 0; col < brickCols; col++) {
            const x = col * (brickWidth + brickPadding) + brickPadding;
            const y = row * (brickHeight + brickPadding) + startY;
            bricks.push(new Brick(new Vec(x, y), brickWidth, brickHeight, colors[row % colors.length]));
        }
    }
}

// Verifica colisiones con la paleta y los bloques
function checkCollisions(ball, paddle) {
    // Colisión con la paleta
    if (ball.position.y + ball.height >= paddle.position.y &&
        ball.position.x + ball.width >= paddle.position.x &&
        ball.position.x <= paddle.position.x + paddle.width) {
        ball.velocity.y *= -1;
        ball.position.y = paddle.position.y - ball.height;
    }

    // Colisión con los bloques
    bricks.forEach(brick => {
        if (!brick.destroyed &&
            ball.position.x + ball.width >= brick.position.x &&
            ball.position.x <= brick.position.x + brick.width &&
            ball.position.y + ball.height >= brick.position.y &&
            ball.position.y <= brick.position.y + brick.height) {
            brick.destroyed = true;
            ball.velocity.y *= -1;
            score += 10;

            /*
                Funcionalidad Adicional: Por cada 5 bloques destruidos,
                la velocidad de la pelota aumenta un 10%.
            */
            if (bricks.filter(brick => brick.destroyed).length % 5 === 0) {
                ball.velocity = ball.velocity.times(1.1);
            }
        }
    });

    /*
        Funcionalidad Adicional: Al perder una vida, la paleta aumenta de tamaño.
    */
    if (ball.position.y + ball.height > canvasHeight) {
        lives--;
        paddle.width += 10;
        ball.reset();
    }
}

// Inicialización del juego
function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    createBricks();
    const paddle = new Paddle(new Vec(canvasWidth / 2 - 50, canvasHeight - 30), 100, 20, "blue");
    const ball = new Ball(new Vec(canvasWidth / 2 - 10, canvasHeight / 2), 20, 20, "red");

    createEventListeners(paddle);
    drawScene(0, paddle, ball);
}

// Eventos de teclado para mover la paleta
function createEventListeners(paddle) {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key === 'ArrowRight') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

// Renderiza la escena y actualiza el estado del juego
function drawScene(newTime, paddle, ball) {
    if (oldTime === undefined) oldTime = newTime;
    const deltaTime = (newTime - oldTime) / 10;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Verificar si el juego ha terminado
    if (lives <= 0) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER", canvasWidth / 2 - 100, canvasHeight / 2);
        return;
    }

    // Verificar si el jugador ha ganado
    if (bricks.every(brick => brick.destroyed)) {
        ctx.fillStyle = "green";
        ctx.font = "40px Arial";
        ctx.fillText("YOU WIN!", canvasWidth / 2 - 100, canvasHeight / 2);
        return;
    }

    // Actualizar objetos del juego
    paddle.update(deltaTime);
    ball.update(deltaTime);
    checkCollisions(ball, paddle);

    // Si la pelota cae, se pierde una vida y la paleta aumenta su tamaño
    if (ball.position.y + ball.height > canvasHeight) {
        lives--;
        paddle.width += 10;
        ball.reset();
    }

    // Dibujar objetos
    paddle.draw(ctx);
    ball.draw(ctx);
    bricks.forEach(brick => !brick.destroyed && brick.draw(ctx));

    // Mostrar información del juego
    const bricksDestroyed = bricks.filter(brick => brick.destroyed).length;
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Bloques destruidos: ${bricksDestroyed}`, 10, 30);
    ctx.fillText(`Vidas: ${lives}`, canvasWidth - 100, 30);

    oldTime = newTime;
    requestAnimationFrame((t) => drawScene(t, paddle, ball));
}