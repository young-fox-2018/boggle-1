class Boggle {
    constructor(size, dictionary) {
        this.size = size
        this.dictionary = dictionary
        this.board = []
    }

    createBoard() {
        for ( let i = 0; i < this.size; i++) {
            let innerBoard = []

            for ( let j = 0; j < this.size; j++) {
                innerBoard[j] = this.randomizeAlphabet()
                console.log(innerBoard)
            }

            this.board.push(innerBoard)

        }

        return this.board
    }

    randomizeAlphabet() {
        let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        return arr[Math.floor(Math.random() * arr.length)]
    }
}

const boggle = new Boggle(5)
console.log(boggle.createBoard())