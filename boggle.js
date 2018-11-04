class BoggleBoard {
  constructor(words,dimension) {
    this.dimension = dimension
    this.words = words
    this.firstLoc = []
    this.arrLoc = []
    this.generateBoard = this.shake()
    this.boardReset = JSON.parse(JSON.stringify(this.generateBoard))
    this.board = []

  }
//Generate Board
  shake() {
    let boardBoggle = []
    let dic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i = 0; i < this.dimension; i++) {
      let temp = []
      for (let j = 0; j < this.dimension; j++) {
        let random = Math.floor(Math.random()*26)
        temp.push(dic[random])
      }
      boardBoggle.push(temp)
    }
    return boardBoggle
  }

  // dummyboard() {
  //   let dumboard = []
  //   let dic = "DGHIKLPSYEUTEORN"
  //   let count = 0
  //   for (var i = 0; i < this.dimension; i++) {
  //     let temp = []
  //     for (var j = 0; j < this.dimension; j++) {
  //       temp.push(dic[count])
  //       count++
  //     }
  //     dumboard.push(temp)
  //   }
  //   return dumboard
  // }

  solve() {
    let result = 0
    let arrResult = []
    for (let i = 0; i < this.words.length; i++) {
      this.board = JSON.parse(JSON.stringify(this.boardReset))
      if (this.validation(this.words[i]) === true) {
        result = result + 1
        arrResult.push(this.words[i])
      }
    }
    console.log(`${result} words found :`);
    for (let i = 0; i < arrResult.length; i++) {
      console.log(arrResult[i]);
    }
  }

//Validating words step 1
  validation(words) {
    if (this.search(words[0]) === true) {
      for (let i = 0; i < this.firstLoc.length; i++) {
        this.arrLoc = []
        this.arrLoc.push(this.firstLoc[i])
        if (this.validation2(words) === true) {
          return true
        }
      }
    }
    return false
  }

//Validating words step 2
  validation2(words) {
    for (let j = 1; j < words.length; j++) {
      let row = this.arrLoc[j-1][0]
      let col = this.arrLoc[j-1][1]
      let valueCheck = words[j]
      this.board[row][col] = "Kosong"
      if (this.checkGrid(row, col, valueCheck) === true) {
        this.board[this.arrLoc[this.arrLoc.length -1][0]][this.arrLoc[this.arrLoc.length -1][1]] = "Kosong"
      }
      else if (this.arrLoc.length === 1) {
        return false
      }
      else if (this.checkGrid(row, col, valueCheck) === false) {
        this.arrLoc.splice(-1,1)
        j = j - 2
      }
    }
    return true
  }

//Searching all location of first word
  search(firstcharacter) {
    this.firstLoc = []
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] === firstcharacter) {
          let firstcharacterLoc = []
          firstcharacterLoc.push(i)
          firstcharacterLoc.push(j)
          firstcharacterLoc.join("")
          this.firstLoc.push(firstcharacterLoc)
        }
      }
    }
    return true
  }

//Check next character arround the current character
  checkGrid(row, col, valueCheck) {
    let iStart = row - 1
    let iEnd = row + 1
    let jStart = col - 1
    let jEnd = col + 1

    if (iStart < 0) {
      iStart = 0
    }
    if (iEnd > this.dimension - 1) {
      iEnd = this.dimension - 1
    }
    if (jStart < 0) {
      jStart = 0
    }
    if (jEnd > this.dimension - 1) {
      jEnd = this.dimension - 1
    }

    for (let i = iStart; i <= iEnd; i++) {
      for (let j = jStart; j <= jEnd; j++) {
        if (this.board[i][j] === valueCheck) {
          let loc = []
          loc.push(i)
          loc.push(j)
          loc.join("")
          this.arrLoc.push(loc)
          return true
        }
      }
    }
    return false
  }
}

const dimensi = 4
// const words = ["SUPER","APPLE","SIT","TRIP","TURN"]
const words = require('./data.js')
var game = new BoggleBoard(words,dimensi)


console.log(game.boardReset);
game.solve()
