
let fs = require ('fs')
// let arr = fs.readFile()
let data = require('./data.js')
let dummy = [
    ['A'],['K'],['J'],['D'],
    ['Z'],['A'],['O'],['H'],
    ['G'],['E'],['B'],['R'],
    ['T'],['F'],['J'],['V']
]
class boggle {
    constructor(data){
        this.board = this.shake()
        this.testCase = data
        this.visit = [
            ['false','false','false','false'],
            ['false','false','false','false'],
            ['false','false','false','false'],
            ['false','false','false','false']
        ]
    }

    shake(){
        let row = []
        let lib = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (let i = 0; i < 4; i++) {
            let column = []
            for (let index = 0; index < 4; index++) {
                let rand = Math.floor(Math.random()*lib.length)
                column.push(lib[rand])
            }
            row.push(column)
        }
        return row
    }

    solve(){
        let result = []
        for (let i = 0; i < this.testCase.length; i++) {
            if (this.findFirst(this.board, this.testCase[i]) === true) {
                result.push(this.testCase[i])
            }
        }
        console.log(this.board)
        if (output.length == 0) {
            console.log("Tidak ada huruf yang sama sesuai")
        } else {
            console.log(`ada ${result.length} kata yang ditemukan, yaitu: ${result}` )
        }
    }

    checkAround(coordinateX, coordinateY, step){
        
        
        return output
    }

    findFirst(board, word){
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let coordinat = this.visit
                if(word[0] === board[i][j]){
                    let start = board[i][j]
                    let step = [board[i][j]]
                    
                    while(step.length > 0){
                        counter += 1
                        if(checkAround(board[i][j]) === true){
                            step.push 
                            if(step.length === word.length-1){
                                return true 
                            }
                        } else {
                            if(step.length === 1){
                                return false
                            }else{
                                step.length -= 1
                            }
                        }   
                    
                    }
                    let temp = this.visit[i][j]

                }
                
            }
        }
    }

    
}



let baru = new boggle(data)

console.log(baru.board)