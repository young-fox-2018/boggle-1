class Boggle {
    constructor(){
        this.board = []
        this.history = []
    }

    randomAlphabeth() {
        const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return alph[Math.floor(Math.random()*26)]
    }

    shake() {
        for (let i=0; i < 4; i++) {
            this.board.push([])
            for (let j=0; j < 4; j++) {
                this.board[i].push(this.randomAlphabeth())
            }
        }
    }

    dummyShake() {
        const dummyAlph = 'DGHIKLPSYEUTEORN'
        let index = 0
        for (let i=0; i < 4; i++) {
            this.board.push([])
            for (let j=0; j < 4; j++) {
                this.board[i].push(dummyAlph[index++])
            }
        }
    }
}

let main = new Boggle()

main.dummyShake()
console.log(main.board)