const newgrid = (rows, cols) => Array(rows).fill(0).map(x =>
    Array(cols).fill(0)
)

let currentRow;
const rules = {
    '111': 0,
    '110': 0,
    '101': 0,
    '100': 1,
    '011': 1,
    '010': 1,
    '001': 1,
    '000': 0
}
let rows;
let cols;
let grid;
let resolution = 8;
let task_done = false;
let last_done = 0;

function setup(){
    createCanvas(1400, 800);
    cols = width / resolution;
    rows = height / resolution;
    console.log(rows);
    grid = newgrid(rows, cols);
    grid[rows-1] = grid[rows-1].map(x => Math.floor(Math.random() * 2));
    currentRow = rows-1;
    for(let i = 0; i < cols; i++){
        if(grid[currentRow][i] === 1){
            fill(255);
            stroke(0);
            rect(i * resolution, currentRow * resolution, resolution - 1, resolution - 1);
        }
    }
}

function draw(){
    doSomething()
}

function doSomething(){
    background(0);
    const nextrow = currentRow - 1;
    for(let i = 0; i < cols; i++){
        vecinoizq = grid[currentRow][i-1 % cols];
        vecinoder = grid[currentRow][i+1 % cols];
        vecino = grid[currentRow][i];
        const key = `${vecinoizq}${vecino}${vecinoder}`;
        grid[nextrow][i] = rules[key];
    }
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(grid[i][j] === 1){
                fill(255);
                stroke(0);
                rect(j * resolution, i * resolution, resolution - 1, resolution - 1);
            }
        }
    }
    currentRow = nextrow;
    if(currentRow === 0){
        noLoop();
    }
}