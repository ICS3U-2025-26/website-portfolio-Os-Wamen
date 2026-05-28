

let columns = 4; 
let rows = 1;
let colSize; 
let rowSize;
let tilesize = random(50, 150); // Size of each tile


function setup() {
    createCanvas(1500, 900);
    // Setting the size of each cell
    colSize = 100; 
    rowSize = 900;
}

function preload() {
    // Load any assets here if needed
    
}

function draw() {
    background(220);
    
    // 1. Calculate the total size of the grid
    let totalGridW = columns * colSize;
    let totalGridH = rows * rowSize;
    
    // 2. Find the starting top-left corner to keep it centered
    let startX = (width - totalGridW) / 2;
    let startY = (height - totalGridH) / 2;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            fill(255);
            // 3. Draw rects relative to the start position
            rect(startX + i * colSize, startY + j * rowSize, colSize, rowSize);
        }
    }

    fill(100, 200, 250); // Example color
    rect(startX, startY, colSize, tilesize); // Draw a rectangle spanning two columns in the first row
}



function mousePressed() {
    // Handle mouse interactions here if needed
}