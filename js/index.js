canv = document.getElementById('background');
canv.height = window.innerHeight;
canv.width = window.innerWidth;
ctx = canv.getContext('2d');
ctx.clearRect(0, 0, canv.width, canv.height);

var numberOfCircles = 500;
var minRadius = 5;
var maxRadius = 40;

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(){
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  init();
});

function Circle(x, y, xv, yv, radius, color){
  this.x = x;
  this.y = y;
  this.xv = xv;
  this.yv = yv;
  this.radius = radius;
  this.maxRadius = maxRadius;
  this.minRadius = minRadius;
  this.color = color;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  this.update = function(){
    if(this.x + this.radius > canv.width || this.x - this.radius < 0){
      this.xv = -this.xv;
    }

    if(this.y + this.radius > canv.height || this.y - this.radius < 0){
      this.yv = -this.yv;
    }

    this.x += this.xv;
    this.y += this.yv;

    if(mouse.x - this.x < 50 && mouse.x - this.x > -50
    && mouse.y - this.y < 50 && mouse.y - this.y > -50)
    {
       if(this.radius < this.maxRadius){
        this.radius += 1;
       }
    }
    else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
    this.draw();
  }
}

var colorArray = [
  '#FFE71B',
  '#E87E0C',
  '#FF0000',
  '#8B0CE8',
  '#0D68FF'
]

var circleArray = [];
function init(){
  circleArray = [];
  for(var i = 0; i < numberOfCircles; i++){
    var x = Math.random() * canv.width;
    var y = Math.random() * canv.height;
    var xv = (Math.random() - 0.5) * 3;
    var yv = (Math.random() - 0.5) * 3;
    var radius = Math.random() * 10;

    var color = colorArray[Math.floor(Math.random() * colorArray.length)]
    circleArray.push(new Circle(x, y, xv, yv, radius, color));
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canv.width, canv.height);

  for(var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}

init();
animate();
