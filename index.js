const canvas = document.createElement('canvas');
canvas.style.backgroundColor = 'black';
const ctx = canvas.getContext('2d');
document.body.prepend(canvas);
const game = { 
  grid: 60,
  animationFrame: ''
};
const ball = {
  x: game.grid * 7, 
  y: game.grid * 5, 
  
  w: game.grid/3, 
  h: game.grid/3, 
  color: 'green',
  dirx:5,
  diry:5
}
const player = { 
  x: game.grid * 7, 
  y: game.grid * 8, 
  w: game.grid * 2, 
  h: game.grid / 2, 
  color: 'red',
  speed: 5 

};
const keyz = { ArrowLeft: false, ArrowRight: false };

canvas.setAttribute('width', game.grid * 15);
canvas.setAttribute('height', game.grid * 10);
canvas.style.border = '1px solid black';
document.addEventListener('keydown', (e) => {
  if (e.code in keyz) { keyz[e.code] = true; }
})
document.addEventListener('keyup', (e) => {
  if (e.code in keyz) { keyz[e.code] = false; }
  // console.log(keyz);
})
document.addEventListener('mousemove', e => {
  const val = e.clientX - canvas.offsetLeft;
  if(val > player.w && val < canvas.width) {
    player.x = val - player.w;
    // console.log(player.x );

    }
});


game.animationFrame = requestAnimationFrame(draw);

function collDetection(obj1,obj2) {
  const xAxis = (obj1.x < (obj2.x + obj2.w)) && ((obj1.x + obj1.x) > obj2.x);
  const yAxis = (obj1.y < (obj2.y + obj2.h)) && ((obj1.y + obj1.h) > obj2.y);
  const val = xAxis && yAxis;
  return val;
}



function movement() {
  if(keyz.ArrowLeft) {
    player.x -= player.speed;
  }
  if(keyz.ArrowRight) {
    player.x += player.speed;
  }
}

// Ball movement
function ballmove() {
  if(ball.x > canvas.width || ball.x < 0){
    ball.dirx *= -1;
  }
  if(ball.y > canvas.height || ball.y < 0){
    ball.diry *= -1;
  }
  ball.x += ball.dirx;   
  ball.y += ball.diry;
}

// Draw Ball
function drawBall() {
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.rect(ball.x, ball.y, ball.w, ball.h);
  // ctx.stroke();
  ctx.closePath();
  
  
  ctx.beginPath();
  ctx.fillStyle = ball.color;
  let adjust = ball.w/2;
  ctx.arc(ball.x+adjust, ball.y+adjust, ball.w/2,0,Math.PI*2);
  ctx.fill()
  ctx.closePath();

}

//Draw Player
function drawPlayer() {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}




function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  movement();
  ballmove();
  drawPlayer();
  drawBall();
  if(collDetection(player,ball)){
    ball.diry *= -1;
    let val1 = ball.x + (ball.w/2) - player.x;
    let val2 = val1 - player.w/2;
    let val3 = Math.ceil(val2/(player.w/10));
    ball.dirx = val3;
    console.log(val1, val2, val3);

  }
  game.animationFrame = requestAnimationFrame(draw);
}

