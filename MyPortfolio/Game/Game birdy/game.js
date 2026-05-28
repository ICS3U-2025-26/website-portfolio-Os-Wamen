let bird;
let pipes = [];
let bg;
let birdUp, birdDown;
let pipeImg;
let startScreen, gameOverImg;
let coinImg;

let gravity = 0.6;
let lift = -10;
let velocity = 0;

let gameState = "start"; // start, play, gameover
let score = 0;

function preload() {
  bg = loadImage("Images/background_sky.png");

  // ✅ Using your main bird images now
  birdUp = loadImage("Images/Birdy_up.png");
  birdDown = loadImage("Images/Birdy_down.png");

  pipeImg = loadImage("Images/Pipe.png");
  startScreen = loadImage("Images/Start_screen.png");
  gameOverImg = loadImage("Images/Game over.png");
  coinImg = loadImage("Images/coin.png");
}

function setup() {
  createCanvas(600, 600);
  bird = {
    x: 80,
    y: height / 2,
    size: 50
  };
}

function draw() {
  if (gameState === "start") {
    image(startScreen, 0, 0, width, height);
    return;
  }

  if (gameState === "gameover") {
    image(gameOverImg, 0, 0, width, height);
    textSize(32);
    fill(255);
    textAlign(CENTER);
    text("Score: " + score, width / 2, height / 2 + 100);
    return;
  }

  // PLAY STATE
  image(bg, 0, 0, width, height);

  // Bird physics
  velocity += gravity;
  bird.y += velocity;

  // Bird animation
  if (velocity < 0) {
    image(birdUp, bird.x, bird.y, bird.size, bird.size);
  } else {
    image(birdDown, bird.x, bird.y, bird.size, bird.size);
  }

  // Ground / ceiling collision
  if (bird.y > height - bird.size || bird.y < 0) {
    gameState = "gameover";
  }

  // Pipes
  if (frameCount % 90 === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].hits(bird)) {
      gameState = "gameover";
    }

    if (!pipes[i].scored && pipes[i].x + pipes[i].w < bird.x) {
      score++;
      pipes[i].scored = true;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(score, width / 2, 50);
}

function keyPressed() {
  if (gameState === "start") {
    gameState = "play";
  } else if (gameState === "play") {
    velocity = lift;
  } else if (gameState === "gameover") {
    resetGame();
  }
}

function mousePressed() {
  keyPressed();
}

function resetGame() {
  bird.y = height / 2;
  velocity = 0;
  pipes = [];
  score = 0;
  gameState = "start";
}

class Pipe {
  constructor() {
    this.spacing = 180;   // gap between pipes
    this.top = random(100, height - this.spacing - 100);
    this.bottom = height - (this.top + this.spacing);

    this.x = width;
    this.w = 100;         // ✅ MUCH WIDER
    this.speed = 3;
    this.scored = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {

    // ✅ TOP PIPE (flipped vertically properly)
    push();
    translate(this.x, this.top);
    scale(1, -1); 
    image(pipeImg, 0, 0, this.w, this.top);
    pop();

    // ✅ BOTTOM PIPE (normal)
    image(pipeImg, this.x, height - this.bottom, this.w, this.bottom);
  }

  hits(bird) {
    if (
      bird.y < this.top ||
      bird.y + bird.size > height - this.bottom
    ) {
      if (
        bird.x + bird.size > this.x &&
        bird.x < this.x + this.w
      ) {
        return true;
      }
    }
    return false;
  }

  offscreen() {
    return this.x < -this.w;
  }
}
