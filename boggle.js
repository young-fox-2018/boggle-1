class Boogel {
    constructor() {
        this._Board = []
        this._Words = []
        this.usedCoordinate = [];
    }

    set Board(input) {
        this._Board = input
    }
    set Words(input) {
        this._Words = input
    }

    board(size) {
        let alfabet = "ABCDEFGHIJKLMOPQRSTUVWXYZ"
        let board = []
        for (let i = 0; i < size; i++) {
            let inner = []
            for (let j = 0; j < size; j++) {
                let random = Math.floor(Math.random() * alfabet.length)
                inner.push(alfabet[random])
            }
            board.push(inner)
        }
        this._Board = board
    }

    checkIncludes(coordinate, arrayUsedCoordinate) {
        let strCoor = "" + coordinate[0] + coordinate[1];
        for (let i = 0; i < arrayUsedCoordinate.length; i++) {
            let strArrUsedCoor = "";
            for (let j = 0; j < arrayUsedCoordinate[i].length; j++) {
                strArrUsedCoor += arrayUsedCoordinate[i][j];
            }
            if (strArrUsedCoor === strCoor) {
                return true;
            }
        }
        return false;
    }

    checkCoordinate(coordinate, direction, boardSize) {
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
        let newCoordinate = [newRow, newColumn];
        if (newRow < 0 || newRow >= boardSize || newColumn < 0 || newColumn >= boardSize || this.checkIncludes(newCoordinate, this.usedCoordinate) === true) {
            return false;
        } else {
            return newCoordinate;
        }
    }


    check(coordinate, prefixStr, str) {
        let boardSize = this._Board.length;
        if (str.indexOf(prefixStr) === 0 && prefixStr !== str) {
            this.usedCoordinate.push(coordinate);
            for (let direction = 1; direction <= 8; direction++) {
                let newCoordinate = this.checkCoordinate(coordinate, direction, boardSize);
                if (newCoordinate !== false) {
                    let row = newCoordinate[0];
                    let column = newCoordinate[1];
                    prefixStr += this._Board[row][column];
                    if (this.check(newCoordinate, prefixStr, str) === true) {
                        return true;
                    } else {
                        prefixStr = prefixStr.slice(0, prefixStr.length - 1);
                    }
                }
            }
            this.usedCoordinate.pop();
        } else if (prefixStr === str) {
            return true;
        } else return false;
    }

    findWord(str) {
        let boards = this._Board
        let prefix = "";
        for (let i = 0; i < boards.length; i++) {
            for (let j = 0; j < boards[i].length; j++) {
                let firstcoordinate = [i, j];
                prefix = boards[i][j];
                this.usedCoordinate = [];
                if (this.check(firstcoordinate, prefix, str) === true) {
                    return true;
                }
            }
        }
        return false;
    }

    solve() {
        let words = this._Words
        let isFound = false;
        let result = []
        for (let i = 0; i < words.length; i++) {
            if (this.findWord(words[i]) === true) {
                isFound = true
                result.push(words[i])
            }
        }
        if (isFound === false) console.log("NO FOUND WORDS")
        else console.log(`FOUND ${result.length} WORD : ${result}`)
    }


}
const game = new Boogel();
console.log("=== WITH STATIC BOARD ===");
game.Board = [
    ["D", "G", "H", "I"],
    ["K", "L", "P", "S"],
    ["Y", "E", "U", "T"],
    ["E", "T", "R", "N"]
]
console.log(game._Board);
console.log("Result Board 1 :");
game.Words = ["APPLE", "SIT", "TRIP", "SUPER", "TURN"]
game.solve()

console.log(" ");
console.log("=== WITH RANDOM BOARD ===");
game.board(4)
console.log(game._Board);
console.log("Result Board 2:");
let data = require('./data');
game.Words = data
game.solve()



