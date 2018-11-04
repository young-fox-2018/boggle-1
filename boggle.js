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

    findString(str,board) {
      let prefix = "";
      //do looping check entire board one by one
      for (let i = 0 ; i < board.length ; i++) {
        for (let j = 0 ; j < board[i].length ; j++) {
          let currentCoordinate = [i,j];
          prefix = board[i][j];
          this.usedCoordinate = [];
          //run the string check in current coordinate 
          if (this.runCheck (currentCoordinate, prefix, str, board) === true) {
            return true;
          }
        }
      }
      //if until end of looping not return true then return false;
      return false;
    }
  
    //REKURSIF FUNCTION CHECKING IF INPUT PARAMETER PREFIX IN DICTIONARY OR NOT, IT IS LIKE BACKTRACK ALGORITHM THAT USED IN SUDOKU EXERCISE
    runCheck (coordinate, prefixStr, str, board) {
      let boardSize = board.length;
      if (str.indexOf(prefixStr) === 0 && prefixStr !== str) { //check if prefix is par of string or not
        this.usedCoordinate.push(coordinate);
        //do check for every direction that represented by number
        // → = 1 , ↘ = 2 , ↓ = 3, ↙ = 4 , ← = 5, ↖ = 6, ↑ = 7, ↗ = 8
        for (let direction = 1 ; direction <=8 ; direction++) {
          let newCoordinate = this.checkCoordinate(coordinate,direction,boardSize);
          if (newCoordinate !== false) {
            let row = newCoordinate[0];
            let column = newCoordinate[1];
            prefixStr += board[row][column];
            //DO RECURSIVE 'runCheck' TO CHECK NEXT COORDINATE WITH INPUT UPDATED PREFIX
            if (this.runCheck(newCoordinate, prefixStr, str, board) === true) {
              return true;
            } else {
              prefixStr = prefixStr.slice(0,prefixStr.length-1); //remove last added char using slice
            }
          }
        }
        this.usedCoordinate.pop();
      } else if (prefixStr === str) { //check condition if the string found in board
        return true;
      } else return false; // return false if prefix is not substring of str
    }

    //RELEASE 2 FIND ALL STRING 
    findAllString(dictionary, board) {
      let isFound = false;
      for (let i = 0 ; i < dictionary.length ; i++) {
        if (this.findString(dictionary[i],board) === true) {
          console.log ("FOUND STRING",dictionary[i]);
          isFound = true;
        } 
      }
      if (isFound === false) {
        console.log("NONE DICTIONARY STRING AVAILABLE IN BOARD");
      }
    }
  

}

var game = new Boggle();

//RELEASE 0 : CREATE METHOD SHAKE WITH INPUT SIZE OF BOARD AND RETURN ARRAY SIZE*SIZE WITH SUFFLED CHARACTER A-Z
let shuffledBoard = (game.shake(4));
console.log("Release 0, random board")
game.printBoard(shuffledBoard);
console.log("")

let sampleBoard = [
  ['D', 'G', 'H', 'I'],
  ['K', 'L', 'P', 'S'],
  ['Y', 'E', 'U', 'T'],
  ['E', 'O', 'R', 'N']
]
console.log("Release 1, cek arah mata angin")
game.printBoard(sampleBoard);
console.log("TURN", game.findString("TURN",sampleBoard));
console.log("SUPER",game.findString("SUPER",sampleBoard));
console.log("APPLE",game.findString("APPLE",sampleBoard));
console.log("PUPI",game.findString("PUPI",sampleBoard));
console.log("")

game.printBoard(sampleBoard);
  console.log("TURN", game.findString("TURN",sampleBoard));
  console.log("SUPER",game.findString("SUPER",sampleBoard));
  console.log("APPLE",game.findString("APPLE",sampleBoard));
  console.log("PUPI",game.findString("PUPI",sampleBoard));
  console.log("")
  
  //RELEASE 2 TEST 
  let sampleDictionary = ['APPLE','SIT','TRIP','TURN','SUPER'];
  console.log("Coba dengan array kata yang di set manual")
  game.printBoard(sampleBoard);
  game.findAllString(sampleDictionary,sampleBoard);
  console.log("")
  
  // RELEASE 2 TEST 
  let importedDictionary = require('./data.js');
  
  console.log("Coba cek dengan board random dan kata di file data.js")
  game.printBoard(shuffledBoard);
  game.findAllString(importedDictionary.words,sampleBoard);