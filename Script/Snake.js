
const canvasItem = document.getElementById("canvasItem");
const context = canvasItem.getContext("2d");

const unit = 20;

const background = new Image();
background.src = "Images/background.jpg";

const foodImage = new Image();
foodImage.src = "Images/food.jpg";

const eatSound = new Audio();
eatSound.src = "Audio/eat.mp3"

const dieSound = new Audio();
dieSound.src = "Audio/die.mp3"

let snake = [];
snake[0] =  {x: 9*unit, y: 10*unit};
snake[1] = 	{x: 8*unit, y: 10*unit};
snake[2] = 	{x: 7*unit, y: 10*unit};

let food = { x: Math.floor(Math.random()*30 + 2)*unit, y: Math.floor(Math.random()*30 + 3)*unit};

let direction;

let score = 0;
//DETERMINE DIRECTION
function determineDirection(event) {
	if (event.keyCode == 37 && direction != "right") {
		direction = "left";
	} else if (event.keyCode == 38 && direction != "down") {
		direction = "up";
	} else if (event.keyCode == 39 && direction != "left") {
		direction = "right";
	} else if (event.keyCode == 40 && direction != "up") {
		direction = "down";
	}
}

document.addEventListener("keydown", determineDirection);

function draw() {
	context.fillStyle = "grey";
	context.fillRect(0, 0, 32*unit, unit*3);

	context.fillStyle = "grey";
	context.fillRect(0, 3*unit, unit, 30*unit);

	context.fillStyle = "grey";
	context.fillRect(0, 33*unit, 31*unit, unit);

	context.fillStyle = "grey";
	context.fillRect(31*unit, 3*unit, unit, 31*unit);

	context.drawImage(foodImage, unit, 0.5*unit, 2*unit, 2*unit);

	context.font = "40px Georgia";
	context.fillStyle = "#FFF";
	context.fillText(score, 4*unit, 2*unit);	

	context.drawImage(background, unit, 3*unit, 30*unit, 30*unit);
	for(let i = 0; i < snake.length; i++) {
		context.fillStyle = (i == 0)? "#94D5F7" : "#FFF";
		context.fillRect(snake[i].x, snake[i].y, unit, unit);

		context.strokeStyle = "red";
		context.strokeRect(snake[i].x, snake[i].y, unit, unit);
	}

	let snakeHeadX = snake[0].x;
	let snakeHeadY = snake[0].y;

	if (direction == "left") 	snakeHeadX -= unit;
	if (direction == "up") 		snakeHeadY -= unit;
	if (direction == "right") 	snakeHeadX += unit;
	if (direction == "down") 	snakeHeadY += unit;

	let newSnakeHead = {x:snakeHeadX, y:snakeHeadY}; 
	if (direction != null) {
		if (snake[0].x == 0 || snake[0].x == 31*unit || snake[0].y == 2*unit || snake[0].y == 33*unit) {
			for (let i = 0; i < snake.length; i++) {
				context.fillStyle = "black";
				context.fillRect(snake[i].x, snake[i].y, unit, unit);
			}
			dieSound.play();
			clearInterval(gameInterval);
		}

		for (let i = 1; i < snake.length; i++) {
			if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
				for (let j = 0; j < snake.length; j++) {
					context.fillStyle = "black";
					context.fillRect(snake[i].x, snake[i].y, unit, unit);
				}
				clearInterval(gameInterval);
				dieSound.play();
			}
		}

		if (snake[0].x == food.x && snake[0].y == food.y) {
			food = { x: Math.floor(Math.random()*30 + 1)*unit, y: Math.floor(Math.random()*30 + 3)*unit}
			context.drawImage(foodImage, food.x, food.y, unit, unit);
			snake.unshift(newSnakeHead);
			score++;
			eatSound.play();
		} else {
		//Draw the foods
		snake.pop();
		snake.unshift(newSnakeHead);
		context.drawImage(foodImage, food.x, food.y, unit, unit);
		}
	}

}

let gameInterval = setInterval(draw, 80);