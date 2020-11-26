var blocks = [[10, 10, 100, 100], [300, 10, 150, 100]]; // x, y, w, h
var selected = -1

onload = function() {
  onmousemove = function(p) {
    if(selected > -1) {
      blocks[selected][0] = p.clientX;
      blocks[selected][1] = p.clientY;

      console.log(selected);
    }
  }

  onmousedown = function(p) {
    for(var i = 0; i < blocks.length; i++) {
      var item = blocks[i];
      if(p.clientX > item[0])
        if(p.clientY > item[1])
          if(p.clientX < item[0] + item[2])
            if(p.clientY < item[1] + item[3])
              selected = i;
    }
  }

  onmouseup = function(p) { selected = -1; }

  var canva = document.getElementById("canvas");
  canva.width = 600;
  canva.height = 600;
  var ctx = canva.getContext("2d");

  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    for(var i = 0; i < blocks.length; i++) {
      var item = blocks[i];
      ctx.fillRect(item[0], item[1], item[2], item[3]);
    }

  }, 1000 / 60);
}
