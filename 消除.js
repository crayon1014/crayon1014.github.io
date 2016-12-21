window.onload = init;
window.onmousemove = mouseMove;
window.onkeydown = keyDown;

var canvas, ctx, cW, cH;
var bg;
var st;
var board, boardX, boardY;

boardX = 350;
boardY = 700;

var ball, ballX, ballY;
ballX = 100;
ballY = 400;

var box;

cW = 1000;
cH = 800;

var vx, vy;
vx = 10;
vy = 5;

var bricks = [];
var brickW, brickH;
brickW = 150;
brickH = 50;

function init() {
	trace("游戏初始化完毕！");
	canvas = document.getElementById('canva');
	ctx = canvas.getContext("2d");

	bg = addImg("http://image18.poco.cn/mypoco/myphoto/20161221/17/18442191220161221175638057.png");
	ball = addImg("http://image18.poco.cn/mypoco/myphoto/20161221/17/18442191220161221175712038.png");
	board = addImg("http://image18.poco.cn/mypoco/myphoto/20161221/17/18442191220161221175736075.png");

	createBrick();

	st = setInterval(updateCanvas, 1000 / 60);
}

//生成砖块
function createBrick() {
	for(var i = 0; i < 6; i++) {
		for(var j = 0; j < 4; j++) {
			var item = addImg("http://image18-c.poco.cn/mypoco/myphoto/20161221/18/18442191220161221185516042.png");
			var x = i * (brickW + 10) + 25;
			var y = j * (brickH + 10) + 40;
			var obj = {
				item: item,
				x: x,
				y: y
			}
			bricks.push(obj);
		}
	}
}

//挡板随鼠标移动
function mouseMove(e) {
	boardX = e.clientX - board.width / 2;
}

function keyDown(e) {
	if(e.keyCode == 37) {
		boardX -= 10;
	}
	if(e.keyCode == 39) {
		boardX += 10;
	}
}

//刷新画布
function updateCanvas() {
	ctx.clearRect(0, 0, cW, cH);
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(ball, ballX, ballY);
	ctx.drawImage(board, boardX, boardY);

	ballMove();
	drawBricks();
	ballBricksHit();
}

//绘制砖块
function drawBricks() {
	var l = bricks.length;
	for(var i = 0; i < l; i++) {
		var item = bricks[i];
		ctx.drawImage(item.item, item.x, item.y);
	}
}

//球与砖块碰撞检测
function ballBricksHit() {
	var l = bricks.length;
	for(var i = 0; i < l; i++) {
		var item = bricks[i].item;
		/*var b= testObjectHit(bricks[i].x,bricks[i].y,item.width,item.height,ballX,ballY);
		if(b){
			bricks.splice(i,1);
			vy*=-1;
		}*/
		if((ballX+ball.width) >= bricks[i].x && ballX <= (bricks[i].x + item.width) && ballY <= (bricks[i].y+item.height)) {
			bricks.splice(i,1);
			vy *= -1;
		}
	}
}

//球移动
function ballMove() {
	ballX += vx;
	ballY += vy;
	if(ballX >= (cW - ball.width)) {
		vx *= -1;
	} else if(ballX <= 0) {
		vx *= -1;
	}
	if(ballX >= boardX && ballX <= (boardX + board.width - ball.width) && (ballY + ball.height) >= boardY) {
		vy *= -1;
	} else if(ballY <= 20) {
		vy *= -1;
	} else if(ballY >= canvas.height) {
		clearInterval(st);
		alert("game over");
	}
}

//生成图片
function addImg(_src) {
	var img = new Image();
	img.src = _src;
	return img;
}

/*//碰撞检测
function testObjectHit(x1, y1, w, h, x2, y2) {
	if(x2 > x1 && y2 > y1 && x2 < x1 + w && y2 < y1 + h) {
		return true;
	} else {
		return false;
	}
}*/

function trace(msg) {
	console.log(msg);
}
