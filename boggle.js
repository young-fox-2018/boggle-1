"use strict"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const dummyDict = ["GET", "JOB", "BETA", "ZEBRA"]
const dummyBoard = [
    ["A","P","D","E"],
    ["L","O","M","O"],
    ["A","O","B","I"],
    ["H","T","E","L"]
]

class Boggle {

    constructor(boardSize){
        this.board = this.generateBoard(boardSize);
        this.posHistory = [];
    }

    //done
    randomNum(max){
        return Math.floor(Math.random() * (max-1))
    }

    //done
    generateBoard(number){
        let result = [];
        let num = [];

        for ( let i = 0 ; i < number; i++){
            let cont = [];
            for (let j = 0; j < number; j++){
                cont.push(alphabet[this.randomNum(26)])
            }
            result.push(cont)
        }


        return result;
    }

    solve(){
        for (let i = 0 ; i < this.dictionary.length; i++){
            this.solve(this.dictionary[i])
        }

    }

    perWords(word){
        
        for(let i = 0 ; i < word.length-1; i++ ){
            //cari posisi sekarang
            let found = false;
            for(let k = 0; k < this.board.length; k++){
                for(let l = 0; l < this.board[k].length; l++){
                    if(word[i] === this.board[k][l] && radiuscheck(k , l, word[i+1])){
                        let cont = {
                            y: k,
                            x: l,
                            value: word[i],
                        }
                        k = 
                        this.posHistory.push(cont)
                        this.board[k][l] = " "
                        found = true;
                        break;
                    }
                }
                if(found == true){
                    break
                }
            }
        }
        
    }
    
    radiuscheck(row, col, searchedLetter){
        let result = false;
        
        //if currentPos in the bottom right of the board
        if(this.board[row+1] === undefined && this.board[row][col+ 1] === undefined  ){
            //kiri
            if(this.board[row][col - 1] == searchedLetter){
                result = true;
            }
            //atas
            else if(this.board[row - 1][col] == searchedLetter){
                result = true;
            }
            // kiri atas
            else if(this.board[row - 1][col-1] == searchedLetter){
                result = true;
            }
        }
        //if currentPos in the bottom left of the board
        else if(this.board[row+1] === undefined && this.board[row][col-1] === undefined ){
            // kanan
            if(this.board[row][col + 1] == searchedLetter){
                result = true;
            }
            //atas
            else if(this.board[row - 1][col] == searchedLetter){
                result = true;
            }
            // kanan atas
            else if(this.board[row - 1][col+1] == searchedLetter){
                result = true;
            }
        }
        //if currentPos in the top left of the board
        else if(this.board[row-1] === undefined && this.board[row][col-1] === undefined  ){
            // kanan
            if(this.board[row][col + 1] == searchedLetter){
                result = true;
            }
            //bawah
            else if(this.board[row + 1][col] == searchedLetter){
                result = true;
            }
            //kanan bawah
            else if(this.board[row + 1][col+1] == searchedLetter){
                result = true;
            }
        }
        //if currentPos in the top right of the board
        else if(this.board[row-1] === undefined && this.board[row][col+1] === undefined){
            //kiri
            if(this.board[row][col - 1] == searchedLetter){
                result = true;
            }
            //bawah
            else if(this.board[row + 1][col] == searchedLetter){
                result = true;
            }
            // kiri bawah
            else if(this.board[row + 1][col-1] == searchedLetter){
                result = true;
            }
        }
        //if current position on most right
        else if(this.board[row][col+1] === undefined){
            
            //kiri
            if(this.board[row][col - 1] == searchedLetter){
                result = true;
            }
            //bawah
            else if(this.board[row + 1][col] == searchedLetter){
                result = true;
            }
            //atas
            else if(this.board[row - 1][col] == searchedLetter){
                result = true;
            }
            // kiri bawah
            else if(this.board[row + 1][col-1] == searchedLetter){
                result = true;
            }
            // kiri atas
            else if(this.board[row - 1][col-1] == searchedLetter){
                result = true;
            }
        }
        //if currentPos on most left of board
        else if(this.board[col][row-1] === undefined){
            // kanan
            if(this.board[row][col + 1] == searchedLetter){
                result = true;
            }
            //bawah
            else if(this.board[row + 1][col] == searchedLetter){
                result = true;
            }
            //atas
            else if(this.board[row - 1][col] == searchedLetter){
                result = true;
            }
            //kanan bawah
            else if(this.board[row + 1][col+1] == searchedLetter){
                result = true;
            }
            // kanan atas
            else if(this.board[row - 1][col+1] == searchedLetter){
                result = true;
            }
        }
        //if currentPos in bottom side of the board
        else if(this.board[row+1][col] === undefined){
            // kanan
            if(this.board[row][col + 1] == searchedLetter){
                result = true;
            }
            //kiri
            else if(this.board[row][col - 1] == searchedLetter){
                result = true;
            }
            //atas
            else if(this.board[row - 1][col] == searchedLetter){
                result = true;
            }
            // kiri atas
            else if(this.board[row - 1][col-1] == searchedLetter){
                result = true;
            }
            // kanan atas
            else if(this.board[row - 1][col+1] == searchedLetter){
                result = true;
            }
        }
        //if currentPos in the top side of the board
        else if(this.board[row-1][col] === undefined){
            // kanan
            if(this.board[row][col + 1] == searchedLetter){
                result = true;
            }
            //kiri
            else if(this.board[row][col - 1] == searchedLetter){
                result = true;
            }
            //bawah
            else if(this.board[row + 1][col] == searchedLetter){
                result = true;
            }
            //kanan bawah
            else if(this.board[row + 1][col+1] == searchedLetter){
                result = true;
            }
            // kiri bawah
            else if(this.board[row + 1][col-1] == searchedLetter){
                result = true;
            }

        }
        //if currentPos in the middle of the board
        else{
            // kanan
            if(this.board[row][col + 1] == searchedLetter){
                result = true;
            }
            //kiri
            else if(this.board[row][col - 1] == searchedLetter){
                result = true;
            }
            //bawah
            else if(this.board[row + 1][col] == searchedLetter){
                result = true;
            }
            //atas
            else if(this.board[row - 1][col] == searchedLetter){
                result = true;
            }
            //kanan bawah
            else if(this.board[row + 1][col+1] == searchedLetter){
                result = true;
            }
            // kiri bawah
            else if(this.board[row + 1][col-1] == searchedLetter){
                result = true;
            }
            // kiri atas
            else if(this.board[row - 1][col-1] == searchedLetter){
                result = true;
            }
            // kanan atas
            else if(this.board[row - 1][col+1] == searchedLetter){
                result = true;
            }
        }

        return result
    }

    

    //done
    // search(letter, theBoard){

    //     this.wordsMap[letter] = []
        
    //     for (let i = 0 ; i < theBoard.length; i++){
    //         for (let j = 0; j < theBoard[i].length; j++){
    //             if(letter == theBoard[i][j]){
    //                 let cont = [i,j]
    //                 this.wordsMap[letter].push(cont)
    //             }
    //         }
    //     }
    //     return this.wordsMap[letter]
    // }



}

let game = new Boggle(4)

game.dictionary = ["APP"]
game.board = dummyBoard;

// game.solve()
console.log(game.radiuscheck(1,3,"E"))

console.log(game)
// console.log(game.search("A",game.board))


