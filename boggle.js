class BoggleBoard{
    constructor(grid){
        this.diction = data
        // [
        //     "APPLE",
        //     "SIP",
        //     "MELON",
        //     "PUSH",
        //     "NUT",
        //     "NUTS",
        //     "PUTS",
        //     "KEY"
        // ] 
       
        this.dummyBoard = 
        [
            ['D','G','H','I'],
            ['K','L','P','S'],
            ['Y','E','U','T'],
            ['E','O','R','N']
        ] 
        this.board = this.shake(grid) //this.dummyBoard
        this.result = JSON.parse(JSON.stringify(this.board))

    }
    shake(grid){
        let res = []
        let arr = []
        const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let arrRow = 0 ; arrRow < grid ; arrRow++){
            res.push(arr)
            for(let arrCol = 0; arrCol < grid ; arrCol++){
                let randAbc = abc.charAt(Math.floor(Math.random() * abc.length))
                res[arrRow].push(randAbc)
            }
            arr = []
        }
        return res
    }
    
    // MAIN function
    arrDictLetters(){
    let diction = this.diction
    let wordRes = []
        while(diction.length > 0){
            // console.log(diction, "this is what's being solved")
            if(this.solve(diction[0])){
                wordRes.push(diction[0])
            }
            diction.shift()
        }
        return "We have found "+ (wordRes.length) + " word(s).\nHere are the words we found " + wordRes
    }
    
    solve(word){
        let coorWord = this.check1stLetter(word[0])
        // console.log(coorWord, "this is coorword BEFORE")

        if(coorWord.length === 0){
            return false
        }
        else{
            // while(this.checkAroundLetter(word[0], coorWord[0][0],coorWord[0][1])){
            while(!this.checkGrid(coorWord[0][0],coorWord[0][1], (word[0].length))){
                coorWord.shift()
                // console.log(coorWord, "AFTER")
                if(coorWord.length < 1){
                    break
                }
            }
            
            if(coorWord.length < 1){
                return false
            }else{
                return true
            }
        }
    }

    check1stLetter(letter){
        let firstLetterPost = []
        let board = this.board

        for(let row = 0 ; row < board.length ; row++){
            for(let col = 0 ; col < board[row].length ; col++){
                if(board[row][col] === letter[0]){
                    firstLetterPost.push([row, col])
                }
            }
        }
        return firstLetterPost
    }
    
    checkGrid(coorX,coorY,len){
        let board = this.board
        let diction = this.diction

        if(len === 0){
            return true
        } else {
            let startX = coorX - 1
            let endX = startX + 2
            let startY = coorY - 1
            let endY = startY + 2

            if(startX < 0){
                startX = 0
            } else if( endX > board.length-1){
                endX = board.length-1
            } else if( startY < 0){
                startY = 0
            } else if(endY > board.length-1){
                endY = board.length-1
            }
            for( let i = startX; i <= endX; i++){
                for(let j = startY; j <= endY; j++){
                    if(diction[0][diction[0].length - len] === this.result[i][j]){
                        this.result[i][j] = "--"
                        return this.checkGrid(i,j,len-1)
                    }
                }
            }
            return false
        }
    }
}



    // checkAroundLetter(word, bRow, bCol){
    //     let board = this.board
    //     const checkBox = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    //     if(checkBox.length < 1){
    //         return false
    //     }
    //     else{
    //         for(let iLetter = 0; iLetter < word[0].length ; iLetter++){
    //             for(let iCheck = 0 ; iCheck < checkBox.length ; iCheck++){
    //                 let coorX = bRow + checkBox[iCheck][0]
    //                 let coorY = bCol + checkBox[iCheck][1]
    //                 if( coorX !== undefined  && coorY !== undefined && (coorX < board.length || coorX === -1)&& (coorY < board.length || coorX === -1)){
    //                     // console.log(coorX, coorY, "KALAU ADA - BERARTI TEMBUS")
    //                     if(board[coorX][coorY] === word[0][iLetter]){
    //                        board[coorX][coorY] = "--"
    //                         break
    //                     }
    //                 }
    //             }
    //         }
    //         return false
    //     }
    // }
// }


const data = require('./data.js')
const Boggle = new BoggleBoard(4)

console.log("HERE IS THE GAME BOARD WE'VE RANDOMIZED FOR YOU\n", Boggle.board)
console.log(Boggle.arrDictLetters()) 
console.log("HERE IS THE BOARD AFTERMATH\n", Boggle.result)