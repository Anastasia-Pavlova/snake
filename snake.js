const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "snake-ground.png";

const food = new Image();
food.src = "food.png";

const snake_head = new Image();
snake_head.src = "snake.png";

var box = 24;
var score = 0;

var fish = {
  x: Math.floor((Math.random() * 20 + 1)) * box,
  y: Math.floor((Math.random() * 10 + 2)) * box,
};

var snake = [];
snake[0] = {
  x: 10 * box,
  y: 5 * box,
};

document.addEventListener('keydown', direction);

var dir;

function direction(e) {
  //коды клавиш при нажатии
  if(e.keyCode == 37 && dir !='right')
  dir = 'left';
  else if(e.keyCode == 38 && dir !='down')
  dir = 'up';
  else if(e.keyCode == 39 && dir !='left')
  dir = 'right';
  else if(e.keyCode == 40 && dir !='up')
  dir = 'down';
};

function eatTail(head, arr) {
  for(var i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
    clearInterval(game);
  }
}


function draw() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(food, fish.x, fish.y);

  for(var i = 0; i < snake.length; i++) {
  ctx.drawImage(snake_head, snake[i].x, snake[i].y);
}
 ctx.fillStyle = 'black';
 ctx.font = '20px Arial';
 ctx.fillText(score, box * 2.5, box * 1.5);

 var snakeX = snake[0].x;
 var snakeY = snake[0].y;

 if(snakeX == fish.x && snakeY == fish.y){
   score++;
   fish = {
     x: Math.floor((Math.random() * 20 + 2)) * box,
     y: Math.floor((Math.random() * 10 + 3)) * box,
   };
 }
 else {
   snake.pop();
 }

////////прописать бесконечное окно
// Если змейка достигла края поля по горизонтали — продолжаем её движение с противоположной стороны
if (snakeX < 0) {
  snakeX = canvas.width - box;
}
else if (snakeX >= canvas.width) {
  snakeX = 0;
}
// Делаем то же самое для движения по вертикали
if (snakeY < 0) {
  snakeY = canvas.height - box;
}
else if (snakeY >= canvas.height) {
  snakeY = 0;
};


 if(dir == 'left') snakeX -= box;
 if(dir == 'right') snakeX += box;
 if(dir == 'up') snakeY -= box;
 if(dir == 'down') snakeY += box;

 var newHead = {
   x: snakeX,
   y: snakeY
 };

 eatTail(newHead, snake);

 snake.unshift(newHead);

}


var game = setInterval(draw, 100);
