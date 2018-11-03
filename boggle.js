// var kamus = ['APPLE','SIT','SUPER','TRIP','TURN']
var kamus = ['TURN']

class Boggle {
    constructor(dim){
        this.dimensi = dim
        this.board = []
        this.kata = kamus
    }

    generateBoard(){
        for(let i = 0; i < this.dimensi; i++){
            let arrRow = []
            for(let j = 0; j < this.dimensi; j++){
                let randomHuruf = Math.floor(Math.random()*26) + 65
                arrRow.push(String.fromCharCode(randomHuruf))
            }
            this.board.push(arrRow)
        }
        return this.board
    }

    generateBoardManual(){
        let count = 0
        for(let i = 0; i < this.dimensi; i++){
            let arrRow = []
            for(let j = 0; j < this.dimensi; j++){
                arrRow.push(hurufBoard[count])
                count++
            }
            this.board.push(arrRow)
        }
        return this.board
    }

    solve(){
        console.log("-----------BOARD-----------")
        // console.log(this.generateBoard())
        console.log(this.generateBoardManual())

        var arr = this.addIdxFirstLetter(this.kata[0][0])
        console.log(arr)
        console.log("kata yang dicari", this.kata[0])
        //debug
        // console.log(this.addIdxFirstLetter(this.kata[0][0]))
        // console.log(arr[0][0] + "-" + arr[0][1] + "-" + this.kata[0].length)
        // console.log("===="+this.checkGrid(arr[0][0],arr[0][1],this.kata[0].length))

        // while( arr > 0 || !this.checkGrid(arr[0][0],arr[0][1],this.kata[0].length))
        if(this.checkGrid(arr[0][0],arr[0][1],this.kata[0].length) === true){
            console.log("yeay Ada dong")
        } else {
            console.log("hmm coba cari lagi deh")
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
    }

    checkGrid(idxX,idxY,count){
        if(count === 1){
            return true
        } else {
            let startX = idxX - 1
            let endX = startX + 2
            // debug 
            // console.log("STARTX"+startX+""+endX)
            let startY = idxY - 1
            let endY = startY + 2
            // debug 
            // console.log("STARTY"+startY+""+endY)
            if(startX < 0){
                startX = 0
            } else if( endX > this.dimensi-1){
                endX = this.dimensi
            } else if( startY < 0){
                startY = 0
            } else if(endY > this.dimensi-1){
                endY = this.dimensi
            }
            
            for( let i = startX; i <= endX; i++){
                for(let j = startY; j < endY; j++){
                    //debug
                    // console.log("===",this.kata[0][this.kata[0].length - count])
                    if(this.kata[0][this.kata[0].length - count] === this.board[i][j]){
                        // debug
                        // console.log("SAMA==="+i+"-"+j+" count"+count)
                        return this.checkGrid(i,j,count-1)
                    }
                }
            }

            return false
        }
        
    }

}

var hurufBoard = 'DGHIKLPSYEUTTORN'
var boggle = new Boggle(4)
boggle.solve()