class Boggle {
    constructor(dim){
        this.dimensi = dim //board dimension
        this.board = []
        this.papan = []
        this.kata = kamus
        this.kataAda = [] //array to store words that found on board
    }

    generateBoardRandom(){
        var tempboard = []
        for(let i = 0; i < this.dimensi; i++){
            let arrRow = []
            for(let j = 0; j < this.dimensi; j++){
                let randomHuruf = Math.floor(Math.random()*26) + 65
                arrRow.push(String.fromCharCode(randomHuruf))
            }
            tempboard.push(arrRow)
        }
        return tempboard
    }

    generateBoardManual(){
        var tempboard = []
        let count = 0
        for(let i = 0; i < this.dimensi; i++){
            let arrRow = []
            for(let j = 0; j < this.dimensi; j++){
                arrRow.push(hurufBoard[count])
                count++
            }
            tempboard.push(arrRow)
        }
        return tempboard
    }

    cekKamus(){
        console.log("-----------BOARD-----------")
        var table = this.generateBoardRandom()
        // var table = this.generateBoardManual()
        this.board = JSON.parse(JSON.stringify(table))
        this.papan = JSON.parse(JSON.stringify(table))
        console.log(this.board)
        console.log("")

        let i = 0
        while(i < banyakKata){
            // console.log("===TRUE/FALSE=== " + this.solve(this.kata[0]))
            if(this.solve(this.kata[0]) === true){
                this.kataAda.push(this.kata[0])
            }
            this.kata.shift()
            i += 1
            this.board = JSON.parse(JSON.stringify(this.papan))
            
            // console.log("")
            // console.log(`kata-${i} next ${this.kata}`)
        }
        
        console.log("kata yang ada di board: " + this.kataAda)
        // console.log(this.board)
        return ("\n" + "jumlah kata yang ada di board: "+this.kataAda.length)
    }

    solve(word){
        var arr = this.addIdxFirstLetter(word[0])
        //  debug
        //  console.log("firstLetter location:",arr)

        if(arr.length === 0){
            // debug
            // console.log("---kata "+ word +" tidak ada---")
            return false
        } else {
            // debug
            // console.log("")
            // console.log("kamusNow:", this.kata)
            // console.log("kata yang dicari", word)
            // console.log("panjang kata:",word.length)
            // console.log("firstLetter location:",arr)
            // console.log("init:", [arr[0][0],arr[0][1],word.length])

            while(!this.checkGrid(arr[0][0],arr[0][1],(word.length))){
                this.board = JSON.parse(JSON.stringify(this.papan))
                this.deleteidxFirstLetter(arr)
                // console.log("after delete:", arr)
                if(arr.length <= 0){
                    break
                }
            }
            if(arr.length <= 0){
                return false
            } else {
                return true
            }
        }

    }

    addIdxFirstLetter(word){
        let arrPositionFirstLetter = []
        for(let i = 0; i < this.dimensi; i++){
            for(let j = 0; j < this.dimensi; j++){
                if(this.board[i][j] === word[0]){
                    arrPositionFirstLetter.push([i,j])
                }
            }
        }
        return arrPositionFirstLetter
    }

    deleteidxFirstLetter(arr){
        arr.shift()
        // debug
        // console.log("FirstLetterLocation after shift:",arr)
    }

    checkGrid(idxX,idxY,count){
        if(count === 0){
            return true
        } else {
            let startX = idxX - 1
            let endX = startX + 2
            let startY = idxY - 1
            let endY = startY + 2

            if(startX < 0){
                startX = 0
            } else if( endX > this.dimensi-1){
                endX = this.dimensi-1
            } else if( startY < 0){
                startY = 0
            } else if(endY > this.dimensi-1){
                endY = this.dimensi-1
            }
            
            // debug 
            // console.log("STARTX: "+startX+"-"+endX)
            // console.log("STARTY: "+startY+"-"+endY)

            for( let i = startX; i <= endX; i++){
                for(let j = startY; j <= endY; j++){
                    //debug
                    // console.log("huruf dicari:",this.kata[0][this.kata[0].length - count])
                    if(this.kata[0][this.kata[0].length - count] === this.board[i][j]){
                        // debug
                        // console.log("update:",[i,j,count-1])
                        // console.log("arrKataAdaNow:", this.kataAda)
                        // console.log("")
                        this.board[i][j] = " "
                        return this.checkGrid(i,j,count-1)
                    }
                }
            }
            return false
        }
    }
}

const kamus = require('./data.js')

// ---- kamus dummies ----
// var kamus = ['TURN']
// var kamus = ["APPLE"]
// var kamus = ['ISI','SIT','APPLE','SUPER','TRIP','TURN','PURE', 'SHIP','YOUR','KLEORE','KLEORUS']

var banyakKata = kamus.slice(0).length
// console.log(banyakKata)

// ---- generate board manual / just dummies ----
// Uncoment below if you want to generate board manually
// var hurufBoard = 'TGHIKLPSYEUTTORN'

var boggle = new Boggle(4)
console.log(boggle.cekKamus())
