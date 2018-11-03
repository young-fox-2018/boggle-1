const data = require('./data.js')

class Boggle {
    constructor (dimention) {
        this.dimention = dimention
    }


    shake (n) {
        let randomWord = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let dimention = this.dimention || n
        let myBoard = []
        // create new random board with dinamic dimention

        for ( let i = 0; i < dimention; i++) {
            myBoard.push([])
            for ( let j = 0; j < dimention; j++) {
                let randomIdx = Math.floor(Math.random() * (25 - 0) + 0)
                myBoard[i].push(randomWord[randomIdx])
            }
        }
        
        
        return myBoard
    }

    solve (board) {
        let myBoard = this.shake ()
        let findedWord = []

        let findTheseWord = data

        // For Dummies board, 
        
        // let findTheseWord = [
        //     'APEL',
        //     'APUS',
        //     'BETE',
        //     'ABRI',
        //     'PAPA'
        // ]

        // myBoard = [
        //     ['A','P','U','S','M'],
        //     ['E','S','E','B','N'],
        //     ['L','X','V','S','T'],
        //     ['I','W','X','Y','E'],
        //     ['W','D','S','U','A']
        // ]

        // myBoard = 
        // [ 
        //     [ 'U', 'C', 'G', 'H', 'F' ],
        //     [ 'R', 'R', 'V', 'F', 'H' ],
        //     [ 'L', 'F', 'B', 'H', 'M' ],
        //     [ 'A', 'I', 'Q', 'E', 'S' ],
        //     [ 'R', 'T', 'E', 'T', 'K' ] 
        // ]

        // myBoard = 
        // [ 
        //     [ 'O', 'S', 'A', 'B', 'P' ],
        //     [ 'O', 'E', 'P', 'U', 'V' ],
        //     [ 'L', 'F', 'A', 'U', 'H' ],
        //     [ 'N', 'T', 'M', 'Y', 'I' ],
        //     [ 'B', 'W', 'H', 'D', 'J' ] 
        // ]

        // myBoard = 
        // [ 
        //     [ 'S', 'K', 'Q', 'L', 'X' ],
        //     [ 'S', 'U', 'H', 'Y', 'E' ],
        //     [ 'N', 'T', 'P', 'Y', 'A' ],
        //     [ 'C', 'A', 'C', 'C', 'B' ],
        //     [ 'E', 'E', 'L', 'R', 'I' ] 
        // ]



        console.log(myBoard)
        
        // find word in board
        for ( let i = 0; i < findTheseWord.length; i++) {
            if (this.findAround ( myBoard, findTheseWord[i] )) {
                findedWord.push(findTheseWord[i])
            }
        }

        // return findedWord

        console.log(findedWord.length, 'Word(s) found : ')

        for ( let i = 0;  i < findedWord.length; i++) {
            console.log(findedWord[i])
        }

        return findedWord.length


    }

    findAround ( myBoard, word) {
        let currentLocation = []
        let newBoard = []
        let nextChar = ''

        // get first location and mark it
        currentLocation = this.findPerChar(word[0], myBoard).location
        newBoard = this.findPerChar(word[0], myBoard).newBoard
        nextChar = word.slice(1)

        // if first char is not found return false
        if ( currentLocation.length === 0) {
            return false
        } 

        // if next char not found return false
        if ( !this.findNextChar (currentLocation, newBoard, nextChar) ) {
            return false
        }
    
        return true
    }

    findPerChar(char, myBoard) {

        let charIdx = []
        let board = JSON.parse(JSON.stringify(myBoard))
        // thanks ka rama for this tips lol


        // mark founded char
        for ( let i = 0; i < board.length; i++ ) {
            for ( let j = 0; j < board[i].length; j++ ) {
                if ( board[i][j] === char) {
                    charIdx.push({
                        row: i,
                        column: j,
                        value: board[i][j]
                    })
                    
                    board[i][j] = '*'
                }
            }
        }
        
        // return marked board and location
        return {
            newBoard: board,
            location: charIdx
        }
    }

    findNextChar (currentLocation, newBoard, nextChar) {

        let tempBoard = JSON.parse(JSON.stringify(newBoard))
        let objNextChar = []
        let isSuccess = []
        
        for ( let i = 0; i < currentLocation.length; i++) {
            // update last location per char
            let current = currentLocation[i]
            
            isSuccess = []

            for ( let j = 0; j < nextChar.length; j++ ) {
                

                // find char in modified board
                let findChar = this.findPerChar(nextChar[j], tempBoard)
                objNextChar = findChar.location

                // if char is not found return false
                if (objNextChar.length === 0 ) {
                    return false
                } else {
   
                    // char founded in modified board might be more than one location
                    for ( let k = 0; k < objNextChar.length; k++ ) {
                        let gapRow = Math.abs(objNextChar[k].row - current.row)
                        let gapCol = Math.abs(objNextChar[k].column - current.column)                        
                        

                        if (gapRow <= 1 && gapCol <= 1) {
                                
                            current = objNextChar[k]
                            tempBoard = findChar.newBoard
                            isSuccess.push(objNextChar[k].value)
                            
                            // validation to return true 
                            if (isSuccess.join('') === nextChar) {
                                return true
                            }


                        }
    
                    }

                }
                
   
            }



        }


        return false

    }
}




let boggle = new Boggle(5) 


boggle.solve()

