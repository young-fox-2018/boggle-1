class Boggle {
    constructor(size){
      this.board = []
      this.dictionary = dictionary
      this.size = size
    }

    // generate baord with random alphabet
    shake() {
        let alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let i = 0; i < this.size; i++){
            let inner = []
            for(let j = 0; j < this.size; j++){
                inner.push(alfabet[Math.floor(Math.random() * alfabet.length)])
            }
            this.board.push(inner)
        }
        return this.board
    }

    //check first letter
    firstCheck (board , dictionary){
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === dictionary ) {return [true , [i,j]]}        
            }      
        }
        return [false]
    }

    //check 8 direction
    cekGrid(board, coord ,dictionary) {
        let iStart = coord[0]-1
        let iEnd = coord[0]+1
        let jStart = coord[1]-1
        let jEnd = coord[1]+1

        if (iStart < 0 ) {iStart = 0} 
        else if (iEnd > this.size - 1) {iEnd = this.size -1} 
        else if (jStart < 0 ) {jStart = 0} 
        else if (jEnd > this.size - 1) {jEnd  = this.size - 1}

        for (let i = iStart; i <= iEnd; i++) {
            for (let j = jStart; j <= jEnd; j++) {
                if (board[i][j] === dictionary) {return [true, [i,j]]}
            } 
        } 
        return [false] 
    }

    solve() {
        let result = []
        let counter = 0

        for (let i = 0; i < this.dictionary.length; i++) {
            var newBoard = JSON.parse(JSON.stringify(this.board)) 
            let temp = []
            for ( let j = 0; j < this.dictionary[i].length; j++) {
                if (j === 0 && temp.length === 0 ) {
                    if(this.firstCheck(newBoard, this.dictionary[i][j])[0] === true) {
                        temp.push(this.firstCheck(newBoard, this.dictionary[i][j])[1])
                        counter++
                        newBoard[temp[0][0]][temp[0][1]] = '#'
                    } else {
                        break
                    }
                } else {
                    if ( this.cekGrid(newBoard , temp[temp.length-1] , this.dictionary[i][j])[0] === true) {
                        temp.push(this.cekGrid(newBoard, temp[temp.length-1] , this.dictionary[i][j])[1])
                        newBoard[temp[temp.length-1][0]][temp[temp.length-1][1]] = '#'
                        counter++
                    } else {
                        temp = temp.slice(0, temp.length-1)
                        j-= 2
                        counter-- 
                    }
                }
            }
            if ( counter === this.dictionary[i].length ) {
                result.push(this.dictionary[i])
                counter = 0
            }
        }
        console.log(this.board)
        console.log(`${result.length} words found :`)
        console.log(result.join('\n'))
    }
}

  const dictionary = require('./data.js')
  const game = new Boggle(4)
  
  game.shake()
  game.solve()