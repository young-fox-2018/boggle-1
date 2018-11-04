class Boggle {
    constructor(dictionary) {
        this.dictionary = dictionary
        // this.dictionary =
        this.board = [
            ['D', 'G', 'H', 'T'],
            ['K', 'L', 'P', 'U'],
            ['Y', 'E', 'U', 'S'],
            ['E', 'O', 'R', 'N']
        ]

    }
    // Release 0
    shake(num) {
        let board = [],
            alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 0; i < num; i++) {
            let line = []
            for (let j = 0; j < num; j++) {
                let idx = Math.floor(Math.random() * 26)
                line.push(alphabet[idx])
            }
            board.push(line)
        }
        return board
    }


    checkWord(word) {
        let papan = this.board
        let data = {}
        let marked = '*'
        for (let i = 0; i < papan.length; i++) {
            for (let j = 0; j < papan[i].length; j++) {
                if (papan[i][j] === word[0]) {
                    data.word = word
                    data.prefix = word[0]
                    data.x = i
                    data.y = j
                }
            }
        }
        let key = Object.keys(data)
        if (!key.length) return false
        for (let a = 1; a < word.length; a++) {
            if (data.x + 1 < 4 && data.x - 1 >= 0 && data.y + 1 < 4 && data.y - 1 >= 0) {
                // kanan
                if (word[a] === papan[data.x][data.y + 1]) {
                    data.prefix = word[a]
                    data.y++
                    papan[data.x][data.y] = marked
                }
                // kiri
                else if (word[a] === papan[data.x][data.y - 1]) {
                    data.prefix = word[a]
                    data.y--
                    papan[data.x][data.y] = marked
                }
                // atas
                else if (word[a] === papan[data.x - 1][data.y]) {
                    data.prefix = word[a]
                    data.x--
                    papan[data.x][data.y] = marked
                    // break
                }
                // bawah
                else if (word[a] === papan[data.x + 1][data.y]) {
                    data.prefix = word[a]
                    data.x++
                    papan[data.x][data.y] = marked
                }
                // diagonal kanan atas
                else if (word[a] === papan[data.x - 1][data.y + 1]) {
                    data.prefix = word[a]
                    data.x--
                    data.y++
                    papan[data.x][data.y] = marked
                }
                // diagonal kanan bawah
                else if (word[a] === papan[data.x + 1][data.y + 1]) {
                    data.prefix = word[a]
                    data.x++
                    data.y++
                    papan[data.x][data.y] = marked
                }
                // diagonal kiri bawah
                else if (word[a] === papan[data.x + 1][data.y - 1]) {
                    data.prefix = word[a]
                    data.x++
                    data.y--
                    papan[data.x][data.y] = marked
                }
                // diagonal kiri atas
                else if (word[a] === papan[data.x - 1][data.y - 1]) {
                    data.prefix = word[a]
                    data.x--
                    data.y--
                    papan[data.x][data.y] = marked
                } else {
                    return false
                }
            }
        }
        return true
    }
    solve() {
        let words = this.dictionary,
            output = []
        for (let i = 0; i < words.length; i++) {
            if (this.checkWord(data[i]) === true) {
                words.push(data[i])
                // console.log(`Found word ${data[i]}`)
            }
        }
        if (!words.length) return `Return no word found!`
        else {
            for (let i = 0; i < words.length; i++) {
                console.log(`Found word ${words[i]}`)
            }
        }
    }
}

// let data = require('./data.js')
let data = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER']

let game = new Boggle(data)
let papan = game.board
console.log(papan)
console.log(game.checkWord('TRIP'))
game.solve()
console.log(papan)
// console.log(data[15])