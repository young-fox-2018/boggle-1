class Boggle {
    constructor(size, searchWord) {
        this.size = size
        this.board = []
        this.searchWord = searchWord
        this.charFound = []
        this.createBoard()
    }

    createBoard() {
        let a = [1,2,3]
   
        for ( let i = 0; i < this.size; i++) {
            let innerBoard = []

            for ( let j = 0; j < this.size; j++) {
                innerBoard[j] = this.randomizeAlphabet()
            }

            this.board.push(innerBoard)
        }
    }

    solve() {
        let wordPos = 0
        let obj = {}
        let d = {}
        let foundAlphabet = false
        let foundWords = []

        while (wordPos < this.searchWord.length) {
           
            let useBoard = JSON.parse(JSON.stringify(this.board))
      
            for (let i = 0; i < this.searchWord[wordPos].length; i++) {
                for (let y = 0; y < useBoard.length; y++) {
                    for (let x = 0; x < useBoard[y].length; x++) {
                       if (useBoard[y][x] === this.searchWord[wordPos].charAt(i) && this.charFound.length === 0) {                       
                            obj.row = y
                            obj.column = x
                            obj.value = useBoard[y][x]
                            useBoard[y][x] = "temp"
                            this.charFound.push(obj)                
                           
                            y = 0
                            x = 0

                            foundAlphabet = true
                            break
                        } else if (useBoard[y][x] === this.searchWord[wordPos].charAt(i)) {
                            if ((
                                this.checkTop(y, x) ||
                                this.checkNorthEast(y , x, useBoard) ||
                                this.checkRight(y , x, useBoard) ||
                                this.checkSouthEast(y , x, useBoard) ||
                                this.checkDown(y ,x, useBoard) ||
                                this.checkSouthwest(y, x, useBoard) ||
                                this.checkLeft(y, x) ||
                                this.checkNorthWest(y, x)
                            )) {
                                obj.row = y
                                obj.column = x
                                obj.charPos = i
                                obj.value = useBoard[y][x]
                                useBoard[y][x] = "temp"
                                this.charFound.push(obj)

                                y = 0
                                x = 0

                                foundAlphabet = true
                                break
                            } else {
                                useBoard[this.charFound[this.charFound.length - 1].row][this.charFound[this.charFound.length - 1].column] = 'visited'                               
                                this.charFound.pop()
                          
                                y = 0
                                x = 0

                                if (y != this.board.length -1 && x != this.board.length - 1 && this.charFound.length != 0) {
                                    i = this.charFound[this.charFound.length - 1].charPos
                                    break
                                }
                            }
                        }
                    }

                    if (foundAlphabet) {
                        foundAlphabet = false
                        break
                    }
                }
            }

            if (this.charFound.length == this.searchWord[wordPos].length) {
              foundWords.push(this.searchWord[wordPos])
            }

            wordPos++
        }

        console.log(foundWords.length + " FOUND: ")

        for (let i = 0; i < foundWords.length; i++) {
            console.log(foundWords[i])
        }
    }

    /**
     * To  check left side if it is possible
     */
    checkLeft(row, column) {
        // 0 0
        if (this.charFound[this.charFound.length - 1].column - 1 >= 0 && this.charFound[this.charFound.length - 1].column - 1 == column 
            && row == this.charFound[this.charFound.length - 1].row) {
            return true
        } else {
            return false
        }
    }

    checkRight(row, column, useBoard) {
        if (this.charFound[this.charFound.length - 1].column + 1 < useBoard.length && row == this.charFound[this.charFound.length - 1].row &&
            this.charFound[this.charFound.length - 1].column + 1 === column) {
            return true
        } else {
            return false
        }
    }

    checkTop(row, column) {
        if (this.charFound[this.charFound.length - 1].row - 1 >= 0 && column == this.charFound[this.charFound.length - 1].column &&
            this.charFound[this.charFound.length - 1].row - 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkDown(row, column, useBoard) {
        if (this.charFound[this.charFound.length - 1].row  + 1 < useBoard.length
            && column == this.charFound[this.charFound.length - 1].column
            && this.charFound[this.charFound.length - 1].row + 1 == row) {
            return true
        } else {
            return false
        }
    }

    checkNorthWest(row, column) {
        if (this.charFound[this.charFound.length - 1].column - 1 >= 0 
            && this.charFound[this.charFound.length - 1].row - 1 >= 0
            && this.charFound[this.charFound.length - 1].column - 1  === column
            && this.charFound[this.charFound.length - 1].row - 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkNorthEast(row, column, useBoard) {
        if (this.charFound[this.charFound.length - 1].column  + 1  < useBoard.length
            && this.charFound[this.charFound.length - 1].row - 1  >= 0
            && this.charFound[this.charFound.length - 1].column  + 1 < useBoard.length
            && this.charFound[this.charFound.length - 1].column  + 1  === column
            && this.charFound[this.charFound.length - 1].row - 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkSouthEast(row, column, useBoard) {
        if (this.charFound[this.charFound.length - 1].column  + 1 < useBoard.length
            && this.charFound[this.charFound.length - 1].row + 1 < useBoard.length 
            && this.charFound[this.charFound.length - 1].column  + 1  === column
            && this.charFound[this.charFound.length - 1].row + 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkSouthwest(row, column, useBoard) {
        if (this.charFound[this.charFound.length - 1].column - 1 >= 0
            && this.charFound[this.charFound.length - 1].row + 1 < useBoard.length 
            && this.charFound[this.charFound.length - 1].column - 1 === column
            && this.charFound[this.charFound.length - 1].row + 1 === row) {
            return true
        } else {
            return false
        }

    }
    randomizeAlphabet() {
        let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        return arr[Math.floor(Math.random() * arr.length)]
    }

    moveLeft(row , column) {

    }
}

const boggle = new Boggle(4,["SAST"])
boggle.solve()