let columns = 4;
let colWidth;
let tiles = []; // Array to hold our tile objects
let speed = 10;
let score = 0;
let gameState = "start"; // Can be "start", "playing", "gameover", "highscores", "instructions"
let startScreen;
let savedScore;

function setup() {
    createCanvas(windowWidth, windowHeight); // Automatically fit the screen size
    colWidth = width / columns;
}
function preload() {
    startScreen = loadImage('Images/Tiles_Start.png'); // Load your start screen image
    gameOverScreen = loadImage('Images/Tiles_GameOver.png'); // Load your game over screen image
    soundFormats('mp3');
    playSong = loadSound('Sound/Song.mp3'); // Load your game song
}

function draw() {
    if (gameState === "start") {
        image(startScreen, 0, 0, width, height); // Display the start screen
        rect(width/8, height/1.5, width/4, height/4); // Draw a rectangle at the bottom left corner
        rect(width/1.5, height/1.5, width/4, height/4); // Draw a rectangle at the bottom right corner
        rect(width/2.5, height/1.5, width/4, height/4); // Draw a rectangle at the bottom center
        
        textSize(32); // Set the text size
        textAlign(CENTER, CENTER); // Center the text within the rectangles
        textFont('courier'); // Set the font to courier
        text("High Scores", width/8 + width/8, height/1.5 + height/8); // Text for the left button
        text("Start", width/2.5 + width/8, height/1.5 + height/8); // Text for the center button
        text("Instructions", width/1.5 + width/8, height/1.5 + height/8); // Text for the right button
        return;
    }

    if (gameState === "gameover") {
        image(gameOverScreen, 0, 0, width, height); // Display the game over screen
        rect(width/8, height/1.5, width/4, height/4); // Draw a rectangle at the bottom left corner
        rect(width/1.5, height/1.5, width/4, height/4); // Draw a rectangle at the bottom right corner
        rect(width/2.5, height/1.5, width/4, height/4); // Draw a rectangle at the bottom center
        
        textSize(32); // Set the text size
        textAlign(CENTER, CENTER); // Center the text within the rectangles
        textFont('courier'); // Set the font to courier
        text("High Scores", width/8 + width/8, height/1.5 + height/8); // Text for the left button
        text("Restart", width/2.5 + width/8, height/1.5 + height/8); // Text for the center button
        text("Main Menu", width/1.5 + width/8, height/1.5 + height/8); // Text for the right button
        return;
    }

    if (gameState === "highscores") {
        // Display high scores screen (you can customize this as needed)
        background(255); // Clear the background
        textSize(32); // Set the text size
        textAlign(CENTER, CENTER); // Center the text
        textFont('courier'); // Set the font to courier
        text("High Scores", width/2, height/4); // Title for the high scores screen
        textSize(24); // Set a smaller text size for the score
        text("Score: " + savedScore, width/2, height/2);
        rect(width/2.5, height/1.5, width/4, height/4); // Draw a rectangle at the bottom center
        text("Main Menu", width/2.5 + width/8, height/1.5 + height/8); // Text for the center button
        return;
    }

    if (gameState === "instructions") {
        // Display instructions screen (you can customize this as needed)
        background(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        textFont('courier');
        text("Instructions", width/2, height/4);
        textSize(24);
        text("Click on the falling tiles to score points. Don't miss any tiles!", width/2, height/2);
        rect(width/2.5, height/1.5, width/4, height/4); // Draw a rectangle at the bottom center
        text("Main Menu", width/2.5 + width/8, height/1.5 + height/8); // Text for the center button
        return;
    }   

    if (gameState === "win") {
        background(255, 255, 255); // Clear the background to white
        textSize(50);
        textAlign(CENTER, CENTER);
        fill(255);
        text("YOU WIN!", width/2, height/3);
    
        textSize(32);
        text("Final Score: " + score, width/2, height/2);
    
        // Draw a button to go back to Menu
        fill(255);
        rect(width/2.5, height/1.5, width/4, height/4);
        fill(0);
        text("Main Menu", width/2.5 + width/8, height/1.5 + height/8);
        return;
    }

    if (gameState === "playing") {
        background(220);

        // Draw the column lines
        stroke(150);
        for (let i = 0; i <= columns; i++) {
          line(i * colWidth, 0, i * colWidth, height);
        }

     // Logic for spawning and moving tiles
        if (frameCount % 60 === 0) { // Spawn a new tile roughly every second
         spawnTile();
        }

        if (!playSong.isPlaying() && playSong.currentTime() > 0) {
            gameState = "win";
            playSong.stop(); // Reset sound state
        }
        
        // Loop backwards through the array to safely remove items
        for (let i = tiles.length - 1; i >= 0; i--) {
            tiles[i].display();
            tiles[i].update();

            // Remove tile if clicked OR if it goes off screen
            if (tiles[i].clicked) {
                tiles.splice(i, 1);
                continue; 
            }

            if (tiles[i].y > height) {
                // If it reaches the bottom and WASN'T clicked, Game Over
                noLoop();
                playSong.stop(); // Stop the music when you lose
                setTimeout(() => {
                    gameState = "gameover";
                    tiles = []; // Clear tiles for next game
                    loop();
                }, 500);
                tiles.splice(i, 1);
            }
        }

        if (gameState === "win") {
            noLoop(); // Stop the game loop when you win
            playSong.stop(); // Stop the music when you win
            background(255); // Clear the background
            textSize(32); // Set the text size
            textAlign(CENTER, CENTER); // Center the text
            textFont('courier'); // Set the font to courier
            text("You Win!", width/2, height/4); // Display win message
        }
        // Display Score
        fill(0);
        textSize(24);
        text("Score: " + score, width/2, height/10);
        return;
    }
}

function spawnTile() { // Spawn a new tile in a random column
    let col = floor(random(columns));
    let t = new Tile(col);
    tiles.push(t);
}



function mousePressed() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].isClicked(mouseX, mouseY)) {
            tiles[i].clicked = true;
            score++; // Adds 1 to the score for each tile hit
            let prevHighScore = getItem("HighScore");
            if (prevHighScore === null || score > prevHighScore) {
                storeItem("HighScore", score); // Store the score in local storage only if it's higher
            }
            break; // Only click one tile at a time
        }
    }

    if (gameState === "start") {
        // Check if the start button is clicked
        if (isButtonClicked(width/2.5, height/1.5, width/4, height/4)) {
            score = 0; // Reset score when starting a new game
            gameState = "playing"; // Start the game

            if (!playSong.isPlaying()) {
                playSong.play(); // loop() is usually better for background music than play()
            }
        }
        // Check if the high scores button is clicked
        if (isButtonClicked(width/8, height/1.5, width/4, height/4)) {
            savedScore = getItem("HighScore"); // Retrieve the high score from local storage
            gameState = "highscores"; // Go to high scores screen
        }
            // Check if the instructions button is clicked
         if (isButtonClicked(width/1.5, height/1.5, width/4, height/4)) {
            gameState = "instructions"; // Go to instructions screen
        }
    }

    if (gameState === "gameover") {
            // Check if the restart button is clicked
            if (isButtonClicked(width/2.5, height/1.5, width/4, height/4)) {
                score = 0; // Reset score
                gameState = "playing"; // Restart the game
                loop();
                
                if (!playSong.isPlaying()) {
                    playSong.play(); // loop() is usually better for background music than play()
                }
            }
             // Check if the high scores button is clicked
             if (mouseX > width/8 && mouseX < width/8 + width/4 &&
                mouseY > height/1.5 && mouseY < height/1.5 + height/4) {
                savedScore = getItem("HighScore"); // Retrieve the high score from local storage
                gameState = "highscores"; // Go to high scores screen
            }
             // Check if the main menu button is clicked
             if (isButtonClicked(width/1.5, height/1.5, width/4, height/4)) {
                gameState = "start"; // Go back to start screen
            }
    }
    
    if (gameState === "highscores" || gameState === "instructions") {
            if (isButtonClicked(width/2.5, height/1.5, width/4, height/4)) {
                gameState = "start"; // Go back to start screen
            }
    }

    if (gameState === "win") {
        if (isButtonClicked(width/2.5, height/1.5, width/4, height/4)) {
            gameState = "start"; // Go back to start screen
        }
    }

    function isButtonClicked(x, y, w, h) {
        return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    }
}   
    // Tile Class Template
    class Tile {
    constructor(col) {
        this.col = col;
        this.w = colWidth;
        this.h = 150;
        this.x = col * colWidth;
        this.y = -this.h; // Start just above the screen
        this.clicked = false;
    }

    update() {
        this.y += speed;
    }

    display() {
        if (this.clicked) {
            fill(200); // Grey out if hit
        } else {
            fill(0); // Black for active tiles
        }
        rect(this.x, this.y, this.w, this.h);
    }

    isClicked(mx, my) {
        return (mx > this.x && mx < this.x + this.w && 
                my > this.y && my < this.y + this.h && !this.clicked);
    }
}
