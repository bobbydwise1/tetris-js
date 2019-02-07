var blankRow = [0,0,0,0,0,0,0,0,0,0];

var system = [
[0,0,0,0,0,0,0,0,0,0],  //note system[0] === y-axis[0]
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],  //note system[9] === y-axis[9] === MIDDLE!
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],  //note system[19] === y-axis[19] == bottom
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]   //This is the floor
];

function resetSystem() {
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      system[y][x] = 0;
    }
  }
  console.log("Reset system");
}

var alive = [[]];

var ooh = [
[0,0,0,0],
[0,1,1,0],
[0,1,1,0],
[0,0,0,0]
];  //Note these are piece_matrices

var eye =
[
[0,0,0,0],
[1,1,1,1],
[0,0,0,0],
[0,0,0,0]
];

var eel =
[
[0,0,0],
[1,1,1],
[1,0,0]
];

var jay =
[
[0,0,0],
[1,1,1],
[0,0,1]
];

var tee =
[
[0,0,0],
[1,1,1],
[0,1,0]
];

var ess =
[
[0,0,0],
[0,1,1],
[1,1,0]
];

var zee =
[
[0,0,0],
[1,1,0],
[0,1,1]
];

// function add(a,b) {
//   a + b;
// }
//
// function sumArray(array) {
//   var temp;
//   temp = array.reduce(add);
// }

function makePieceDead() {

}

function clearLines() {

}

//Note the piece insertion coordinate is alaways y=1, x=1;
function insertNewpiece(piece_matrix) {
  for (var y = 1; y < piece_matrix[0].length; y++) {
    for (var x = 0; x < piece_matrix[0].length; x++) {
      system[-1+y][3+x] = 2*piece_matrix[y][x];
      alive.push(piece_matrix[y][x]);
    }
  }
  return alive;
}

function rotateCW(piece_matrix) {
  if (piece_matrix[0].length === 4) {
    var tempArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    tempArray[0][1] = piece_matrix[2][0];
    tempArray[0][2] = piece_matrix[1][0];
    tempArray[1][0] = piece_matrix[3][1];
    tempArray[1][1] = piece_matrix[2][1];
    tempArray[1][2] = piece_matrix[1][1];
    tempArray[1][3] = piece_matrix[0][1];
    tempArray[2][0] = piece_matrix[3][2];
    tempArray[2][1] = piece_matrix[2][2];
    tempArray[2][2] = piece_matrix[1][2];
    tempArray[2][3] = piece_matrix[0][2];
    tempArray[3][1] = piece_matrix[2][3];
    tempArray[3][2] = piece_matrix[1][3];
  } else {
    var tempArray = [[0,0,0],[0,1,0],[0,0,0]];
    tempArray[0][0] = piece_matrix[2][0];
    tempArray[0][1] = piece_matrix[1][0];
    tempArray[0][2] = piece_matrix[0][0];
    tempArray[1][0] = piece_matrix[2][1];
    //tempArray[1][1] = 1; //piece_matrix[1][1]; //always === 1
    tempArray[1][2] = piece_matrix[0][1];
    tempArray[2][0] = piece_matrix[2][2];
    tempArray[2][1] = piece_matrix[1][2];
    tempArray[2][2] = piece_matrix[0][2];
  }
    return tempArray;
  }


function rotateCCW(piece_matrix) {
  if (piece_matrix[0].length === 4) {
    var tempArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    tempArray[0][1] = piece_matrix[1][3];
    tempArray[0][2] = piece_matrix[2][3];
    tempArray[1][0] = piece_matrix[0][2];
    tempArray[1][1] = piece_matrix[1][2];
    tempArray[1][2] = piece_matrix[2][2];
    tempArray[1][3] = piece_matrix[3][2];
    tempArray[2][0] = piece_matrix[0][1];
    tempArray[2][1] = piece_matrix[1][1];
    tempArray[2][2] = piece_matrix[2][1];
    tempArray[2][3] = piece_matrix[3][1];
    tempArray[3][1] = piece_matrix[1][0];
    tempArray[3][2] = piece_matrix[2][0];
  } else {
    var tempArray = [[0,0,0],[0,1,0],[0,0,0]];
    tempArray[0][0] = piece_matrix[0][2];
    tempArray[0][1] = piece_matrix[1][2];
    tempArray[0][2] = piece_matrix[2][2];
    tempArray[1][0] = piece_matrix[0][1];
    //tempArray[1][1] = 1; //piece_matrix[1][1]; //always === 1
    tempArray[1][2] = piece_matrix[2][1];
    tempArray[2][0] = piece_matrix[0][0];
    tempArray[2][1] = piece_matrix[1][0];
    tempArray[2][2] = piece_matrix[2][0];
  }
    return tempArray;
  }

  function trimWastedSpace(piece_matrix) {

  }

  function moveLeft(pieceAlive) {
    //play the "move" sound here;

  }
  function moveRight(pieceAlive) {
    //play the "move" sound here;

  }
  function moveDown(pieceAlive) {
    //play the "move" sound here;

  }



  function updateGrid() {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        if (system[y][x] === 2) {
          $('#gee'+ y + "-" + x).addClass("grid-red");
        } else if (system[y][x] === 1) {
          $('#gee'+ y + "-" + x).addClass("grid-red");
        } else {
          $('#gee'+ y + "-" + x).removeClass("grid-red");
        }
      }
    }
    // console.log("updateGrid");
  }

//What follows is keyboard capturing logic
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          console.log("Left arrow");
          break;
          case 38: // up
          console.log("up arrow");
          break;
          case 39: // right
          console.log("right arrow");
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
          resetSystem();
          break;

//below are debug keys to insert a specific block
          case 79: //o
          console.log("o key");
          insertNewpiece(ooh);
          break;
          case 73: //i
          console.log("i key");
          insertNewpiece(eye);
          break;
          case 76: //l
          console.log("l key");
          insertNewpiece(eel);
          break;
          case 74: //j
          console.log("j key");
          insertNewpiece(jay);
          break;
          case 84: //t
          console.log("t key");
          insertNewpiece(tee);
          break;
          case 83: //s
          console.log("s key");
          insertNewpiece(ess);
          break;
          case 90: //z
          console.log("z key");
          insertNewpiece(zee);
          break;

          //G should be used to force "gravity"
          case 71: //g
          console.log("g key");
          break;

          default: return; // exit this handler for other keys
      }
      updateGrid();  //redraw the grid after any keypress
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $(document).ready(function(){

  // setInterval(function(){
  //   $(".grid-item").addClass("grid-red");
  // }, 3000);
  //
  // setInterval(function(){
  //   $(".grid-item").removeClass("grid-red");
  // }, 5900);
  //
  // setInterval(function(){
  //   $(".grid-item").addClass("grid-orange");
  // }, 6000);
  //
  // setInterval(function(){
  //   $(".grid-item").removeClass("grid-orange");
  // }, 2900);

  });
