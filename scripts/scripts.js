var game = new Game(0,0)

function Game(points,level) {
  this.points = points;
  this.level = level;
  this.alive = 0; //equal to piece_matrix
  this.alivePos = [0,0];
  this.lines = 0;
  this.blankRow = [0,0,0,0,0,0,0,0,0,0];
  this.zeroMatrix3 = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  this.zeroMatrix4 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  this.hitDetectLookAhead3 = this.zeroMatrix3;
  this.hitDetectLookAhead4 = this.zeroMatrix4;
  this.system = [
    [-2,0,0,0,0,0,0,0,0,-2],
    [-3,0,0,0,0,0,0,0,0,-3],  //system[0] hidden top
    [-4,0,0,0,0,0,0,0,0,-4],
    [-5,0,0,0,0,0,0,0,0,-5],
    [-6,0,0,0,0,0,0,0,0,-6],
    [-7,0,0,0,0,0,0,0,0,-7],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],  //system[10] === MIDDLE!
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [-6,0,0,0,0,0,0,0,0,0],
    [-6,0,0,0,0,0,0,0,0,0],
    [-6,-6,0,0,0,0,0,0,0,0],
    [-5,-5,0,0,0,0,0,0,0,0],
    [-5,0,0,0,0,0,0,0,0,0],
    [-5,0,0,0,0,0,-7,0,0,0],
    [-6,-5,-4,-3,-3,-2,-2,-1,0,0],
    [-1,-2,-3,-4,-5,-6,-7,-8,0,0]  //system[20] === y-axis[20] == bottom
    ];

  this.ooh = [
  [0,0,0,0],
  [0,1,1,0],
  [0,1,1,0],
  [0,0,0,0]
  ];  //Note these are piece_matrices

  this.eye =
  [
  [0,0,0,0],
  [1,1,1,1],
  [0,0,0,0],
  [0,0,0,0]
  ];

  this.eel =
  [
  [0,0,0],
  [1,1,1],
  [1,0,0]
  ];

  this.jay =
  [
  [0,0,0],
  [1,1,1],
  [0,0,1]
  ];

  this.tee =
  [
  [0,0,0],
  [1,1,1],
  [0,1,0]
  ];

  this.ess =
  [
  [0,0,0],
  [0,1,1],
  [1,1,0]
  ];

  this.zee =
  [
  [0,0,0],
  [1,1,0],
  [0,1,1]
  ];

  this.one =
  [
  [0,0,0],
  [0,1,0],
  [0,0,0]
  ];

Game.prototype.resetSystem = function() {
  for (let y = 0; y < this.system.length; y++) {
    for (let x = 0; x < this.system[0].length; x++) {
      this.system[y][x] = 0;
    }
  }
  console.log("Reset this.system");
  this.alive = 0;
  this.alivePos = [0,0];
  this.points = 0;
  this.level = 0;
  this.lines = 0;
  }

Game.prototype.makePieceDead = function() {

}

Game.prototype.clearLines = function() {
  // for (let y = this.system.length-1; y > 0; y--) { //from bottom of system
  for (let y = 0; y < this.system.length; y++) {
    if (this.system[y].reduce(function(accumulator,currentValue) {return accumulator + currentValue;}) < -9) {
      this.system.splice(y, 1);
      this.system.unshift(this.blankRow);
      this.lines++;
    }
  }
  this.updateGrid();
}

//Note the piece insertion coordinate is alaways y=1, x=1;
//What is the logic attempting?
//First it determines what is the alive matrix.
//Second, it needs to "map" the system matrix [y][x] onto the alive matrix
Game.prototype.insertNewpiece = function(piece_matrix) {
  this.alivePos = [1,4];
  this.alive = piece_matrix;
  for (var y = 1; y < piece_matrix[0].length; y++) {
    for (var x = 0; x < piece_matrix[0].length; x++) {
      if (piece_matrix[y][x] != 0) {
        this.system[y][this.alivePos[1]+x-1] = piece_matrix[y][x];
      }
    }
  }
  return this.alivePos;  //this.system position of piece_matrix[1][1] alaways starts at this.system[0][4];
}

Game.prototype.rotateCW = function() {
  if (piece_matrix[0].length === 4) {
    var tempArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    //tempArray[0][0] = this.alive[3][0];  //always zero
    tempArray[0][1] = this.alive[2][0];
    tempArray[0][2] = this.alive[1][0];
    //tempArray[0][3] = this.alive[0][0];  //always zero
    tempArray[1][0] = this.alive[3][1];
    tempArray[1][1] = this.alive[2][1];
    tempArray[1][2] = this.alive[1][1];
    tempArray[1][3] = this.alive[0][1];
    tempArray[2][0] = this.alive[3][2];
    tempArray[2][1] = this.alive[2][2];
    tempArray[2][2] = this.alive[1][2];
    tempArray[2][3] = this.alive[0][2];
    //tempArray[3][0] = this.alive[3][3];  //always zero
    tempArray[3][1] = this.alive[2][3];
    tempArray[3][2] = this.alive[1][3];
    //tempArray[3][3] = this.alive[0][3];  //always zero
  } else {
    var tempArray = [[0,0,0],[0,1,0],[0,0,0]];
    tempArray[0][0] = this.alive[2][0];
    tempArray[0][1] = this.alive[1][0];
    tempArray[0][2] = this.alive[0][0];
    tempArray[1][0] = this.alive[2][1];
    //tempArray[1][1] = 1; //this.alive[1][1]; //always === 1
    tempArray[1][2] = this.alive[0][1];
    tempArray[2][0] = this.alive[2][2];
    tempArray[2][1] = this.alive[1][2];
    tempArray[2][2] = this.alive[0][2];
  }
    this.alive = tempArray;
    return this.alive;
  }

Game.prototype.rotateCCW = function() {
  if (piece_matrix[0].length === 4) {
    var tempArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    //tempArray[0][0] = this.alive[0][3];  //always zero
    tempArray[0][1] = this.alive[1][3];
    tempArray[0][2] = this.alive[2][3];
    //tempArray[0][3] = this.alive[3][3];  //always zero
    tempArray[1][0] = this.alive[0][2];
    tempArray[1][1] = this.alive[1][2];
    tempArray[1][2] = this.alive[2][2];
    tempArray[1][3] = this.alive[3][2];
    tempArray[2][0] = this.alive[0][1];
    tempArray[2][1] = this.alive[1][1];
    tempArray[2][2] = this.alive[2][1];
    tempArray[2][3] = this.alive[3][1];
    //tempArray[3][0] = this.alive[0][0];  //always zero
    tempArray[3][1] = this.alive[1][0];
    tempArray[3][2] = this.alive[2][0];
    //tempArray[3][3] = this.alive[3][0];  //always zero
  } else {
    var tempArray = [[0,0,0],[0,1,0],[0,0,0]];
    tempArray[0][0] = this.alive[0][2];
    tempArray[0][1] = this.alive[1][2];
    tempArray[0][2] = this.alive[2][2];
    tempArray[1][0] = this.alive[0][1];
    //tempArray[1][1] = 1; //this.alive[1][1]; //always === 1
    tempArray[1][2] = this.alive[2][1];
    tempArray[2][0] = this.alive[0][0];
    tempArray[2][1] = this.alive[1][0];
    tempArray[2][2] = this.alive[2][0];
  }
    this.alive = tempArray;
    return this.alive;
  }

  //Look at the future to see if you hit anything
  Game.prototype.lookAheadScanLeft = function() {
    if (this.alive[0].length === 4) {
      this.hitDetectLookAhead = this.zeroMatrix4;
    } else {
      this.hitDetectLookAhead = this.zeroMatrix3;
    }
    for (var y = 0; y < this.alive[0].length; y++) {
      for (var x = 0; x < this.alive[0].length; x++) {
        //if your this.alive[y][x] spot is === 1
        if (this.alive[y][x] === 1) {
          //check if the left box is a dead piece or null
          if ((this.system[this.alivePos[0]+y-1][this.alivePos[1]+x-2] <= -1) || (this.system[this.alivePos[0]+y-1][this.alivePos[1]+x-2] === null)) {
            //if it is dead, this is a collision.  make the future spot === negative number
            this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the this.alive piece;
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }  //terminates inner if
        } else {
          //if your this.alive[y][x] is empty, check the this.system spot to the left of you if it is a dead piece or null.  Since your this.alive[y][x] is empty, you can safely take any this.system value of the spot to the left of you
            if ((this.system[this.alivePos[0]+y-1][this.alivePos[1]+x-2] <= -1) || (this.system[this.alivePos[0]+y-1][this.alivePos[1]+x-2] === null)) {
            this.hitDetectLookAhead[y][x] = this.system[this.alivePos[0]+y-1][this.alivePos[1]+x-2];
          }
        }
      }
    }
    return this.hitDetectLookAhead;
  }
//everything is flipped horizontally, because you are checking the right side
  Game.prototype.lookAheadScanRight = function() {
    if (this.alive[0].length === 4) {
      this.hitDetectLookAhead = this.zeroMatrix4;
      var rightoffset = 0;
    } else {
      this.hitDetectLookAhead = this.zeroMatrix3;
      var rightoffset = 0;
    }
    for (var y = 0; y < this.alive[0].length; y++) {
      for (var x = this.alive[0].length-1; x >= 0; x--) {
        // console.log("loop no: ", y,"-",x,": this.system scan[y][x]: ",this.alivePos[0]+y-1,"-",this.alivePos[1]+x+rightoffset," value: ",this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset])
        //if your this.alive[y][x] spot is === 1
        if (this.alive[y][x] === 1) {
          //check if the right box is a dead piece or null
          if ((this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset] <= -1) || (this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset] === null)) {
            //if it is dead, this is a collision.  make the future spot === negative number
            this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the this.alive piece;
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }  //terminates nexted if block.  next section of code continues the outer if.
        } else {
          //if your this.alive[y][x] is empty, check the this.system spot to the right of you if it is a dead piece or null.  Since your this.alive[y][x] is empty, you can safely take any this.system value of the spot to the left of you
            if ((this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset] <= -1) || (this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset] === null)) {
            this.hitDetectLookAhead[y][x] = this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset];
            // console.log(y,"-",x,": ",this.system[this.alivePos[0]+y-1][this.alivePos[1]+x+rightoffset])
          }
          // debugger;
        }
      }
      console.log("lookahead: ",this.hitDetectLookAhead)
    }
    return this.hitDetectLookAhead;
  }

  Game.prototype.moveLeft = function() {
    // console.log("start alivePos= ",this.alivePos);
    for (var y = 0; y < this.alive[0].length; y++) {
      for (var x = 0; x < this.alive[0].length; x++) {
        if (this.system[y+this.alivePos[0]-1][x+this.alivePos[1]-1] === this.alive[y][x]) {
          this.system[y+this.alivePos[0]-1][x+this.alivePos[1]-1] = 0;
          this.system[y+this.alivePos[0]-1][x+this.alivePos[1]-2] = this.alive[y][x];
        }
      }
    }
    this.alivePos[1]--;
    // console.log("end alivePos= ",this.alivePos);
    // console.table(this.system);
    return this.alivePos;
  }

  Game.prototype.moveRight = function() {
    if (this.alive[0].length === 4) {
      var rightoffset = 0;
    } else {
      var rightoffset = 0;
    }
    console.log("start alivePos= ",this.alivePos);
    for (var y = this.alive[0].length-1; y > 0; y--) {
      for (var x = this.alive[0].length-1; x > 0; x--) {
        if (this.system[y+this.alivePos[0]-1][x+this.alivePos[1]-1] === this.alive[y][x]) {
          this.system[y+this.alivePos[0]-1][x+this.alivePos[1]-1] = 0;
          this.system[y+this.alivePos[0]-1][x+this.alivePos[1]] = this.alive[y][x];
          console.log("end alivePos= ",this.alivePos);
          console.table(this.system);
          // debugger;
        }
      }
    }
    this.alivePos[1]++;
    return this.alivePos;
  }

  Game.prototype.moveDown = function(pieceAlive) {
    //play the "move" sound here;
  }

  Game.prototype.updateGrid = function() { //This function should be moved outside of the game object
    for (let y = 0; y < this.system.length; y++) {
      for (let x = 0; x < this.system[0].length; x++) {
        switch (Math.abs(this.system[y][x])) {
          case 0:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item");
          break;
          case 1:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-brown");
          break;
          case 2:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-red");
          break;
          case 3:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-orange");
          break;
          case 4:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-yellow");
          break;
          case 5:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-green");
          break;
          case 6:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-blue");
          break;
          case 7:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-indigo");
          break;
          case 8:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-purple");
          break;
          default:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item grid-color-dark");
          }
        }
      }
    }

}

//What follows is keyboard capturing logic
$(document).keydown(function(e) {
  switch(e.which) {
    case 37: // left
    console.log("Left arrow");
    game.moveLeft();
    break;
    case 38: // up
    console.log("up arrow");
    break;
    case 39: // right
    console.log("right arrow");
    game.moveRight();
    break;
    case 40: // down
    console.log("down arrow");
    break;
    case 81: // lowercase q
    console.log("q key");
    break;
    case 87: // lowercase w
    console.log("w key");
    break;
    case 32: //spacebar
    console.log("spacebar");
    game.resetSystem();
    break;
    //below are debug keys to insert a specific block
    case 79: //o
    console.log("o key");
    game.insertNewpiece(game.ooh);
    break;
    case 73: //i
    console.log("i key");
    game.insertNewpiece(game.eye);
    break;
    case 76: //l
    console.log("l key");
    game.insertNewpiece(game.eel);
    break;
    case 74: //j
    console.log("j key");
    game.insertNewpiece(game.jay);
    break;
    case 84: //t
    console.log("t key");
    game.insertNewpiece(game.tee);
    break;
    case 83: //s
    console.log("s key");
    game.insertNewpiece(game.ess);
    break;
    case 90: //z
    console.log("z key");
    game.insertNewpiece(game.zee);
    break;
    case 75: //z
    console.log("k key");
    game.insertNewpiece(game.one);
    break;
    //G should be used to force "gravity, but gravity is just a down key"
    case 71: //g
    console.log("g key");
    break;

    default: return; // exit this handler for other keys
  }
  game.updateGrid();  //redraw the grid after any keypress
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

//Below is gravity, which occurs on the timer
// $(document).ready(function(){
//   var timerInterval = 1000;
//   setInterval(function(){
//    //Add code here for gravity
//     game.updateGrid();
//   }, timerInterval);
// });
