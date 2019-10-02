// Tetris Clone
// Classic Tetris created in JavaScript and jQuery, for educational purposes.
// By Robert Lee 08-MAR-2019

var game = new Game(0,0)

function Game(points,level) {
  this.points = points;
  this.level = level;
  this.alive = 0; //equal to piece_matrix
  this.alivePos = [0,0];
  this.next1 = 0;
  this.next = 0;
  this.lines = 0;
  this.gameOver = 0;
  var blankRow = [-1,0,0,0,0,0,0,0,0,0,0,-1];
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

  Game.prototype.resetSystem = function() {
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

  Game.prototype.clearLines = function() { //clear lines logic and add points
    var linesCleared = 0;
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

  Game.prototype.pickRandompiece = function () { //pick random number from 1 to 7
    var temp = 0;
    var pick = Math.floor((Math.random()*7)+1);
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
     return temp;
  }

  Game.prototype.insertNewpiece = function(piece_matrix) { //insert new piece and game over detect
    this.alivePos = [1,5];
    this.alive = piece_matrix;
    for (var y = 1; y < piece_matrix[0].length; y++) {
      for (var x = 0; x < piece_matrix[0].length; x++) {
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

  Game.prototype.makePieceDead = function() { //makes active piece dead
    var yoffset = -1;
    var xoffset = -1;
      for (var y = 0; y < this.alive[0].length; y++) {
        for (var x = 0; x < this.alive[0].length; x++) {
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] === this.alive[y][x]) {
            this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] = -1*this.alive[y][x];
          }
        }
      }
      return this.alivePos;
    }

  Game.prototype.lookAheadScanLeft = function() { //hit detect left
    temp = [];
    var yoffset = -1;
    var xoffset = -2;
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
    for (var y = 0; y < this.alive[0].length; y++) {
      for (var x = 0; x < this.alive[0].length; x++) {
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
    lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanRight = function() { //hit detect right
    temp = [];
    var yoffset = -1;
    var xoffset = 0;
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
    for (var y = 0; y < this.alive[0].length; y++) {
      for (var x = this.alive[0].length-1; x >= 0; x--) {
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
    lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanDown = function() { //hit detect down and piece placement
    temp = [];
    yoffset = 0;
    xoffset = -1;
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
    for (var y = this.alive[0].length-1; y >= 0; y--) {
      for (var x = this.alive[0].length-1; x >= 0; x--) {
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
    lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanRotateCW = function () { //hit detect for rotate clockwise
    temp = [];
    yoffset = -1;
    xoffset = -1;
    futureRotate = this.rotateCW(this.alive);
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
    for (var y = 0; y < futureRotate[0].length; y++) {
      for (var x = 0; x < futureRotate[0].length; x++) {
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
    lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanRotateCCW = function () {  // //hit detect for rotate counter clockwise
    temp = [];
    yoffset = -1;
    xoffset = -1;
    futureRotate = this.rotateCCW(this.alive);
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
    for (var y = 0; y < futureRotate[0].length; y++) {
      for (var x = 0; x < futureRotate[0].length; x++) {
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
    lowest = Math.min(...temp);
    if (lowest < -1) {
      return true;
    }
    return false;
  }

  Game.prototype.moveLeft = function() {
    var yoffset = -1;
    var xoffset = -1;
    if (this.lookAheadScanLeft() === false) {
      for (var y = 0; y < this.alive[0].length; y++) {
        for (var x = 0; x < this.alive[0].length; x++) {
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

  Game.prototype.moveRight = function() {
    var yoffset = -1;
    var xoffset = -1;
    if (this.lookAheadScanRight() === false) {
      for (var y = this.alive[0].length-1; y >= 0; y--) {
        for (var x = this.alive[0].length-1; x >= 0; x--) {
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

  Game.prototype.moveDown = function() {
    if (this.lookAheadScanDown() === true) {
      this.makePieceDead();
      this.clearLines();
      this.insertNewpiece(this.pickRandompiece());
    } else {
      for (var y = this.alive[0].length-1; y >= 0; y--) {
        for (var x = 0; x < this.alive[0].length; x++) {
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

  Game.prototype.rotateCW = function() {  //This is the internal CW
    if (this.alive[0].length === 4) {
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
      var tempArray = [[0,0,0],[0,0,0],[0,0,0]];
      tempArray[0][0] = this.alive[2][0];
      tempArray[0][1] = this.alive[1][0];
      tempArray[0][2] = this.alive[0][0];
      tempArray[1][0] = this.alive[2][1];
      tempArray[1][1] = this.alive[1][1];
      tempArray[1][2] = this.alive[0][1];
      tempArray[2][0] = this.alive[2][2];
      tempArray[2][1] = this.alive[1][2];
      tempArray[2][2] = this.alive[0][2];
    }
    return tempArray;
    //RotateCW could probably be done with a fancy non-standard nested loops.
    //for (y=0; y<this.alive.length; y++) {
    //for (x=0; x<this.alive.length; x++) {
    //tempArray[y][x] = this.alive[this.alive[0].length-1-x][y];}}
    }

  Game.prototype.moveCW = function() {  //This is the actual CW
    //A "bounce" rotate hit detect must be added
    if (this.lookAheadScanRotateCW() === false) {
      tempArray = this.rotateCW(this.alive);
      //This erases the old block on game system
      for (var y = 0; y < this.alive[0].length; y++) {
        for (var x = 0; x < this.alive[0].length; x++) {
          if ((this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] === this.alive[y][x]) && (this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] != 0)) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] = 0;
          }
        }
      }
      this.alive = tempArray;
      //This creates the new block on game system
      for (var y = 0; y < this.alive[0].length; y++) {
        for (var x = 0; x < this.alive[0].length; x++) {
          if (this.alive[y][x] != 0) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]+x-1] = this.alive[y][x];
          }
        }
      }
    }
    return this.alive;
  }

  Game.prototype.rotateCCW = function() { //This is the hidden CCW
    if (this.alive[0].length === 4) {
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
      var tempArray = [[0,0,0],[0,0,0],[0,0,0]];
      tempArray[0][0] = this.alive[0][2];
      tempArray[0][1] = this.alive[1][2];
      tempArray[0][2] = this.alive[2][2];
      tempArray[1][0] = this.alive[0][1];
      tempArray[1][1] = this.alive[1][1];
      tempArray[1][2] = this.alive[2][1];
      tempArray[2][0] = this.alive[0][0];
      tempArray[2][1] = this.alive[1][0];
      tempArray[2][2] = this.alive[2][0];
    }
    return tempArray;
    //RotateCCW could probably be done with a fancy non-standard nested loops.
    //for (y=0; y<this.alive.length; y++) {
    //for (x=0; x<this.alive.length; x++) {
    //tempArray[y][x] = this.alive[x][this.alive[0].length-1-y];}}
  }

  Game.prototype.moveCCW = function() { //This is actual CCW
    if (this.lookAheadScanRotateCCW() === false) {
      tempArray = this.rotateCCW(this.alive);
      //This erases the old block on game system
      for (var y = 0; y < this.alive[0].length; y++) {
        for (var x = 0; x < this.alive[0].length; x++) {
          if ((this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] === this.alive[y][x]) && (this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] != 0)) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]-1+x] = 0;
          }
        }
      }
      this.alive = tempArray;
      //This creates the new block on game system
      for (var y = 0; y < this.alive[0].length; y++) {
        for (var x = 0; x < this.alive[0].length; x++) {
          if (this.alive[y][x] != 0) {
            this.system[this.alivePos[0]-1+y][this.alivePos[1]+x-1] = this.alive[y][x];
          }
        }
      }
    }
    return this.alive;
  }

  Game.prototype.updateGrid = function() { //Technically this is UI
    $('#pointsDisp').text(this.points);
    $('#levelDisp').text(this.level);
    $('#linesDisp').text(this.lines);
    $('#alivePosDisp').text(this.alivePos);
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
    }
}



$(document).keydown(function(e) { //UI logic and keytrapping
  switch(e.which) {
    case 37:
      // console.log("Left arrow");
      game.moveLeft();
    break;
      case 38:
      // console.log("up arrow");
    break;
    case 39:
      // console.log("right arrow");
      game.moveRight();
    break;
    case 40:
      // console.log("down arrow");
      game.moveDown();
    break;
    case 81:
      // console.log("q key");
      game.moveCW();
    break;
    case 87:
      // console.log("w key");
      game.moveCCW();
    break;
    case 32:  //Spacebar BEGINS game and END game logic located here
      // console.log("spacebar");
      game.resetSystem();
      game.insertNewpiece(game.pickRandompiece());
      var timerInterval = 1000/(game.level+1);
      var clock = setInterval(
        function() {
          game.moveDown();
          game.updateGrid();
          if (game.gameOver === true) {
              clearInterval(clock);
          }
        },
      timerInterval);
    break;
    default:
    return; // exit this handler for other keys
  }
  game.updateGrid();  //redraw the grid after any keypress
  e.preventDefault(); // prevent the default action (scroll / move caret)

  
});

//https://gamedevelopment.tutsplus.com/tutorials/using-the-html5-gamepad-api-to-add-controller-support-to-browser-games--cms-21345

var hasGP = false;
var repGP;

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
        html += "id: "+gp.id+"<br/>";

    for(var i=0;i<gp.buttons.length;i++) {
        html+= "Button "+(i+1)+": ";
        if(gp.buttons[i].pressed) html+= " pressed";
        html+= "<br/>";
    }

    for(var i=0;i<gp.axes.length; i+=2) {
        html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
    }

    $("#gamepadDisplay").html(html);
}

$(document).ready(function() {
  var hasGP = false;
	var repGP;
	
	function canGame() {
		return "getGamepads" in navigator;
	}

	function reportOnGamepad() {
		var gp = navigator.getGamepads()[0];
		var html = "";
			html += "id: "+gp.id+"<br/>";
		
		for(var i=0;i<gp.buttons.length;i++) {
			html+= "Button "+(i+1)+": ";
      if(gp.buttons[i].pressed) 
      console.log('press')
      html+= " pressed";
			html+= "<br/>";
		}
		
		for(var i=0;i<gp.axes.length; i+=2) {
			html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
		}
		
		$("#gamepadDisplay").html(html);
	}
		
	$(document).ready(function() {

		if(canGame()) {

			var prompt = "To begin using your gamepad, connect it and press any button!";
			$("#gamepadPrompt").text(prompt);
			
			$(window).on("gamepadconnected", function() {
				hasGP = true;
				$("#gamepadPrompt").html("Gamepad connected!");
				console.log("connection event");
				repGP = window.setInterval(reportOnGamepad,100);
			});

			$(window).on("gamepaddisconnected", function() {
				console.log("disconnection event");
				$("#gamepadPrompt").text(prompt);
				window.clearInterval(repGP);
			});

			//setup an interval for Chrome
			var checkGP = window.setInterval(function() {
				console.log('checkGP');
				if(navigator.getGamepads()[0]) {
					if(!hasGP) $(window).trigger("gamepadconnected");
					window.clearInterval(checkGP);
				}
			}, 500);
		}
		
	});
});