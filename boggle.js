const data = require("./data.js")

class Boggle {
    constructor(data) {
        this.board = [
            ["T","A","C","D"],
            ["N","M","G","R"],
            ["A","J","K","E"],
            ["M","N","O","P"]
        ]
        // change array to this.shake to make a randomize board
        this.visited_board = [ // false means not yet visited
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false]
        ]
        this.words = ["ANTMAN", "MANTA", "JOKER", "KOKO", "NOPE"] 
        // change this.word to data to iter word in comparison 
    } 
    
    shake() { // release 0
        let output = []
        let dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (let i = 0; i < 4; i++) {
            let temp = []
            for (let j = 0; j < 4; j++) {
                temp.push(dictionary[Math.floor(Math.random() * 26)])
            }
            output.push(temp)
        }
        return output
    }

    surround(row,col, char, visited_board) { // this function check closest char based on certain char
        let output = [false, []]
        
        for (let i = row-1; i <= row+1; i++) {
            for (let j = col-1; j <= col+1; j++) {
                if (i >= 0 && j >= 0 && j <= 3 && i <= 3 && (i != row || j != col) && visited_board[i][j] == false && this.board[i][j] == char) {
                    // check if a certain character exist around character of interest
                    output[0] = true
                    output[1].push({
                        row: i,
                        col: j,
                        value: this.board[i][j]
                    })
                }
            }
        }
        return output
    }
    // this function check whether a single word input does exist in a boggle board

    recursive() {
        
    }

    findOne(board, word) {
        let original_word = word
        let original_visited = JSON.parse(JSON.stringify(this.visited_board)) // masih error 
        let visited = null
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                visited = original_visited
                if (word[0] == board[row][col]) { // we get the first word here
                    var x = row; var y = col 
                    while (word.length > 0) {
                        let index = null
                        if (word.length == 1) {
                            index = 0
                        } else {
                            index = 1
                        }
                        let temp = this.surround(x, y, word[index], visited)
                        //[ true, [ { row: 3, col: 2, value: 'O' } ] ] <-- hasil dari surround

                         if (temp[0] == true) {
                                visited[x][y] = true
                                x = temp[1][0].row
                                y = temp[1][0].col
                                word = word.slice(1)
                                if (word.length == 1) {
                                    return true // ud pasti ketemu 
                                }       
                            
                        } else {
                            break
                        }  
                    } 
                    word = original_word
                } 
            }
        }
        return false  
    }

    solve() {
        let output = []
        for (let i = 0; i < this.words.length; i++) {
            if (this.findOne(this.board, this.words[i]) == true) {
                output.push(this.words[i])
            }
        }
        console.log(this.board)
        if (output.length == 0) {
            console.log("No words appear in boggle board")
        } else {
            console.log(output)
        }
    }
}


// test board
// let board = [["T","A","C","D"],
//             ["N","M","G","R"],
//             ["A","J","K","E"],
//             ["M","N","O","P"]]


// ["ANTMAN", "MANTA", "JOKER", "KOKO", "NOPE"]  
let game = new Boggle(data)
//console.log(game.findOne(board, "MANTA"))
game.solve()
//console.log(game.findOne(board, "MANTA"))


