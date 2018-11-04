class Boggle {
    constructor(){
        this.board = []
        this.words = ['TURN']
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
        const dummyAlph = 'TGTTKULUYZURNORN'
        // const dummyAlph = 'DGHIKLPSYEUTEORN'
        let index = 0
        for (let i=0; i < 4; i++) {
            this.board.push([])
            for (let j=0; j < 4; j++) {
                this.board[i].push(dummyAlph[index++])
            }
        }
    }

    solve() {
        let wordFound = 0
        for (let i = 0; i < this.words.length; i++) {
            let histories = []
            let wordBoard = JSON.parse(JSON.stringify(this.board))
            for (let j = 0; j < this.words[i].length; j++) {
                if(j === 0) {
                    if (this.findFirstAlph(wordBoard,this.words[i][j]) === 'blank') break;
                    else {
                        histories.push(this.findFirstAlph(wordBoard,this.words[i][j]))
                        wordBoard[histories[j].x][histories[j].y] = ' '
                    }
                } else {
                    if(this.findAlph(wordBoard,this.words[i][j],histories[j-1]) === 'blank') {
                        j-=2
                        histories.pop()
                    } else {
                        histories.push(this.findAlph(wordBoard,this.words[i][j],histories[j-1]))
                        wordBoard[histories[j].x][histories[j].y] = ' '
                    }
                }
            }
            console.log(wordBoard)
            console.log(histories)
        }
    }
    
    findFirstAlph(board,str) {
        let status = false
        let pos = {}
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (str === board[i][j]){
                    pos.alphabeth = board[i][j]
                    pos.x = i
                    pos.y = j
                    status = true
                } 
                if (status === true) return pos
                else if (status === false && (i === board.length-1 && j === board.length-1)) return 'blank'
            }
        }
    }
    
    findAlph(board,str,history) {
        let pos = {}
        let status = false
        let maxi = history.x + 1
        let mini = history.x - 1
        let maxj = history.y + 1
        let minj = history.y - 1
        if (maxi > 3) maxi = 3
        if (maxj > 3) maxj = 3
        if (mini < 0) mini = 0
        if (minj < 0) minj = 0
        for(let i = mini; i <= maxi; i++) {
            for (let j = minj; j <= maxj; j++) {
                if (board[i][j] === str) {
                    pos.alphabeth = board[i][j]
                    pos.x = i
                    pos.y = j
                    status = true
                }
                if (status === false && (i === maxi && j === maxj)) return 'blank'
                if (status === true) return pos
            }
        }
    }
}

let main = new Boggle()

main.dummyShake()
// console.log(main.board)
main.solve()