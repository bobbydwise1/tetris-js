var game = new Game(0,0)

function Game(points,level) {
  this.points = points;
  this.level = level;
  this.alive = 0; //equal to piece_matrix
  this.alivePos = [0,0];
  this.next1 = 0;
  this.next = 0;
  this.lines = 0;
  var blankRow = [-1,0,0,0,0,0,0,0,0,0,0,-1];
  var zeroMatrix3 = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  var zeroMatrix4 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  this.hitDetectLookAhead3 = 0;
  this.hitDetectLookAhead4 = 0;
  this.system = [
[-1,0,0,0,0,0,0,0,0,0,0,-1],  //y = 0 don't draw this line on UI
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
[-1,-2,0,-2,0,0,0,0,0,0,0,-1],
[-1,-2,-2,0,0,0,0,0,0,0,0,-1],
[-1,-2,-2,-2,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1],
[-1,-2,-2,-2,0,0,0,0,0,0,0,-1],
[-1,-2,-2,-2,0,0,0,0,0,0,0,-1],
[-1,-2,0,0,0,0,0,0,0,0,0,-1],
[-1,-2,-2,-2,0,0,0,0,0,0,0,-1], //y = 20
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], //do not get rid of this
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], //do not get rid of this
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]  //do not get rid of this
];

  this.ooh = [
  [0,0,0,0],
  [0,2,2,0],
  [0,2,2,0],
  [0,0,0,0]
  ];  //Note these are piece_matrices

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
  [-1,-2,0,-2,0,0,0,0,0,0,0,-1],
  [-1,-2,-2,0,0,0,0,0,0,0,0,-1],
  [-1,-2,-2,-2,0,0,0,0,0,0,0,-1],
  [-1,0,0,0,0,0,0,0,0,0,0,-1],
  [-1,-2,-2,-2,0,0,0,0,0,0,0,-1],
  [-1,-2,-2,-2,0,0,0,0,0,0,0,-1],
  [-1,-2,0,0,0,0,0,0,0,0,0,-1],
  [-1,-2,-2,-2,0,0,0,0,0,0,0,-1], //y = 20
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
  ];  //Game world is designed so no voids-null-NaN-undefined occurs in maths.
    console.log("Reset this.system");
    this.points = points;
    this.level = level;
    this.alive = 0; //equal to piece_matrix
    this.alivePos = [0,0];
    this.next1 = 0;
    this.next = 0;
    this.lines = 0;
    this.hitDetectLookAhead3 = 0;
    this.hitDetectLookAhead4 = 0;
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
      this.points += 1200*linesCleared*(this.level+1);
      break;
      case 3:
      this.points += 300*linesCleared*(this.level+1);
      break;
      case 2:
      this.points += 100*linesCleared*(this.level+1);
      break;
      default:
      this.points += 10*linesCleared*(this.level+1);
    }
    this.level = Math.floor(this.lines/10);
    this.updateGrid();
  }

  Game.prototype.pickRandompiece = function () {
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

  Game.prototype.insertNewpiece = function(piece_matrix) {
    this.alivePos = [1,5];
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

  Game.prototype.makePieceDead = function() {
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
        //if your this.alive[y][x] spot is === 1
        if (this.alive[y][x] >= 1) {
          //check if the left box is a dead piece or null
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            //if it is dead, this is a collision.  make the future spot === negative number
                this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the this.alive piece;
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }  //terminates inner if
        } else {
          //if your this.alive[y][x] is empty, check the this.system spot to the left of you if it is a dead piece or null.  Since your this.alive[y][x] is empty, you can safely take any this.system value of the spot to the left of you+
            if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    // console.log("temp", temp);
    // console.table(this.hitDetectLookAhead)
    lowest = Math.min(...temp);
    // console.log("lowest", lowest);
    if (lowest < -1) {
      // console.log("Hit detect left = true")
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanRight = function() { //hit detect etc....
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
        //if your this.alive[y][x] spot is === 1
        if (this.alive[y][x] >= 1) {
          //check if the right box is a dead piece or null
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the this.alive piece;
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }  //terminates nexted if block.  next section of code continues the outer if.
        } else {
          //if your this.alive[y][x] is empty, check the this.system spot to the right of you if it is a dead piece or null.  Since your this.alive[y][x] is empty, you can safely take any this.system value of the spot to the right of you+
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
          // debugger;
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    // console.log("temp", temp);
    // console.table(this.hitDetectLookAhead)
    lowest = Math.min(...temp);
    // console.log("lowest", lowest);
    if (lowest < -1) {
      // console.log("Hit detect right = true")
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanDown = function() {
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
          //check if the right box is a dead piece or null
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*this.alive[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the this.alive piece;
            this.hitDetectLookAhead[y][x] = this.alive[y][x];
          }  //terminates nexted if block.  next section of code continues the outer if.
        } else {
          //if your this.alive[y][x] is empty, check the this.system spot to the right of you if it is a dead piece or null.  Since your this.alive[y][x] is empty, you can safely take any this.system value of the spot to the right of you+
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
          // debugger;
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    // console.log("temp", temp);
    // console.table(this.hitDetectLookAhead)
    lowest = Math.min(...temp);
    // console.log("lowest", lowest);
    if (lowest < -1) {
      // console.log("Hit detect down = true")
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanRotateCW = function () {
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
          //check if the right box is a dead piece or null
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*futureRotate[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the futureRotate piece;
            this.hitDetectLookAhead[y][x] = futureRotate[y][x];
          }  //terminates nexted if block.  next section of code continues the outer if.
        } else {
          //if your futureRotate[y][x] is empty, check the this.system spot to the right of you if it is a dead piece or null.  Since your futureRotate[y][x] is empty, you can safely take any this.system value of the spot to the right of you+
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
          // debugger;
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    // console.log("temp", temp);
    // console.table(this.hitDetectLookAhead)
    lowest = Math.min(...temp);
    // console.log("lowest", lowest);
    if (lowest < -1) {
      // console.log("Rotate CW hit = true")
      return true;
    }
    return false;
  }

  Game.prototype.lookAheadScanRotateCCW = function () {  //last hit detect
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
          //check if the right box is a dead piece or null
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
                this.hitDetectLookAhead[y][x] = -1*futureRotate[y][x];
          } else {
            //otherwise, it's an empty spot, make it equal the futureRotate piece;
            this.hitDetectLookAhead[y][x] = futureRotate[y][x];
          }  //terminates nexted if block.  next section of code continues the outer if.
        } else {
          //if your futureRotate[y][x] is empty, check the this.system spot to the right of you if it is a dead piece or null.  Since your futureRotate[y][x] is empty, you can safely take any this.system value of the spot to the right of you+
          if (this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset] <= -1) {
            this.hitDetectLookAhead[y][x] = -this.system[this.alivePos[0]+y+yoffset][this.alivePos[1]+x+xoffset];
          }
          // debugger;
        }
      }
      temp.push(Math.min(...this.hitDetectLookAhead[y]));
    }
    // console.log("temp", temp);
    // console.table(this.hitDetectLookAhead)
    lowest = Math.min(...temp);
    // console.log("lowest", lowest);
    if (lowest < -1) {
      // console.log("Rotate CCW hit = true")
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
      // console.log("pos after key press: ", this.alivePos);
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
    // console.log("pos after key press: ", this.alivePos);
    // console.log(zeroMatrix3);
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
    // console.log("pos after key press: ", this.alivePos);
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
    //A "bounce" rotate hit detect must be added
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

  Game.prototype.updateGrid = function() { //Move outside game object someday.
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
    // console.log("Left arrow");
    game.moveLeft();
    break;
    case 38: // up
    // console.log("up arrow");
    break;
    case 39: // right
    // console.log("right arrow");
    game.moveRight();
    break;
    case 40: // down
    // console.log("down arrow");
    game.moveDown();
    break;
    case 81: // lowercase q
    // console.log("q key");
    game.moveCW();
    break;
    case 87: // lowercase w
    // console.log("w key");
    game.moveCCW();
    break;
    case 32: //spacebar
    // console.log("spacebar");
    game.resetSystem();
    break;
    //----DEBUG KEYS-----------------------------------------------
    //below are debug keys to insert a specific block
    case 79: //o
    // console.log("o key");
    game.insertNewpiece(game.ooh);
    break;
    case 73: //i
    // console.log("i key");
    game.insertNewpiece(game.eye);
    break;
    case 76: //l
    // console.log("l key");
    game.insertNewpiece(game.eel);
    break;
    case 74: //j
    // console.log("j key");
    game.insertNewpiece(game.jay);
    break;
    case 84: //t
    // console.log("t key");
    game.insertNewpiece(game.tee);
    break;
    case 83: //s
    // console.log("s key");
    game.insertNewpiece(game.ess);
    break;
    case 90: //z
    // console.log("z key");
    game.insertNewpiece(game.zee);
    break;
    case 75: //z
    // console.log("k key");
    game.insertNewpiece(game.one);
    break;
    case 82: //r
    // console.log("r key");
    game.insertNewpiece(game.pickRandompiece());
    break;
    //G should be used to force "gravity, but gravity is just a down key"
    case 71: //g
    console.log("g key");
    break;
    //----DEBUG KEYS------------------------------------------------
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
