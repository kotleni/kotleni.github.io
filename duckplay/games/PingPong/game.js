const MAX_FPS = 60
const MAX_TPS = 70

const PLATFORM_WIDTH = 20
const PLATFORM_HEIGHT = 160
const PLATFORM_SPEED = 4
const BALL_SIZE = 16
const BALL_SPEED = 6
const BALL_COLORS = [
    "160, 0, 0", "100, 0, 0", "100, 160, 0",
     "0, 160, 0", "0, 100, 0", "0, 100, 160",
    "0, 0, 160", "0, 0, 100", "160, 0, 100", "0, 0, 0"]
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

var colorIndex = 0
var ballColor = "255, 0, 0"

var stringYou = "You"
var stringBot = "Bot"

onload = function() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")

    // hack for testing in browser
    // var DuckPlay = {}
    // DuckPlay.getLanguage = function() { return "en" }
    // DuckPlay.isNightTheme = function() { return false }

    let lang = DuckPlay.getLanguage()

    if(lang == "ru") {
        stringYou = "Вы"
        stringBot = "Бот"
    }

    if(lang == "uk") {
        stringYou = "Ви"
        stringBot = "Бот"
    }

    // resize canvas
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    // if(canvas.height > canvas.width) {
    //     canvas.height = canvas.width
    //     canvas.style.marginTop = ((canvas.height - canvas.width) / 2).toString() + "px"
    // }

    onresize = function() {
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight

        // if(canvas.height > canvas.width) {
        //     canvas.height = canvas.width
        //     canvas.style.marginTop = ((canvas.height - canvas.width) / 2).toString() + "px"
        // }

        playerY = (canvas.height / 2) - (PLATFORM_HEIGHT / 2)
        botY = (canvas.height / 2) - (PLATFORM_HEIGHT / 2)

        ballX = canvas.width / 2
        ballY = canvas.height / 2
    }

    setInterval(updateRender, 1000 / MAX_FPS)
    setInterval(updateGame, 1000 / MAX_TPS)
    setInterval(function() {
        colorIndex += 1
        if(colorIndex >=  BALL_COLORS.length)
            colorIndex = 0

        ballColor = BALL_COLORS[colorIndex]
    }, 1000 / 40)

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
        event.preventDefault()
    })

    canvas.addEventListener('touchend', function(event) {
        clickX = -1
        clickY = -1
        event.preventDefault()
    })

    canvas.addEventListener('mousedown', function(event) {
        clickX = event.clientX
        clickY = event.clientY
        event.preventDefault()
    })

    canvas.addEventListener('mouseup', function(event) {
        clickX = -1
        clickY = -1
        event.preventDefault()
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
    context.fillText(stringBot + " : " + scoreBot.toString(), 30, 30);
    context.fillText(stringYou + " : " + scorePlayer.toString(), 30, 50);
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

    if(ballX < canvas.width/2) {
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