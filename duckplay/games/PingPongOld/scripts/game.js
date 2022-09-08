const MAX_FPS = 60
const MAX_TPS = 70

const PLATFORM_WIDTH = 20
const PLATFORM_HEIGHT = 160
const PLATFORM_SPEED = 4
const BALL_SIZE = 16
const BALL_SPEED = 6
const BALL_SHADOWSIZE = 6
const BALL_RANDOMIZE = 4
var canvas, context
var isPaused = false

var scoreBot = 0
var scorePlayer = 0

var playerY = 0
var botY = 0

var ballX = 0
var ballY = 0
var ballSpeedX = BALL_SPEED
var ballSpeedY = BALL_SPEED

var clickX = -1
var clickY = -1

var lastBalls = []

const ballColor = "255, 255, 255"

onload = function() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")

    // resize canvas
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    onresize = function() {
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight

        playerY = (canvas.height / 2) - (PLATFORM_HEIGHT / 2)
        botY = (canvas.height / 2) - (PLATFORM_HEIGHT / 2)

        ballX = canvas.width / 2
        ballY = canvas.height / 2
    }

    setInterval(updateRender, 1000 / MAX_FPS)
    setInterval(updateGame, 1000 / MAX_TPS)

    playerY = (canvas.height / 2) - (PLATFORM_HEIGHT / 2)
    botY = (canvas.height / 2) - (PLATFORM_HEIGHT / 2)

    ballX = canvas.width / 2
    ballY = canvas.height / 2

    canvas.addEventListener('touchstart', function(event) {
        let touches = event.changedTouches
        let x = touches[0].clientX
        let y = touches[0].clientY

        clickX = x
        clickY = y
    })

    canvas.addEventListener('touchend', function(event) {
        clickX = -1
        clickY = -1
    })

    canvas.addEventListener('mousedown', function(event) {
        clickX = event.clientX
        clickY = event.clientY
    })

    canvas.addEventListener('mouseup', function(event) {
        clickX = -1
        clickY = -1
    })
}

function updateRender() {
    // bg
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // player
    context.fillStyle = "white"
    context.fillRect(canvas.width - (PLATFORM_WIDTH*2), playerY, PLATFORM_WIDTH, PLATFORM_HEIGHT)

    // bot
    context.fillStyle = "white"
    context.fillRect((PLATFORM_WIDTH), botY, PLATFORM_WIDTH, PLATFORM_HEIGHT)

    // ball
    context.fillStyle = "rgb(" + ballColor.toString() + ")"
    context.fillRect(ballX - (BALL_SIZE / 2), ballY - (BALL_SIZE/ 2), BALL_SIZE, BALL_SIZE)

    for(var i = 0; i < lastBalls.length; i += 1) {
        let ball = lastBalls[i]
        let alpha = 0.4 + (i / 10)
        context.fillStyle = "rgba(" + ball.color + ", " + alpha.toString() + ")"
        context.fillRect(ball.x - (BALL_SIZE / 2), ball.y - (BALL_SIZE/ 2), BALL_SIZE, BALL_SIZE)
    }

    // score player
    context.fillStyle = "white"
    context.font = "22px monospace";
    context.fillText("Bot : " + scoreBot.toString(), 30, 30);
    context.fillText("You : " + scorePlayer.toString(), 30, 50);
}

function updateGame() {
    if(isPaused) return

    if(lastBalls.length > BALL_SHADOWSIZE)
        lastBalls.shift()
    lastBalls.push({x:ballX, y:ballY,color:ballColor})

    ballX += ballSpeedX
    ballY += ballSpeedY

    if(ballX > canvas.width) {
        ballSpeedX = -(BALL_SPEED + getBallRandom())
        scorePlayer += 1
        ballX = canvas.width / 2
        ballY = canvas.height / 2
    }
    if(ballX < 0) {
        ballSpeedX = BALL_SPEED + getBallRandom()
        scoreBot += 1
        ballX = canvas.width / 2
        ballY = canvas.height / 2
    }
    if(ballY > canvas.height)
        ballSpeedY = -(BALL_SPEED + getBallRandom())
    if(ballY < 0)
        ballSpeedY = BALL_SPEED + getBallRandom()

    if(ballY > botY && ballY < (botY + PLATFORM_HEIGHT)) {
        if(ballX > PLATFORM_WIDTH && ballX < (PLATFORM_WIDTH*2)) {
            ballSpeedX = -(ballSpeedX + getBallRandom())
        }
    }

    if(ballY > playerY && ballY < (playerY + PLATFORM_HEIGHT)) {
        if(ballX > canvas.width - (PLATFORM_WIDTH*2) && ballX < (canvas.width - (PLATFORM_WIDTH))) {
            ballSpeedX = -(ballSpeedX + getBallRandom())
        }
    }

    if(clickX != -1 && clickY != -1) {
        if(clickX > canvas.width/2) {
            if(clickY < canvas.height/2) { // up
                playerY -= PLATFORM_SPEED
            } else if(clickY > canvas.height/2) { // down
                playerY += PLATFORM_SPEED
            }
        }
    }

    // bot
    let botYCenter = botY + (PLATFORM_HEIGHT / 2)

    if(true) {
        if(botYCenter > ballY)
            botY -= PLATFORM_SPEED
        if(botYCenter < ballY)
            botY += PLATFORM_SPEED
    }
}

function getBallRandom() {
    if(Math.random() > 0.5) {
        return 1
    }

    return Math.random() * BALL_RANDOMIZE
}