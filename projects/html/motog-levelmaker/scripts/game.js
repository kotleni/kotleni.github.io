const MAX_FPS = 60
const PINBOX_SIZE = 16
const PARALAX_OFFSETX = 10
const PARALAX_OFFSETY = 40

var canvas, context
var exportBtn, resetBtn, widthInput, allow25D

var trackLines = []
var lastMouseX, lastMouseY
var mouseX, mouseY

onload = function() {
    allow25D = document.getElementById("allow_25d")
    exportBtn = document.getElementById("export")
    resetBtn = document.getElementById("reset")
    widthInput = document.getElementById("map_width")
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")

    // resize canvas
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    widthInput.value = canvas.width
    allow25D.checked = true

    setInterval(updateRender, 1000 / MAX_FPS)

    resetBtn.onclick = resetTrack
    canvas.onmousedown = mouseDown
    canvas.onmouseup = mouseUp
    canvas.onmousemove = mouseMove
    onkeydown = keyPress
    widthInput.oninput = function() {
        canvas.width = widthInput.value
        resetTrack()
    }
    exportBtn.onclick = exportLevel
    resetTrack()
}

function updateRender() {
    context.fillStyle = "#fff"
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.strokeStyle = "#21fe2e"
    context.beginPath()
    context.moveTo(lastMouseX, lastMouseY)
    context.lineTo(mouseX, mouseY)
    context.stroke()

    context.strokeStyle = "#000"
    for(var i = 0; i < trackLines.length; i += 1) {
        let line = trackLines[i]

        // main line
        context.strokeStyle = "#000"
        context.beginPath()
        context.moveTo(line.xA, line.yA)
        context.lineTo(line.xB, line.yB)
        context.stroke()

        if(allow25D.checked) {
            // bg line
        context.strokeStyle = "#000"
        context.beginPath()
        context.moveTo(line.xA - PARALAX_OFFSETX, line.yA - PARALAX_OFFSETY)
        context.lineTo(line.xB - PARALAX_OFFSETX, line.yB - PARALAX_OFFSETY)
        context.stroke()

        // bg line
        context.strokeStyle = "#000"
        context.beginPath()
        context.moveTo(line.xB, line.yB)
        context.lineTo(line.xB - PARALAX_OFFSETX, line.yB - PARALAX_OFFSETY)
        context.stroke()
        }
    }

    let connect = findConnect()
    if(connect != undefined) {
        context.fillStyle = "green"
        context.rect(connect.x - (PINBOX_SIZE / 2), connect.y - (PINBOX_SIZE / 2), PINBOX_SIZE, PINBOX_SIZE)
        context.stroke()
    }
}

function findConnect() {
    for(var i = 0; i < trackLines.length; i += 1) {
        let line = trackLines[i]

        if(mouseX-PINBOX_SIZE < line.xA && mouseX+PINBOX_SIZE > line.xA 
            && mouseY-PINBOX_SIZE < line.yA && mouseY+PINBOX_SIZE > line.yA) {
            return { x: line.xA, y: line.yA }
        }

        if(mouseX-PINBOX_SIZE < line.xB && mouseX+PINBOX_SIZE > line.xB 
            && mouseY-PINBOX_SIZE < line.yB && mouseY+PINBOX_SIZE > line.yB) {
            return { x: line.xB, y: line.yB }
        }
    }
    return undefined
}

function resetTrack() {
    lastMouseX = undefined
    lastMouseY = undefined
    trackLines = []
    // start
    trackLines.push({
        xA: 0,
        yA: canvas.height/2,
        xB: 120,
        yB: canvas.height/2
    })
    // finish
    trackLines.push({
        xA: canvas.width-120,
        yA: canvas.height/2,
        xB: canvas.width+40,
        yB: canvas.height/2
    })
}

function keyPress(event) {
    if (event.keyCode == 90 && event.ctrlKey) {
        trackLines.pop()
        event.preventDefault()
    }
}

function mouseDown(event) {
    // lastMouseX = event.offsetX
    // lastMouseY = event.offsetY
    let connect = findConnect()
    if(connect != undefined) {
        lastMouseX = connect.x
        lastMouseY = connect.y
    }
}

function mouseMove(event) {
    mouseX = event.offsetX
    mouseY = event.offsetY
}

function mouseUp(event) {
    if(lastMouseX == undefined || lastMouseY == undefined) {
        return
    }

    var toX = event.offsetX
    var toY = event.offsetY

    let connect = findConnect()
    if(connect != undefined) {
        toX = connect.x
        toY = connect.y
    }

    let line = {
        xA: lastMouseX,
        yA: lastMouseY,
        xB: toX,
        yB: toY
    }
    trackLines.push(line)
    lastMouseX = undefined
    lastMouseY = undefined
}

function exportLevel() {
    let level = {
        version: 0,
        width: canvas.width,
        height: canvas.height,
        finalLine: 1,
        lines: trackLines
    }
    let json = JSON.stringify(level)
    console.log(json)
    alert(json)
}