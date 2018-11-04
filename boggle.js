class BoggleBoard{

    constructor(grid){
        this.diction = // data
        [
            "APPLE",
            "SIP",
            "MELON",
            "PUSH",
            "PUTS",
            "KEY"
        ] 
       
        this.dummyBoard = 
        [
            ['D','G','H','I'],
            ['K','L','P','S'],
            ['Y','E','U','T'],
            ['E','O','R','N']
        ] 
        this.board = this.dummyBoard //this.shake(grid)
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
            if(this.solve(diction[0])){
                wordRes.push(diction[0])
            }
            diction.shift()
        }
        return "We have found "+ (wordRes.length) + " word(s).\nHere are the words we found " + wordRes
    }
    
    solve(word){
        let coor = this.check1stLetter(word[0])
        // console.log(word, "ini word yang di solve")

        if(coor.length === 0){
            return false
        }
        else{
            while(this.checkAroundLetter(word, coor[0][0],coor[0][1])){
                coor.shift()
                if(coor.length < 1){
                    break
                }
            }
            
            if(coor.length < 1){
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


    checkAroundLetter(word, bRow, bCol){
        let board = this.board
        const checkBox = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

        if(checkBox.length < 1){
            return true
        }
        else{
            for(let iLetter = 0; iLetter < word.length ; iLetter++){
                for(let iCheck = 0 ; iCheck < checkBox.length ; iCheck++){
                    let coorX = bRow + checkBox[iCheck][0]
                    let coorY = bCol + checkBox[iCheck][1]
                    if(coorX !== undefined && coorY !== undefined && board[bRow][bCol] === word[1]){
                        board[bRow][bCol] = "*"
                        break
                    }
                }
            }
        }
    }

}

const data = require('./data.js')
const Boggle = new BoggleBoard()

console.log("HERE IS THE GAME BOARD WE'VE RANDOMIZED FOR YOU\n", Boggle.board)
console.log(Boggle.arrDictLetters())