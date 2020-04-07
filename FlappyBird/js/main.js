let c = document.getElementById("canvas")
let ctx1 = document.getElementById("base").getContext("2d");
let ctx2 = document.getElementById("canvas").getContext("2d");
ctx1.font = "20px Georgia";
ctx2.font = "20px Georgia";
let gradient = ctx1.createLinearGradient(0, 0, c.width, 0);
let status = true;
gradient.addColorStop("0", " magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1.0", "red");
let n = 0;
let speed = 9;
let e = 2;
let f = 40;
//random vi tri y cua cot
let yposition = Math.floor(Math.random() * (400 - 200)) + 200;

class Picture {
  constructor(x, y, width, height, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
  }
  getSrc() {
    return this.src;
  }
  setSrc(src) {
    this.src = src
  }
  move() {
    this.x -= 2;
  }
  getX() {
    return this.x;
  }
  setX(x) {
    this.x = x
  }
  getY() {
    return this.y;
  }
  setY(y) {
    this.y = y
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  birdMove() {
    this.y += e;
  }
}
let imgbase = new Picture(-300, 510, 1004, 112, "img/base.png");

// ve nen
function render1(ctx, obj) {
  obj.move();
  if (obj.getX() <= -600) {
    obj.setX(-200);
  };
  let windo = new Image();
  windo.src = obj.getSrc();
  windo.onload = function() {
    ctx1.clearRect(obj.getX() - 1, obj.getY(), obj.getWidth() + 3, obj.getHeight());
    ctx1.drawImage(windo, obj.getX(), obj.getY(), obj.getWidth(), obj.getHeight());
  };
}

// ve cot duoi
function drawPipe1(ctx, obj) {
  obj.move();
  if (obj.getX() <= -60) {
    obj.setX(315);
    n = n + 1;
    yposition = Math.floor(Math.random() * (420 - 200)) + 200;
  };
  let windo = new Image();
  windo.src = obj.getSrc();
  windo.onload = function() {
    ctx2.clearRect(obj.getX(), yposition, obj.getWidth() + 4, obj.getHeight());
    ctx2.drawImage(windo, obj.getX(), yposition, obj.getWidth(), obj.getHeight());
  };
}
//ve cot tren
function drawPipe2(ctx, obj) {
  obj.move();
  if (obj.getX() <= -60) {
    obj.setX(315);
  };
  let windo = new Image();
  windo.src = obj.getSrc();
  windo.onload = function() {
    ctx2.clearRect(obj.getX(), yposition - 450, obj.getWidth() + 4, obj.getHeight());
    ctx2.drawImage(windo, obj.getX(), yposition - 450, obj.getWidth(), obj.getHeight());
  };
}
//them con chym
let bird = new Picture(30, 250, 34, 24, "img/bluebird-upflap.png")

function drawBird() {
  bird.birdMove();
  let windo = new Image();
  windo.src = bird.getSrc();
  windo.onload = function() {
    ctx2.clearRect(bird.getX() - 1, bird.getY() -2, bird.getWidth() + 3, bird.getHeight() + 14);
    ctx2.drawImage(windo, bird.getX(), bird.getY(), bird.getWidth(), bird.getHeight());
  };
}
// dap canh
function flapWing() {
  if(e>0){bird.setSrc("img/bluebird-midflap.png");}else{
    switch (bird.src) {
      case "img/bluebird-downflap.png":
        bird.setSrc("img/bluebird-upflap.png");
        break;
      case "img/bluebird-upflap.png":
        bird.setSrc("img/bluebird-midflap.png");
        break;
      case "img/bluebird-midflap.png":
        bird.setSrc("img/bluebird-downflap.png");
        break;
    }
  }}

function showScore() {
  ctx1.clearRect(269, 6, 20, 20);
  ctx1.fillStyle = gradient;
  ctx1.fillText("Score: " + n, 220, 20);
}
// di chuyen
function dichuyen() {
  showScore();
  render1(ctx1, imgbase);
  drawPipe1(ctx2, cot1);
  drawPipe2(ctx2, cot2);
  drawBird();
  if (((bird.getX() > (cot1.getX() - 30)) && (bird.getX() < (cot1.getX() + 40)) && ((bird.getY() > (yposition - 22)) || (bird.getY() < (yposition - 130)))) || (bird.getY() >= 485)) {
    endGame();
  }
}
//ham spaceKey
var timeO;

function pressSpaceKey(evt) {
  if (evt.keyCode == 32) {
    clearTimeout(timeO);
    if (status) {
      status = false;
      ctx2.clearRect(0, 0, 300, 500);
      let interval_obj2 = setInterval(flapWing, f);
      let interval_obj = setInterval(dichuyen, speed);
    }
    e = -1;bird.setY(bird.getY()-10);
    timeO = setTimeout(function() {
      e = 1.8;bird.setY(bird.getY()+0);
    }, 500);
  }
  if (evt.keyCode == 80) {alert("pause game! ")}
}
//them hinh bat dau endGame
let imgStart = new Picture(10, 120, 184, 240, "img/message.png");
function drawimgStart() {
  imgStart.birdMove();
  let windo = new Image();
  windo.src = imgStart.getSrc();
  windo.onload = function() {
    ctx2.drawImage(windo, 60, 160, imgStart.getWidth(), imgStart.getHeight());
    ctx2.fillStyle = gradient;
    ctx2.fillText('Press "spacekey" to play!', 50, 130)
    ctx2.fillText('"p" to pause!', 90, 150)
  };
}

function docReady() {
  window.addEventListener('keydown', pressSpaceKey);
}
//
var interval_obj;
var interval_obj2;
let cot1 = new Picture(500, 330, 52, 320, "img/pipe-green.png")
let cot2 = new Picture(500, 100, 52, 320, "img/pipe-green-rotator.png")

//ket thuc game
function endGame() {
  clearInterval(interval_obj);
  clearInterval(interval_obj2);
  let s ="Your score: " + n +" Are you destroy your phone again?";
  var playAgain = confirm(s);
  if (playAgain) {
    window.location.reload();
  }
}
drawimgStart();
//cac chuc nang con thieu se bo sung
// có thể thêm bird to layer 3 để xoay con chim,
// tang e de tang do kho
//ham tang toc do
// function speedGame() {
//   if (sp > 5) {
//     sp -= 5;
//   }
// }
// setInterval(speedGame, 3)
