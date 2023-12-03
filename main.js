const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

const width = 400;
const blockHeight = 20
let halfBlock = 1
let subLength = (blockHeight - (2*halfBlock))

const height = 400;

const canvasBackground = "black";

 

let startX = width / 2;

 

let startY = width / 2;

 

let dir = 'right';

 

let dx = 0;

let dy = -1;

 

canvas.height = height

canvas.width = width;

 

document.body.appendChild(canvas);

 

function Screen() {

  this.clear = function () {

    ctx.fillStyle = canvasBackground;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

  };

}

 

let gameScreen = new Screen();

 

gameScreen.clear();

 

function randomIntFromRange(max, min) {

  return Math.floor(Math.random() * (max + 1 - min) + min);

}

 

let locationHistory = [];

 

function pickDir() {

  let pick = randomIntFromRange(3, 0);

 

  dir = pick;

}

 

function walk() {

  switch (dir) {

    case 0:

      dx = 0;

      dy = -10;

      break;

    case 1:

      dx = 10;

      dy = 0;

      break;

    case 2:

      dx = 0;

      dy = 10;

      break;

    case 3:

      dx = -10;

      dy = 0;

      break;

  }

}

 

function drawMaze(matrix) {
  for (let i = 0; i < matrix.length; i++) {
     for (let j = 0; j < matrix[i].length; j++) {
       if(matrix[i][j] !== '0') {
        ctx.fillStyle = 'white'
        ctx.fillRect(j * blockHeight, i * blockHeight, blockHeight, blockHeight)
       }
       
     }
     j = 0;  
    }

}

 

const genMaze = (rows, columns, board) => {

  const search = (r, c, direction,depth) => {

   if(c === board.length - 1 && r === board[0].length - 1){
    ctx.fillStyle = 'white'
    //wall gone
    ctx.fillRect((r * blockHeight) + halfBlock + subLength  ,(c * blockHeight) + halfBlock , 2 * halfBlock, subLength)
   }

    depth += 10
    if(depth > 255) depth = 0



    if (c < 0 || board.length <= c || r < 0 || board[c].length <= r) return;

    if (board[c][r] !== "0") return;

    if (board[c][r] === "0") {

      //verify its a valid board spot
/*
      if (

        c - 1 < 0 ||

        board.length <= c + 1 ||

        r - 1 < 0 ||

        board[c].length <= r + 1

      ) {

        return;

      }
  */

 

      switch (direction) {

        case "down":


            board[c][r] = "1"
            
            ctx.fillStyle = 'white'
            //wall gone
            ctx.fillRect((r * blockHeight) + halfBlock,(c * blockHeight) - halfBlock, subLength, 2 *halfBlock)
            //visited cell
            ctx.fillRect((r * blockHeight) + halfBlock, (c * blockHeight) + halfBlock, subLength, subLength)

          break;

        case "up":

        

            board[c][r] = "1"
                 
            ctx.fillStyle = 'white'
             //wall gone
             ctx.fillRect((r * blockHeight) + halfBlock,(c * blockHeight) + subLength + halfBlock, subLength, 2 *halfBlock)
             //visited cell
             ctx.fillRect((r * blockHeight) + halfBlock, (c * blockHeight) + halfBlock, subLength, subLength)

          break;

        case "left":



            board[c][r] = "1"
                 
            ctx.fillStyle = 'white'
             //wall gone
             ctx.fillRect((r * blockHeight) + halfBlock + subLength  ,(c * blockHeight) + halfBlock , 2 * halfBlock, subLength)
             //visited cell
             ctx.fillRect((r * blockHeight) + halfBlock, (c * blockHeight) + halfBlock, subLength, subLength)

          break;

        case "right":


             board[c][r] = "1"
                  
             ctx.fillStyle = 'white'
               //wall gone
            ctx.fillRect((r * blockHeight) - halfBlock,(c * blockHeight) + halfBlock, 2* halfBlock, subLength)
               //visited cell
               ctx.fillRect((r * blockHeight) + halfBlock, (c * blockHeight) + halfBlock, subLength, subLength)

          break;

      }

    }
    

    let paths = [

      [r,c + 1],

      [ r, c - 1,],

      [r + 1,c],

      [r - 1,c]

    ];

 

    let directions = ['down','up','right','left']

 

    while (paths.length > 0) {

      let choice = randomIntFromRange(paths.length - 1, 0);



      let row = paths[choice][0];

      let col = paths[choice][1];      
      search(row, col, directions[choice],depth);

    
      paths.splice(choice,1);
      directions.splice(choice,1)    
          
      

    }

    return

  };
  
  search(rows, columns, 'right',0);

  console.log(board)

  return board;

};

 

const board = (rows, columns) => {

  let board = [];

  for (let i = 0; i < columns; i++) {

   board.push([]);

    for (let j = 0; j < rows; j++) {

      board[i].push("0");

    }

  }

  return board;

};

 let randomMaze = genMaze(0, 0, board(width/blockHeight, height/blockHeight))

// drawMaze(randomMaze)


 

/*setInterval(function () {

  pickDir();

  walk();

  move();

}, 10000);

 

*/