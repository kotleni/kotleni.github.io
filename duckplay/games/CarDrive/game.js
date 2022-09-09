var wheelBehind;
var wheelAhead;
var car1;
var terrain;
var gravity = 0.15;
var _canvas;
function startGame() {
    wheelBehind = new wheel(601, 100,0, 25, "wheel.png",  "image");
    wheelAhead = new wheel(599, 100,0, 25, "wheel.png",  "image");
    car1 = new car(wheelAhead,wheelBehind, 75,25, "body.png","image");
    terrain = new terrain([200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250,200,300,325,325,300,260,250,290,370,500,450,425,400,375,300,310,340,310,250], 150);
    myGameArea.start();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      //make the canvas and stuff.
        _canvas = this.canvas
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        // 39 - right
        // 37 - left

        window.addEventListener('touchstart', function (e) {
          myGameArea.keys = (myGameArea.keys || []);

          let touches = event.changedTouches
          let x = touches[0].clientX
          let y = touches[0].clientY

          if(x > _canvas.width/2) {
            myGameArea.keys[39] = true;
          } else {
            myGameArea.keys[37] = true;
          }

          e.preventDefault()
        })

        window.addEventListener('touchend', function (e) {
          myGameArea.keys[39] = false;
          myGameArea.keys[37] = false;
          e.preventDefault()
        })

        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function impulses(impX, impY, impAng)
{
  this.impX = impX;
  this.impY = impY;
  this.impAng = impAng;
}
function car(wheelAhead, wheelBehind, l1, l2, color, type)
{
  this.type = type;
  if (type == "image") {
      this.image = new Image();
      this.image.src = color;
  }
  this.mass = 10;
  this.wheelAhead = wheelAhead;
  this.wheelBehind = wheelBehind;
  this.l1 = l1;
  this.l2 = l2;
  this.angleCOG = Math.atan(l2/l1);
  this.lengthCOG = Math.sqrt(l1 * l1 + l2 * l2);
  this.kHorizontal = 0.5;
  this.kVerticle = 0.22;

  this.springX = 0;
  this.springY = 0;
  this.springX1 = 0;
  this.springY1 = 0;

  this.springXP = 0;
  this.springYP = 0;
  this.springX1P = 0;
  this.springY1P = 0;

  this.x = 320;
  this.y = 100;
  this.xVel = 0;
  this.yVel = 0;


  this.wheelAhead.x = (l1 + this.x);
  this.wheelAhead.y = (l2 + this.y);
  this.wheelBehind.x = (-l1 + this.x);
  this.wheelBehind.y = (l2 + this.y);

  this.xImp = 0;
  this.yImp = 0;

  this.dir = 0;
  this.angVel = 0;
  this.angImp = 0;
  this.display = function(){
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x -terrain.scrollX, this.y -terrain.scrollY);
      ctx.rotate(this.dir);
      ctx.fillStyle = this.color;
      if (this.type == "image")
          ctx.drawImage(this.image, -121, -48, 263, 92);
      else
          ctx.fillRect(this.l1 / -1, 10 / -1, 2*this.l1, 2*10);
      ctx.restore();
  }
  this.springForcesAll  = function()
  {

    var carXRot = this.x * Math.cos(this.dir) + this.y * Math.sin(this.dir);
    var carYRot = -this.y * Math.cos(this.dir) + this.x * Math.sin(this.dir);

    var wheelXRot = this.wheelBehind.x * Math.cos(this.dir) + this.wheelBehind.y * Math.sin(this.dir);
    var wheelYRot = -this.wheelBehind.y * Math.cos(this.dir) + this.wheelBehind.x * Math.sin(this.dir);

    this.springX = carXRot - this.l1 - wheelXRot;
    this.springY = carYRot - this.l2 - wheelYRot;

    var wheelxImpRot = this.springX * this.kHorizontal + 0.1*(this.springX - this.springXP);
    var wheelyImpRot = this.springY * this.kVerticle+0.1*(this.springY - this.springYP);

    this.springXP = this.springX;
    this.springYP = this.springY;

    this.wheelBehind.xImp += wheelxImpRot * Math.cos(this.dir) + wheelyImpRot * Math.sin(this.dir);
    this.wheelBehind.yImp += -wheelyImpRot * Math.cos(this.dir) + wheelxImpRot * Math.sin(this.dir);

    var wheelXRot1 = this.wheelAhead.x * Math.cos(this.dir) + this.wheelAhead.y * Math.sin(this.dir);
    var wheelYRot1 = -this.wheelAhead.y * Math.cos(this.dir) + this.wheelAhead.x * Math.sin(this.dir);

    this.springX1 = carXRot + this.l1 - wheelXRot1;
    this.springY1 = carYRot - this.l2 - wheelYRot1;

    var wheelxImpRot1 = this.springX1 * this.kHorizontal+ 0.1*(this.springX1 - this.springX1P);
    var wheelyImpRot1 = this.springY1 * this.kVerticle+ 0.1*(this.springY1 - this.springY1P);

    this.springX1P = this.springX1;
    this.springY1P = this.springY1;

    this.wheelAhead.xImp += wheelxImpRot1 * Math.cos(this.dir) + wheelyImpRot1 * Math.sin(this.dir);
    this.wheelAhead.yImp += -wheelyImpRot1 * Math.cos(this.dir) + wheelxImpRot1 * Math.sin(this.dir);

    var carXImpRot = -(wheelxImpRot1 + wheelxImpRot)/this.mass;
    var carYImpRot = -(wheelyImpRot1 + wheelyImpRot)/this.mass;

    this.xImp = carXImpRot * Math.cos(this.dir) + carYImpRot * Math.sin(this.dir);
    this.yImp = -carYImpRot * Math.cos(this.dir) + carXImpRot * Math.sin(this.dir);

    this.angImp = this.l1 * (wheelyImpRot1 - wheelyImpRot)/(1/3 * this.mass *this.l1 * this.l1);

  }
  this.doForces = function()
  {
    this.yImp +=gravity;
    this.yVel += this.yImp;
    this.xVel += this.xImp;
    this.angVel += this.angImp;
    this.dir += this.angVel;
    this.x += this.xVel;
    this.y += this.yVel;
  }
  this.controls = function()
  {
    if (myGameArea.keys && myGameArea.keys[39])
    {
      this.wheelBehind.angImp += 0.1;
    }
    if (myGameArea.keys && myGameArea.keys[37])
    {
      this.wheelBehind.angImp -= 0.1;
    }
  }
  /*this.setWheels = function()
  {
    this.wheelAhead.x = this.x - this.l2 * Math.sin(this.dir) + this.l1 * Math.cos(this.dir);
    this.wheelAhead.y = this.y + this.l2 * Math.cos(this.dir) + this.l1 * Math.sin(this.dir);

    this.wheelBehind.x = this.x - this.l2 * Math.sin(this.dir) - this.l1 * Math.cos(this.dir);
    this.wheelBehind.y = this.y + this.l2 * Math.cos(this.dir) - this.l1 * Math.sin(this.dir);

    this.wheelAhead.xVel = this.xVel - this.angVel * this.lengthCOG * Math.sin(this.dir + this.angleCOG);
    this.wheelAhead.yVel = this.yVel + this.angVel * this.lengthCOG * Math.cos(this.dir + this.angleCOG);

    this.wheelBehind.xVel = this.xVel + this.angVel * this.lengthCOG * Math.sin(this.dir - this.angleCOG);
    this.wheelBehind.yVel = this.yVel - this.angVel * this.lengthCOG * Math.cos(this.dir - this.angleCOG);
  }
  this.setCar = function()
  {
    this.xVel += (this.wheelAhead.xImp + this.wheelBehind.xImp);
    this.yVel += (this.wheelAhead.yImp + this.wheelBehind.yImp);

    this.x += this.xVel;
    this.y += this.yVel;
    this.angVel += 2/this.lengthCOG * (this.wheelAhead.yImp * Math.cos(this.dir + this.angleCOG) - this.wheelAhead.xImp* Math.sin(this.dir + this.angleCOG));
    this.angVel += 2/this.lengthCOG * (this.wheelBehind.yImp * Math.cos(-this.dir + this.angleCOG) - this.wheelBehind.xImp* Math.sin(-this.dir + this.angleCOG));
  }*/
}
function wheel(x, y, dir, r, color, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.r = r;
    this.x = x;
    this.y = y;
    this.contactPoints = 0;

    this.bouncy = 0.2;
    this.sfriction = 2;
    this.kfriction = 1.6;

    this.xVel = 0;
    this.yVel = 0;
    this.xImp = 0;
    this.yImp = 0;

    this.dir = dir;
    this.angVel = 0;
    this.angImp = 0;

    this.color = color;
    this.display = function(){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x -terrain.scrollX, this.y -terrain.scrollY)
        ctx.rotate(this.dir);
        ctx.fillStyle = this.color;
        if (type == "image")
            ctx.drawImage(this.image, this.r / -1, this.r / -1, 2*this.r, 2*this.r);
        else
            ctx.fillRect(this.r / -1, this.r / -1, 2*this.r, 2*this.r);
        ctx.restore();
    }
    this.changeColor = function(newcolor){
      this.color = newcolor;
      if (type == "image"){
          this.image.src = newcolor;
      }
    }
    this.resetImp = function()
    {
            this.contactPoints = 0;
            this.yImp =0 ;
            this.xImp =0 ;
            this.angImp =0 ;
    }
    this.calculateImpulse = function(platAng)
    {
      var rotXVel = this.xVel * Math.cos(platAng) + this.yVel * Math.sin(platAng);
      var rotYVel = -this.yVel * Math.cos(platAng) + this.xVel * Math.sin(platAng);
      var rotXImp;
      var rotYImp;
      rotYImp = -rotYVel * (1 + this.bouncy);
      if (Math.abs(this.angVel * this.r - rotXVel) / 3 < Math.abs(this.sfriction * rotYImp))
      {
        rotXImp = (this.angVel * this.r - rotXVel) / 3;
      }
      else
      {
        if (this.angVel * this.r > rotXVel)
        {
          rotXImp = Math.abs(this.kfriction * rotYImp);
        }
        else
        {
          rotXImp = -Math.abs(this.kfriction * rotYImp);
        }
      }
      this.angImp += -2/this.r * rotXImp/this.contactPoints;

      this.xImp += rotXImp * Math.cos(platAng) + rotYImp * Math.sin(platAng)/this.contactPoints;
      this.yImp += -rotYImp * Math.cos(platAng) + rotXImp * Math.sin(platAng)/this.contactPoints;
    }
    this.intersection = function(x1,y1,x2,y2)
    {
      var e1x = x2 - x1;
      var e1y = y2 - y1;
      var area = e1x * e1x + e1y * e1y;
      var e2x = this.x - x1;
      var e2y = this.y - y1;
      var val = e1x * e2x + e1y * e2y;
      var on =  (val > 0 && val < area);

      var lenE1 = Math.sqrt(e1x * e1x + e1y * e1y);
      var lenE2 = Math.sqrt(e2x * e2x + e2y * e2y);
      var cos = val/(lenE1 * lenE2);

      var projLen = cos * lenE2;
      var px = x1 + (projLen * e1x)/lenE1;
      var py = y1 + (projLen * e1y)/lenE1;
      var distance = Math.sqrt((px - this.x) * (px - this.x) + (py - this.y) * (py - this.y));
      return (on && distance < this.r);
    }
    this.intersectPoint = function(x,y)
    {
      var distance = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y)*(y - this.y));
      return (distance < this.r);
    }
    this.doforces = function()
    {
      this.yImp +=gravity;
      this.yVel += this.yImp;
      this.xVel += this.xImp;
      this.angVel += this.angImp;
      this.dir += this.angVel;
      this.x += this.xVel;
      this.y += this.yVel;
      this.angVel *= 0.97;
    }
}
function terrain(arrY, dx)
{
  this.scrollX = 0;
  this.scrollY = 0;
  this.arrY = arrY;
  this.dx = dx;
  this.display = function(){
      ctx = myGameArea.context;
      ctx.beginPath();
      ctx.moveTo( - this.scrollX, arrY[0] -this.scrollY);
      for (var i = 1; i < arrY.length; i++)
      {
        ctx.lineTo((i * dx - this.scrollX) + (45 / 2), (arrY[i] -this.scrollY) + (35 / 2))
        ctx.lineWidth = 5;
	      ctx.strokeStyle = '#303030';
      }
      ctx.stroke();

      ctx.beginPath();
      for (var i = 1; i < arrY.length; i++)
      {
        ctx.lineTo((i * dx - this.scrollX) - 45, (arrY[i] -this.scrollY) - 35);
        ctx.lineWidth = 5;
	      ctx.strokeStyle = '#404040';
      }
      ctx.stroke();

      for (var i = 1; i < arrY.length; i++)
      {
        ctx.beginPath();
        ctx.moveTo((i * dx - this.scrollX) + (45 / 2), (arrY[i] -this.scrollY) + (35 / 2))
        ctx.lineTo((i * dx - this.scrollX) - 45, (arrY[i] -this.scrollY) - 35)
        ctx.lineWidth = 5;
	      ctx.strokeStyle = '#707070';
        ctx.stroke();
      }
  }
  this.updateScroll = function()
  {
    this.scrollX += (car1.x -300 - this.scrollX)/30;
    this.scrollY += (car1.y -300- this.scrollY)/30;
  }
  this.intersection = function(wheel1){

    var flat = false;
    for (var i = 0 ; i < this.arrY.length - 1; i++)
    {
      var inter = wheel1.intersection(this.dx * i,this.arrY[i], this.dx*(i + 1), this.arrY[i+1]);
      if (inter)
      {
        wheel1.contactPoints += 1;
      }
    }


    for (var i = 0 ; i < this.arrY.length - 1; i++)
    {
      var inter = wheel1.intersection(this.dx * i,this.arrY[i], this.dx*(i + 1), this.arrY[i+1]);
      if (inter)
      {

        this.resolveIntersection(wheel1, Math.atan((this.arrY[i+1] - this.arrY[i])/(this.dx)),i);
        flat = true;
      }
    }

    if (!flat)
    {
      wheel1.contactPoints = 1;
      for (var i = 0; i < this.arrY.length; i++)
      {
        var inter = wheel1.intersectPoint(this.dx * i,this.arrY[i]);
        if (inter)
        {
          this.resolvePoint(wheel1, i);
        }
      }
    }
  }
  this.resolvePoint = function(wheel1, i)
  {
    var x = this.dx * i;
    var y = this.arrY[i];
    var dist = Math.sqrt((wheel1.x - x) * (wheel1.x - x) + (wheel1.y - y) * (wheel1.y - y) );
    var dx = wheel1.r / dist * (wheel1.x - x);
    var dy = wheel1.r / dist * (wheel1.y - y);
    wheel1.x = x + dx;
    wheel1.y = y + dy;
    wheel1.calculateImpulse(-Math.atan((wheel1.x - x)/(wheel1.y - y)));
  }
  this.resolveIntersection = function(wheel1, ang, i)
  {
    var x1 = this.dx * i;
    var x2 = this.dx * (i+1);
    var y1 = this.arrY[i];
    var y2 = this.arrY[i+1];

    var e1x = x2 - x1;
    var e1y = y2 - y1;
    var area = e1x * e1x + e1y * e1y;
    var e2x = wheel1.x - x1;
    var e2y = wheel1.y - y1;
    var val = e1x * e2x + e1y * e2y;

    var lenE1 = Math.sqrt(e1x * e1x + e1y * e1y);
    var lenE2 = Math.sqrt(e2x * e2x + e2y * e2y);
    var cos = val/(lenE1 * lenE2);

    var projLen = cos * lenE2;
    var px = x1 + (projLen * e1x)/lenE1;
    var py = y1 + (projLen * e1y)/lenE1;

    wheel1.x = px + wheel1.r * Math.sin(ang);
    wheel1.y = py - wheel1.r * Math.cos(ang);
    wheel1.calculateImpulse(ang);
  }

}
function updateGameArea() {
      myGameArea.clear();
      car1.wheelAhead.resetImp();
      car1.wheelBehind.resetImp();
      car1.springForcesAll();
      terrain.intersection(wheelAhead);
      terrain.intersection(wheelBehind);

      terrain.display();
      car1.controls();
      wheelAhead.doforces();
      wheelBehind.doforces();

      car1.doForces();
      terrain.updateScroll();
      car1.display();
      wheelAhead.display();
      wheelBehind.display();
      //terrain.display();
      //console.log(wheelAhead.contactPoints);
}
