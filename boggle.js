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

}

var game = new Boggle();

//RELEASE 0 : CREATE METHOD SHAKE WITH INPUT SIZE OF BOARD AND RETURN ARRAY SIZE*SIZE WITH SUFFLED CHARACTER A-Z
let shuffledBoard = (game.shake(4));
console.log("RELESE 0 TEST")
game.printBoard(shuffledBoard);
console.log("")
