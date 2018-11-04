class Boggle {
  constructor () {
    this.usedCoordinate = [];
  }

  randomChar() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars[Math.floor(Math.random()*26)];
  }
 
  //RELEASE 0 : CREATE METHOD SHAKE WITH INPUT SIZE OF BOARD AND RETURN ARRAY SIZE*SIZE WITH SUFFLED CHARACTER A-Z
  shake (size) {
    let boardArr = [];
    for (let i = 0; i < size; i++) {
      if (boardArr[i] === undefined) {
        boardArr.push([]);
      }
      for (let j = 0 ; j < size ; j++) {
        boardArr[i][j] = this.randomChar();
      }
    }
    return boardArr;
  }

  printBoard(board) {
    let printBoard = "";
    let printPerline = "";
    let printBorder = "";
    for (let i = 0 ; i < board.length ; i++) {
      for (let j = 0 ; j < board.length; j++) {
        printPerline += `| ${board[i][j]} `;
        printBorder += "----";
      }
      printPerline += '|'
      printBorder += "-"
      printBoard += printBorder+"\n"+printPerline+"\n";
      if(i === board.length-1) {
        printBoard += printBorder
      }
      printBorder = ""
      printPerline = "";
    }
    return console.log(printBoard);
  }

  //Release 1
  // Check direction and check if string is match
    checkCoordinate(coordinate, direction,boardSize) {
      let newRow = coordinate[0];
      let newColumn = coordinate[1];
      switch (direction) {
        case 1:
          newColumn += 1;
          break;
        case 2:
          newRow += 1;
          newColumn += 1;
          break;
        case 3:
          newRow += 1;
          break;
        case 4:
          newRow += 1;
          newColumn -= 1;
          break;
        case 5:
          newColumn -= 1;
          break;
        case 6:
          newRow -= 1;
          newColumn -= 1;
          break;
        case 7:
          newRow -= 1;
          break;
        case 8:
          newRow -= 1;
          newColumn += 1;
          break;            
        default:
          break;
      }
      let newCoordinate = [newRow,newColumn];
      if (newRow < 0 || newRow >= boardSize || newColumn < 0 || newColumn >= boardSize || this.checkIncludes(newCoordinate, this.usedCoordinate) === true) {
        return false;
      } else {
        return newCoordinate;
      }
    }
  
    checkIncludes(coordinate, arrayUsedCoordinate) {
      let strCoor = ""+coordinate[0]+coordinate[1];
      for (let i = 0 ; i < arrayUsedCoordinate.length; i++) {
        let strArrUsedCoor = "";
        for (let j = 0 ; j < arrayUsedCoordinate[i].length ; j++) {
          strArrUsedCoor += arrayUsedCoordinate[i][j];
        }
        if (strArrUsedCoor === strCoor) {
          return true;
        }
      }
      return false;
    }

}

var game = new Boggle();

//RELEASE 0 : CREATE METHOD SHAKE WITH INPUT SIZE OF BOARD AND RETURN ARRAY SIZE*SIZE WITH SUFFLED CHARACTER A-Z
let shuffledBoard = (game.shake(4));
console.log("RELESE 0 TEST")
game.printBoard(shuffledBoard);
console.log("")

let sampleBoard = [
  ['D', 'G', 'H', 'I'],
  ['K', 'L', 'P', 'S'],
  ['Y', 'E', 'U', 'T'],
  ['E', 'O', 'R', 'N']
]
console.log("RELESE 1 TEST")
game.printBoard(sampleBoard);
console.log("TURN", game.findString("TURN",sampleBoard));
console.log("SUPER",game.findString("SUPER",sampleBoard));
console.log("APPLE",game.findString("APPLE",sampleBoard));
console.log("PUPI",game.findString("PUPI",sampleBoard));
console.log("")