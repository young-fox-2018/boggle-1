"use strict"

const dictionary = require('./data.js');

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const dummyDict = ["GET", "JOB", "BETA", "ZEBRA"]
const dummyBoard = [
    ["A","E","D","E"],
    ["L","O","O","P"],
    ["H","O","B","I"],
    ["H","T","E","L"]
]

class Boggle {

    constructor(boardSize){
        this.board = this.generateBoard(boardSize);
        this.posHistory = [];
        this.foundWord = [];
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
            if(this.perWords(this.dictionary[i])){
                this.foundWord.push(this.dictionary[i])
            }
        }

    }

    perWords(word){
        var firstCharPos = [];

        for(let i = 0; i < this.board.length; i++){
            for(let j = 0; j < this.board.length; j++){
                if(word[0] === this.board[i][j]){
                    firstCharPos.push([i,j]);
                }
            }
        }
        
        while(firstCharPos.length > 0){
            let duplBoard = JSON.parse(JSON.stringify(this.board));
            let splittedWord = word.split("");

            let found = this.radiuscheck(firstCharPos[0][0], firstCharPos[0][1], duplBoard, splittedWord)
            if(found){
                return true;
            }
            else{
                firstCharPos.shift();
            }
        }
        return false;
    }
    
    radiuscheck(row, col, board, searchedWord){
        
        if(board[row][col] !== searchedWord[0]){
            return false;
        }
        if(board[row][col] == searchedWord[0] && searchedWord.length >1){
            board[row][col] = " ";
            searchedWord.shift();
        }
        if(board[row][col] == searchedWord[0] && searchedWord.length ==1){
            board[row][col] = " ";
            return true
        }

        let startingRow = (row-1) < 0 ? 0 : row - 1;
        let endingRow = (row+1) > board.length-1 ? board.length-1 : row +1;
        let startingCol = (col-1) < 0 ? 0 : col - 1;
        let endingCol = (col+1) > board.length-1 ? board[0].length-1 : col +1;


        let found
        for (let i = startingRow; i <= endingRow; i++){
            for(let j = startingCol; j <= endingCol; j++){
                if(searchedWord[0] === board[i][j]){
                    found = false || this.radiuscheck(i, j, board, searchedWord)
                }
            }
        }
        return found;
    }

    


}

let game = new Boggle(4)

game.dictionary = dictionary;

game.solve()
console.log(game.board)
console.log(game.foundWord)

