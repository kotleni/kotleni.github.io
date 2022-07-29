var image = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

var lines = document.getElementsByClassName("js-calendar-graph-svg")[0].childNodes[1].childNodes


var x = 0
var y = 0
for(var i = 0; i < lines.length; i += 1) {
    let line = lines[i].childNodes
    
    y = 0
    for(var ii = 0; ii < line.length; ii += 1) {
        let el = line[ii]

        el.onclick = function() {
            let value = el.attributes['data-level'].nodeValue
            if(value == "0")
                el.setAttribute("data-level", 1)
            else
            el.setAttribute("data-level", 0)
        }
        
        if(el.nodeName == "rect"){
            var level = 0
            if(x < 6 && y < 6) {
                level = image[y][x]
                console.log(level)
            }
            el.setAttribute("data-level", level)

            y += 1
        }
    }
    if(line.length > 0) {
        x += 1
    }
}
