class Boggle {
    constructor(size, dictionary, wordFound) {
        this.size = size
        this.dictionary = dictionary
        this.board = []
        this.searchWord = 'rtor'
        this.saves = []
        this.charFound = []
        this.createBoard()
    }

    createBoard() {
        let a = [1,2,3]
        let b =         JSON.parse(JSON.stringify(a))
        // for ( let i = 0; i < this.size; i++) {
        //     let innerBoard = []

        //     for ( let j = 0; j < this.size; j++) {
        //         innerBoard[j] = this.randomizeAlphabet()
        //     }

        //     this.board.push(innerBoard)
        // }

        this.board = [
            ['o', 'o', 'b', 'c'],
            ['o', 't', 'o', 't'],
            ['r', 'r', 'r', 'i'],
            ['j', 'k', 'm', 'y'],
        ];
    }

    solve() {
        let wordPos = 0
        let wordFound = ['rtor']
        let charFound = []
        let obj = {}
        let d = {}

        while (wordPos < wordFound.length) {
            for (let i = 0; i < this.searchWord[wordPos].length; i++) {
                for ( let y = 0; y < this.board.length; y++) {
                    for ( let x = 0; x < this.board[y].length; x++) {
                            if (this.board[y][x] === this.searchWord.charAt(i) && charFound.length === 0) {
                                console.log('masuk', "isi pertama kali")
                                console.log('row', y)
                                console.log('column', x)
                                obj.row = y
                                obj.column = x
                                obj.value = this.board[y][x]
                                charFound.push(obj)

                                this.board[y][x] = 'visited'
                                y = 0
                                x = 0
                            } else if (this.board[y][x] === this.searchWord.charAt(i)) {
                                if ((
                                    this.checkTop(y, x) ||
                                    this.checkNorthEast(y , x) ||
                                    this.checkRight(y , x) ||
                                    this.checkSouthEast(y , x) ||
                                    this.checkSouth(y ,x) ||
                                    this.checkSouthwest(y, x) ||
                                    this.checkLeft(y, x) ||
                                    this.checkNorthWest(y, x)
                                )) {
                                    console.log('masuk dan ada isi di array')
                                    obj.row = y
                                    obj.column = x
                                    obj.value = this.board[y][x]
                                    charFound.push(obj)

                                    this.board[y][x] = 'visited'
                                    y = 0
                                    x = 0
                                } else {
                                    charFound.pop()
                                }
                            }
                        }
                    }
                }

            if (charFound.length == wordFound[wordPos].length) {
                console.log('word: ' + wordFound[wordPos] + "ditemukan")
            } else {
                console.log('word: ' + wordFound[wordPos] + " tidak ditemukan" )
            }

            wordPos++
        }
    }

    /**
     * To  check left side hwnt it is possible
     */
    checkLeft(row, column) {
        // 0 0
        if (this.charFound[length - 1].column - 1 == column && row == this.charFound[length - 1].row) {
            return true
        } else {
            return false
        }
    }

    checkRight(row, column) {
        if (row == this.charFound[this.charFound.length - 1].row &&
            this.charFound[this.charFound.length].column + 1 == column) {
            return true
        } else {
            return false
        }
    }

    checkTop(row, column) {
        if (column == this.charFound[this.charFound.length - 1].column &&
            this.charFound[this.charFound.length - 1].row -1 == row) {
            return true
        } else {
            return false
        }
    }

    checkDown(row, column) {
        if (column == this.charFound[this.charFound.length - 1].column &&
            this.charFound[this.charFound.length - 1].row + 1 == row) {
            return true
        } else {
            return false
        }
    }

    checkNorthWest(row, column) {
        if (this.charFound[this.charFound.length - 1].column - 1  === column && this.charFound[this.charFound.length - 1].row - 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkNorthEast(row, column) {
        if (this.charFound[this.charFound.length - 1].column  + 1  === column &&
            this.charFound[this.charFound.length - 1].row - 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkSouthEast(row, column) {
        if (this.charFound[this.charFound.length - 1].column  + 1  === column &&
            this.charFound[this.charFound.length - 1].row + 1 === row) {
            return true
        } else {
            return false
        }
    }

    checkSouthwest(row, column) {
        if (this.charFound[this.charFound.length - 1].column - 1 === column &&
            this.charFound[this.charFound.length - 1].row + 1 === row) {
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

const boggle = new Boggle(3)
boggle.solve();

// O T A

// x   0 1 2
//
// y
// 0   E A B
// 1   C G T
// 2   M O A
