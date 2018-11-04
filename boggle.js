/* kata yg dicari di random melalui data.js

let data = require("./data.js")
let howManyWords = 10 //bila hanya ini mencari 10 kata random
// let howManyWords = Math.floor(Math.random() * data.length) //bila benar-benar ingin jumlah kata random
const words = []

for(let i = 0; i < howManyWords; i++){
    words.push(data[Math.floor(Math.random() * data.length)])
}

*/

//kata yg dicari sudah ditentukan diawal
const words = ["TURN","SIT","APPLE","TRIP","SUPER","GET","JOB","BETA","ZEBRA", "BOBO"]

class Boggle{
    constructor(num){
        this.dimension = num
    }

    shake(){
        let result = []
        const dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for(let i = 0; i < this.dimension; i++){
            let inner = []
            for(let j = 0; j < this.dimension; j++){
                let randomNum = Math.floor(Math.random() * 26)
                inner.push(dictionary[randomNum])
            }
            result.push(inner)
        }
        return result
    }


    // TERDAPAT 2 TEST CASE, UNTUK MELIHAT BAHWA SCRIPT BERJALAN DENGAN BAIK
    board(){
        //let boardBase = this.shake()
        // let boardBase = this.trial1()
        let boardBase = this.trial2()

        return boardBase
    }

    solve(){
        let result = []

        for(let a = 0; a < words.length; a++){
            let board = this.board()
            let arrCoordinate = []
            let iStart = 0
                let jStart = 0
                let iEnd = this.dimension
                let jEnd = this.dimension
            for(let b = 0; b < words[a].length; b++){                
                let inside = this.findLetter(board, iStart, jStart, iEnd, jEnd, words[a][b])
                if(inside === false){
                    break;
                } else{
                    iStart = inside.row - 1
                    jStart = inside.col - 1
                    iEnd = inside.row + 2
                    jEnd = inside.col + 2

                    if(iStart < 0){
                        iStart = 0
                    }
                    if(jStart < 0){
                        jStart = 0
                    }
                    if(iEnd >= this.dimension){
                        iEnd = this.dimension
                    }
                    if(jEnd >= this.dimension){
                        jEnd = this.dimension
                    }

                    board[inside.row][inside.col] = 0
                    arrCoordinate.push(inside)
                }

            }
            if(arrCoordinate.length === words[a].length){
                result.push(words[a])
            }
        }
        if(result.length === 0){
            return "NO WORD FOUND"
        } else{
            let join = result.join(", ")
            return `found: ${join}`
        }
    }

    findLetter(board, iStart, jStart, iEnd, jEnd, letter){
        let inner = {}
        for(let i = iStart; i < iEnd; i++){
            for(let j = jStart; j < jEnd; j++){
                if(board[i][j] === letter){
                    inner.huruf = letter
                    inner.row = i
                    inner.col = j
                    return inner
                }
            }
        }
        return false
    }

    trial1(){
        return [[ 'A', 'K', 'J', 'D' ],
                [ 'Z', 'A', 'O', 'H' ],
                [ 'G', 'E', 'B', 'R' ],
                [ 'T', 'F', 'J', 'V' ] ]
    }
    
    trial2(){    
        return [[ 'D', 'G', 'H', 'I' ],
                [ 'K', 'L', 'P', 'S' ],
                [ 'Y', 'E', 'U', 'T' ],
                [ 'E', 'O', 'R', 'N' ] ]
    }
  
}

let game = new Boggle(4)

console.log(game.solve())