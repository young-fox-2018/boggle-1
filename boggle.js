const RandomBoard = require('./randomBoard')


class Boggle {
    constructor() {
        this._board = RandomBoard.board()
        this._dummyBoard = []
        this._findWords = []
    }

    set dummy(input) {
        this._dummyBoard = input
    }

    get dummy() {
        return this._dummyBoard
    }

    set words(input) {
        this._findWords = input
    }

    get words() {
        return this._findWords
    }

    solve() {
        let words = this._findWords
        let result = []
        for (let i = 0; i < words.length; i++) {
            // var board = JSON.parse(JSON.stringify(this._board))
            var board = JSON.parse(JSON.stringify(this._dummyBoard))
            let boggleInfo = {
                indexOfFound: [],
                theLetter: [],
                index: 0
            }
            let j = 0
            if (checkFirstLetter(i, j, boggleInfo, board)) {
                j++
                let found = checkWord(i, j, boggleInfo, board);
                if (found) {
                    result.push(words[i])
                }
            }
        }
    
        function checkFirstLetter(i, j, boggleInfo) {
            let letter = words[i][j]
            for (let y = 0; y < board.length; y++) {
                for (let x = 0; x < board[y].length; x++) {
                    if (board[y][x] == letter) {
                        boggleInfo.indexOfFound.push([x, y, letter])
                        boggleInfo.theLetter.push(board[y][x])
                        board[y][x] = ' '
                        return true
                    }
                }
            }
        }
    
        function checkWord(i, j, boggleInfo) {
            let letter = words[i][j]
    
            if (letter == undefined) {
                return true
            }
    
            while (boggleInfo.index >= 0) {
                if (letter == undefined) {
                    return false
                }
                let y = boggleInfo.indexOfFound[boggleInfo.index][1]
                let x = boggleInfo.indexOfFound[boggleInfo.index][0]
                let firstY = y
                let firstX = x
                let xMax = 0
                let yMax = 0
                changeXY()
    
                function changeXY() {
                    if (x > 0) {
                        if (x == 3) {
                            x--
                            xMax = x + 2
                        } else {
                            x--
                            xMax = x + 3
                        }
                    } else {
                        xMax = x + 2
                    }
    
                    if (y > 0) {
                        if (y == 3) {
                            y--
                            yMax = y + 2
                        } else {
                            y--
                            yMax = y + 3
                        }
                    } else {
                        yMax = y + 2
                    }
                }
    
                for (let a = y; a < yMax; a++) {
                    for (let b = x; b < xMax; b++) {
                        if (board[a][b] == letter) {
                            let next = false
                            for (let k = 0; k < boggleInfo.indexOfFound.length; k++) {
                                if (boggleInfo.indexOfFound[k][2] == letter && boggleInfo.indexOfFound[k][0] == b && boggleInfo.indexOfFound[k][1] == a) {
                                    next = true
                                }
                            }
                            if (next) {
                                boggleInfo.index++
                                continue
                            } else {
                                boggleInfo.indexOfFound.push([b, a, letter])
                                if (!boggleInfo.theLetter.includes(letter)) boggleInfo.theLetter.push(letter)
                                boggleInfo.index++
                                board[a][b] = ' '
                                j++
                                return checkWord(i, j, boggleInfo)
                            }
                        }
                    }
                }
                j--
                letter = words[i][j]
                for (let i = 0; i < boggleInfo.indexOfFound.length; i++) {
                    if (boggleInfo.indexOfFound[i][2] == letter && boggleInfo.indexOfFound[i][0] == firstX && boggleInfo.indexOfFound[i][1] == firstY) {
                        board[firstY][firstX] = letter
                    }
                }
                boggleInfo.index--
            }
        }
        return result
    }
}

let game = new Boggle()

game.dummy = [
    ['D', 'M', 'A', 'X'],
    ['B', 'O', 'V', 'R'],
    ['Z', 'N', 'A', 'B'],
    ['R', 'W', 'W', 'A']
]

game.words = ['MONA', 'VAWA', 'NOVA', 'ANI', 'ADI']


// console.log(RandomBoard.board().join('\n'))
console.log(game.dummy.join('\n'))
console.log(`WORDS TO FIND: ${game.words}`)
console.log(`WORDS FOUND IN BOARD: ${game.solve()}`)