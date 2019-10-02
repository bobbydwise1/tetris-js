// Tetris Clone
// Classic Tetris created in JavaScript and jQuery, for educational purposes.
// By Robert Lee 08-MAR-2019

class Game {
  constructor(points,level) {
  this.points = points;
  this.level = level;
  this.alive = 0; //equal to piece_matrix
  this.alivePos = [0,0];
  this.next1 = 0;
  this.next = 0;
  this.lines = 0;
  this.gameOver = 0;
  let blankRow = [-1,0,0,0,0,0,0,0,0,0,0,-1];
  this.hitDetectLookAhead3 = 0;
  this.hitDetectLookAhead4 = 0;
  this.system = [
[-1,0,0,0,0,0,0,0,0,0,0,-1],  //y = 0
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],  //y = 9
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1], //y = 20
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], //Required for hit detect
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];
  this.ooh = [
  [0,0,0,0],
  [0,2,2,0],
  [0,2,2,0],
  [0,0,0,0]
  ];
  this.eye =
  [
  [0,0,0,0],
  [3,3,3,3],
  [0,0,0,0],
  [0,0,0,0]
  ];
  this.eel =
  [
  [0,0,0],
  [4,4,4],
  [4,0,0]
  ];
  this.jay =
  [
  [0,0,0],
  [5,5,5],
  [0,0,5]
  ];
  this.tee =
  [
  [0,0,0],
  [6,6,6],
  [0,6,0]
  ];
  this.ess =
  [
  [0,0,0],
  [0,7,7],
  [7,7,0]
  ];
  this.zee =
  [
  [0,0,0],
  [8,8,0],
  [0,8,8]
  ];
  this.one =
  [
  [0,0,0],
  [0,2,0],
  [0,0,0]
  ];

  }
  resetSystem() {
    this.system = [
      [-1,0,0,0,0,0,0,0,0,0,0,-1],  //y = 0
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],  //y = 9
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1],
      [-1,0,0,0,0,0,0,0,0,0,0,-1], //y = 20
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], //Required for hit detect
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
  ];
    console.log("Reset this.system");
    this.points = 0;
    this.level = 0;
    this.alive = 0; //equal to piece_matrix
    this.alivePos = [0,0];
    this.next1 = 0;
    this.next = 0;
    this.lines = 0;
    this.hitDetectLookAhead3 = 0;
    this.hitDetectLookAhead4 = 0;
    this.gameOver = 0;
    }

  clearLines() { //clear lines logic and add points
    let linesCleared = 0;
    for (let y = 0; y < this.system.length-3; y++) {
      if (this.system[y].some(function(element){return element >= 0;}) === false) {
        this.system.splice(y, 1);
        this.system.unshift([-1,0,0,0,0,0,0,0,0,0,0,-1]);
        this.lines++;
        linesCleared++;
      }
    }
    switch (linesCleared) {
      case 4:
      this.points += 1200*(this.level+1);
      break;
      case 3:
      this.points += 300*(this.level+1);
      break;
      case 2:
      this.points += 100*(this.level+1);
      break;
      case 1:
      this.points += 10*(this.level+1);
      default:
      ;
    }
    this.level = Math.floor(this.lines/10);
    this.updateGrid();
  }

  pickRandompiece() { //pick random number from 1 to 7
    let temp = 0;
    let pick = Math.floor((Math.random()*7)+1);
     switch (pick) {
       case 1:
         temp = this.ooh;
       break;
       case 2:
         temp = this.eye;
       break;
       case 3:
         temp = this.eel;
       break;
       case 4:
         temp = this.jay;
       break;
       case 5:
         temp = this.tee;
       break;
       case 6:
         temp = this.ess;
       break;
       default:
         temp = this.zee;
     }
     //Add random rotation to new piece
     let turns = Math.floor((Math.random()*3));
     for ( let i = 0; i < turns; i++ ) {
       temp = this.rotateCCW(temp)
     }
     return temp;
  }

  doNotPickSamePieceTwice(yourCurrentPiece) {
    let temp = this.pickRandompiece()
    while (temp == yourCurrentPiece) {
      temp = this.pickRandompiece()
    }
    return temp
  }

  insertNewpiece(piece_matrix) { //insert new piece and game over detect
    this.next = this.doNotPickSamePieceTwice(piece_matrix)
    this.alivePos = [1,5];
    this.alive = piece_matrix;
    console.table(this.alive)
    for (let y = 0; y < piece_matrix[0].length; y++) {
      for (let x = 0; x < piece_matrix[0].length; x++) {
        if (piece_matrix[y][x] != 0) {
          this.system[y][this.alivePos[1]+x-1] = piece_matrix[y][x];
        }
      }
    }
    if (((this.lookAheadScanLeft() === true) && (this.lookAheadScanRight() === true)) && (this.lookAheadScanDown() === true)) {
      console.log("game over detected");
      this.gameOver = true;
      return this.gameOver;
    }
    return this.alivePos;
  }

  makePieceDead() { //makes active piece dead
    let yoffset = -1;
    let xoffset = -1;
      for (let y = 0; y < this.alive[0].length; y++) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] === this.alive[y][x]) {
            this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] = -1*this.alive[y][x];
          }
        }
      }
      return this.alivePos;
    }

  lookAheadScanLeft() { //hit detect left
    let temp = [];
    let yoffset = -1;
    let xoffset = -2;
    if (this.alive[0].length === 4) {
      this.hitDetectLookAhead = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
    } else {
      this.hitDetectLookAhead = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
    }
    for (let y = 0; y < this.alive[0].length; y++) {
      for (let x = 0; x < this.alive[0].length; x++) {
        if (this.alive[y][x] >= 1) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }
        } else {
            if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    let lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  lookAheadScanRight() { //hit detect right
    let temp = [];
    let yoffset = -1;
    let xoffset = 0;
    if (this.alive[0].length === 4) {
      this.hitDetectLookAhead = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
    } else {
      this.hitDetectLookAhead = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
    }
    for (let y = 0; y < this.alive[0].length; y++) {
      for (let x = this.alive[0].length-1; x >= 0; x--) {
        if (this.alive[y][x] >= 1) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }
        } else {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
          // debugger;
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    let lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  lookAheadScanDown() { //hit detect down and piece placement
    let temp = [];
    let yoffset = 0;
    let xoffset = -1;
    if (this.alive[0].length === 4) {
      this.hitDetectLookAhead = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
    } else {
      this.hitDetectLookAhead = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
    }
    for (let y = this.alive[0].length-1; y >= 0; y--) {
      for (let x = this.alive[0].length-1; x >= 0; x--) {
        if (this.alive[y][x] >= 1) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }
        } else {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    let lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  lookAheadScanRotateCW() { //hit detect for rotate clockwise
    let temp = [];
    let yoffset = -1;
    let xoffset = -1;
    let futureRotate = this.rotateCW(this.alive);
    if (futureRotate[0].length === 4) {
      this.hitDetectLookAhead = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
    } else {
      this.hitDetectLookAhead = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];;
    }
    for (let y = 0; y < futureRotate[0].length; y++) {
      for (let x = 0; x < futureRotate[0].length; x++) {
        if (futureRotate[y][x] >= 1) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*futureRotate[y][x];
          } else {
            this.hitDetectLookAhead[y][x] = futureRotate[y][x];
          }
        } else {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    let lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  lookAheadScanRotateCCW() {  // //hit detect for rotate counter clockwise
    let temp = [];
    let yoffset = -1;
    let xoffset = -1;
    let futureRotate = this.rotateCCW(this.alive);
    if (futureRotate[0].length === 4) {
      this.hitDetectLookAhead = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
    } else {
      this.hitDetectLookAhead = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];;
    }
    for (let y = 0; y < futureRotate[0].length; y++) {
      for (let x = 0; x < futureRotate[0].length; x++) {
        if (futureRotate[y][x] >= 1) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*futureRotate[y][x];
          } else {
            this.hitDetectLookAhead[y][x] = futureRotate[y][x];
          }
        } else {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    let lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  moveLeft() {
    let yoffset = -1;
    let xoffset = -1;
    if (this.lookAheadScanLeft() === false) {
      for (let y = 0; y < this.alive[0].length; y++) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if ((this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] === this.alive[y][x]) && (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] != 0)) {
            this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] = 0;
            this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset-1] = this.alive[y][x];
          }
        }
      }
      this.alivePos[1]--;
    }
      return this.alivePos;
    }

  moveRight() {
    let yoffset = -1;
    let xoffset = -1;
    if (this.lookAheadScanRight() === false) {
      for (let y = this.alive[0].length-1; y >= 0; y--) {
        for (let x = this.alive[0].length-1; x >= 0; x--) {
          if ((this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] === this.alive[y][x]) && (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] != 0)) {
            this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] = 0;
            this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset+1] = this.alive[y][x];
          }
        }
      }
      this.alivePos[1]++;
    }
    return this.alivePos;
  }

  moveDown() {
    if (this.lookAheadScanDown() === true) {
      this.makePieceDead();
      this.clearLines();
      this.insertNewpiece(this.next);
    } else {
      for (let y = this.alive[0].length-1; y >= 0; y--) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if ((this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] === this.alive[y][x]) && (this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] != 0)) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] = 0;
            this.system[this.alivePos[0]+y][this.alivePos[1]-1+x] = this.alive[y][x];
          }
        }
      }
      this.alivePos[0]++;
    }
    return this.alivePos;
  }

  rotateCW(somePiece) {  //This is the internal CW checking
    if (somePiece[0].length === 4) {
      var tempArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      //tempArray[0][0] = somePiece[3][0];  //always zero
      tempArray[0][1] = somePiece[2][0];
      tempArray[0][2] = somePiece[1][0];
      //tempArray[0][3] = somePiece[0][0];  //always zero
      tempArray[1][0] = somePiece[3][1];
      tempArray[1][1] = somePiece[2][1];
      tempArray[1][2] = somePiece[1][1];
      tempArray[1][3] = somePiece[0][1];
      tempArray[2][0] = somePiece[3][2];
      tempArray[2][1] = somePiece[2][2];
      tempArray[2][2] = somePiece[1][2];
      tempArray[2][3] = somePiece[0][2];
      //tempArray[3][0] = somePiece[3][3];  //always zero
      tempArray[3][1] = somePiece[2][3];
      tempArray[3][2] = somePiece[1][3];
      //tempArray[3][3] = somePiece[0][3];  //always zero
    } else {
      var tempArray = [[0,0,0],[0,0,0],[0,0,0]];
      tempArray[0][0] = somePiece[2][0];
      tempArray[0][1] = somePiece[1][0];
      tempArray[0][2] = somePiece[0][0];
      tempArray[1][0] = somePiece[2][1];
      tempArray[1][1] = somePiece[1][1];
      tempArray[1][2] = somePiece[0][1];
      tempArray[2][0] = somePiece[2][2];
      tempArray[2][1] = somePiece[1][2];
      tempArray[2][2] = somePiece[0][2];
    }
    return tempArray;
    //RotateCW could probably be done with a fancy non-standard nested loops.
    //for (y=0; y<somePiece.length; y++) {
    //for (x=0; x<somePiece.length; x++) {
    //tempArray[y][x] = somePiece[somePiece[0].length-1-x][y];}}
    }

  moveCW() {  //This is the actual CW function
    //A "bounce" rotate hit detect must be added
    if (this.lookAheadScanRotateCW() === false) {
      let tempArray = this.rotateCW(this.alive);
      //This erases the old block on game system
      for (let y = 0; y < this.alive[0].length; y++) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if ((this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] === this.alive[y][x]) && (this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] != 0)) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] = 0;
          }
        }
      }
      this.alive = tempArray;
      //This creates the new block on game system
      for (let y = 0; y < this.alive[0].length; y++) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if (this.alive[y][x] != 0) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]+x-1] = this.alive[y][x];
          }
        }
      }
    }
    return this.alive;
  }

  rotateCCW(somePiece) { //This is the internal CCW checking
    if (somePiece[0].length === 4) {
      var tempArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      //tempArray[0][0] = somePiece[0][3];  //always zero
      tempArray[0][1] = somePiece[1][3];
      tempArray[0][2] = somePiece[2][3];
      //tempArray[0][3] = somePiece[3][3];  //always zero
      tempArray[1][0] = somePiece[0][2];
      tempArray[1][1] = somePiece[1][2];
      tempArray[1][2] = somePiece[2][2];
      tempArray[1][3] = somePiece[3][2];
      tempArray[2][0] = somePiece[0][1];
      tempArray[2][1] = somePiece[1][1];
      tempArray[2][2] = somePiece[2][1];
      tempArray[2][3] = somePiece[3][1];
      //tempArray[3][0] = somePiece[0][0];  //always zero
      tempArray[3][1] = somePiece[1][0];
      tempArray[3][2] = somePiece[2][0];
      //tempArray[3][3] = somePiece[3][0];  //always zero
    } else {
      var tempArray = [[0,0,0],[0,0,0],[0,0,0]];
      tempArray[0][0] = somePiece[0][2];
      tempArray[0][1] = somePiece[1][2];
      tempArray[0][2] = somePiece[2][2];
      tempArray[1][0] = somePiece[0][1];
      tempArray[1][1] = somePiece[1][1];
      tempArray[1][2] = somePiece[2][1];
      tempArray[2][0] = somePiece[0][0];
      tempArray[2][1] = somePiece[1][0];
      tempArray[2][2] = somePiece[2][0];
    }
    return tempArray;
    //RotateCCW could probably be done with a fancy non-standard nested loops.
    //for (y=0; y<somePiece.length; y++) {
    //for (x=0; x<somePiece.length; x++) {
    //tempArray[y][x] = somePiece[x][somePiece[0].length-1-y];}}
  }

  moveCCW() { //This is actual CCW fuction
    if (this.lookAheadScanRotateCCW() === false) {
      let tempArray = this.rotateCCW(this.alive);
      //This erases the old block on game system
      for (let y = 0; y < this.alive[0].length; y++) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if ((this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] === this.alive[y][x]) && (this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] != 0)) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] = 0;
          }
        }
      }
      this.alive = tempArray;
      //This creates the new block on game system
      for (let y = 0; y < this.alive[0].length; y++) {
        for (let x = 0; x < this.alive[0].length; x++) {
          if (this.alive[y][x] != 0) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]+x-1] = this.alive[y][x];
          }
        }
      }
    }
    return this.alive;
  }

  updateGrid() { //Technically this is UI
    $('#pointsDisp').text(this.points);
    $('#levelDisp').text(this.level);
    $('#linesDisp').text(this.lines);
    $('#alivePosDisp').text(this.alivePos);
    //redraw main grid
    for (let y = 0; y < this.system.length; y++) {
      for (let x = 0; x < this.system[0].length; x++) {
        switch (Math.abs(this.system[y][x])) {
          case 0:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-item");
          break;
          case 1:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-brown");
          break;
          case 2:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-red");
          break;
          case 3:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-orange");
          break;
          case 4:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-yellow");
          break;
          case 5:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-green");
          break;
          case 6:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-blue");
          break;
          case 7:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-indigo");
          break;
          case 8:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-purple");
          break;
          default:
            $('#gee'+ y + "-" + x).removeClass().addClass("grid-color-dark");
          }
        }
      }
      //clear next box
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          $('#next'+ y + "-" + x).removeClass().addClass("grid-color-dark");
        }
      }
      //redraw next box
      for (let y = 0; y < this.next.length; y++) {
        for (let x = 0; x < this.next[0].length; x++) {
          switch (Math.abs(this.next[y][x])) {
            case 0:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-dark");
            break;
            case 1:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-brown");
            break;
            case 2:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-red");
            break;
            case 3:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-orange");
            break;
            case 4:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-yellow");
            break;
            case 5:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-green");
            break;
            case 6:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-blue");
            break;
            case 7:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-indigo");
            break;
            case 8:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-purple");
            break;
            default:
              $('#next'+ y + "-" + x).removeClass().addClass("grid-color-dark");
            }
          }
        }
    }

  gameLoop() {
    let timerInterval = 1000/(game.level+1);
    let clock = setInterval(
      function() {
        game.moveDown();
        game.updateGrid();
        if (game.gameOver === true) {
            clearInterval(clock);
        }
      },
    timerInterval);
  }

  newGameStart() {
    this.resetSystem();
    this.insertNewpiece(this.pickRandompiece());
    this.gameLoop()
  }

}

let game = new Game(0,0)

$(document).keydown(function(e) { //UI logic and keytrapping
  if (!game.gameOver) {
    switch(e.which) {
      case 37: game.moveLeft(); break; // console.log("Left arrow");
      case 38: break; // console.log("up arrow");
      case 39: game.moveRight(); break; // console.log("right arrow");
      case 40: game.moveDown(); break; // console.log("down arrow");
      case 81: game.moveCW(); break; // console.log("q key");
      case 87: game.moveCCW(); break; // console.log("w key");
      case 32: game.newGameStart(); break; // console.log("spacebar");
      default: return; // exit this handler for other keys
      }
    } else {
        switch(e.which) {
          case 32: game.newGameStart(); break; // console.log("spacebar");
          default: return; // exit this handler for other keys
      }
  }
  game.updateGrid();  //redraw the grid after any keypress
  e.preventDefault(); // prevent the default action (scroll / move caret)

  
});

//https://gamedevelopment.tutsplus.com/tutorials/using-the-html5-gamepad-api-to-add-controller-support-to-browser-games--cms-21345

let hasGP = false;
let repGP;

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    let gp = navigator.getGamepads()[0];
    let html = "";
        html += "id: "+gp.id+"<br/>";

    for(let i=0;i<gp.buttons.length;i++) {
        html+= "Button "+(i+1)+": ";
        if(gp.buttons[i].pressed) html+= " pressed";
        html+= "<br/>";
    }

    for(let i=0;i<gp.axes.length; i+=2) {
        html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
    }

    $("#gamepadDisplay").html(html);
}

// $(document).ready(function() {
//   let hasGP = false;
// 	let repGP;
	
// 	function canGame() {
// 		return "getGamepads" in navigator;
// 	}

// 	function reportOnGamepad() {
// 		let gp = navigator.getGamepads()[0];
// 		let html = "";
// 			html += "id: "+gp.id+"<br/>";
		
// 		for(let i=0;i<gp.buttons.length;i++) {
// 			html+= "Button "+(i+1)+": ";
//       if(gp.buttons[i].pressed) 
//       console.log('press')
//       html+= " pressed";
// 			html+= "<br/>";
// 		}
		
// 		for(let i=0;i<gp.axes.length; i+=2) {
// 			html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
// 		}
		
// 		$("#gamepadDisplay").html(html);
// 	}
		
// 	$(document).ready(function() {

// 		if(canGame()) {

// 			let prompt = "To begin using your gamepad, connect it and press any button!";
// 			$("#gamepadPrompt").text(prompt);
			
// 			$(window).on("gamepadconnected", function() {
// 				hasGP = true;
// 				$("#gamepadPrompt").html("Gamepad connected!");
// 				console.log("connection event");
// 				repGP = window.setInterval(reportOnGamepad,100);
// 			});

// 			$(window).on("gamepaddisconnected", function() {
// 				console.log("disconnection event");
// 				$("#gamepadPrompt").text(prompt);
// 				window.clearInterval(repGP);
// 			});

// 			//setup an interval for Chrome
// 			let checkGP = window.setInterval(function() {
// 				console.log('checkGP');
// 				if(navigator.getGamepads()[0]) {
// 					if(!hasGP) $(window).trigger("gamepadconnected");
// 					window.clearInterval(checkGP);
// 				}
// 			}, 500);
// 		}
		
// 	});
// });