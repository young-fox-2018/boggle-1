

class Boggle {
    constructor(library) {
        //randomBoard
        // this.wordLibrary = library
        // this.board = this.generateRandomBoard()
        //dummy
        this.wordLibrary = library
        this.board = this.generateDummyBoard()
    }
    //randomBoard
    generateRandomBoard() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let limit = 4
        let board = []
        let index = 0
        for (let i = 0; i < limit; i++) {
            board.push([])
            for (let j = 0; j < limit; j++) {
                board[i].push(alphabet[Math.floor(Math.random() * alphabet.length)])
                index++
            }
        }
        return board
    }
    //dummyBoard
    generateDummyBoard() {
        let dummyBoard = [
            ['D', 'G', 'R', 'N'],
            ['K', 'A', 'P', 'S'],
            ['Y', 'E', 'U', 'T'],
            ['N', 'O', 'R', 'N']
        ]
        return dummyBoard
    }
    matchFirstLetter(letter) {
        let board = this.board
        let arr = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === letter) {
                    arr.push([i, j])
                }
            }
        }
        return arr
    }

    matchNextLetter(coorX, coorY, board, checkLetter) {
        if (board[coorX][coorY] !== checkLetter[0]) {
            return false
        }
        if (board[coorX][coorY] === checkLetter[0] && checkLetter.length > 1) {
            board[coorX][coorY] = ' '
            checkLetter.splice(0, 1)
        }
        if (board[coorX][coorY] === checkLetter[0] && checkLetter.length === 1) {
            board[coorX][coorY] = ' '
            return true
        }

        let startX = coorX - 1
        let limitX = coorX + 1
        let startY = coorY - 1
        let limitY = coorY + 1
        let limit = 3

        if (startX < 0) {
            startX = 0
        }
        if (limitX >= limit) {
            limitY = limit
        }
        if (startY < 0) {
            startY = 0
        }
        if (limitY >= limit) {
            limitY = limit
        }
        for (let i = startX; i <= limitX; i++) {
            for (let j = startY; j <= limitY; j++) {
                if (checkLetter[0] === board[i][j]) {
                    return this.matchNextLetter(i, j, board, checkLetter)
                }
            }
        }
        return false
    }

    matchWords(word) {
        let board = this.board
        let findFirstLetter = this.matchFirstLetter(word[0])
        while (findFirstLetter.length) {
            let tempBoard = JSON.parse(JSON.stringify(board))
            let splitLetter = word.split('')
            let isFound = this.matchNextLetter(findFirstLetter[0][0], findFirstLetter[0][1], tempBoard, splitLetter)
            if (isFound) {
                return true
            } else {
                findFirstLetter.splice(0, 1)
            }
        }
        return false
    }

    play() {
        let board = this.board
        let library = this.wordLibrary
        let foundWords = []
        for (let i = 0; i < library.length; i++) {
            let foundWord = this.matchWords(library[i])
            if (foundWord) {
                foundWords.push(library[i])
            }
        }
        console.log(board)
        if (!foundWords.length) {
            console.log(`Game Over, No Words Found!`)
        } else {
            console.log(`You Win!! ${foundWords.length} words found: `)
            console.log(foundWords.join('\n'))
        }
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }


}

const randomDict = require('./data.js')
const dummyDict = ['TURN', 'YARN', 'SUPER', 'ALL', 'DAY', 'PUPU', 'PEPE']
let solve = new Boggle(dummyDict)

// console.log(randomDict)

solve.play()

