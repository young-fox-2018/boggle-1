"use strict"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const dummyDict = ["GET", "JOB", "BETA", "ZEBRA"]

class Boggle {

    constructor(boardSize){
        this.board = this.generateBoard(boardSize);
        this.wordsMap = {};
        this.posHistory = {};
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

    solve(current, dictionary){
        
        for (let i = 0 ; i < dictionary.length; i++){

            for(let j = 0 ; j < dictionary[i].length; j++){

                for(let k = 0; k < this.search(dictionary[i][j]).length; k++ ){
                    
                    
                }
                
            }
        }

    }

    //done
    search(letter, theBoard){

        this.wordsMap[letter] = []
        
        for (let i = 0 ; i < theBoard.length; i++){
            for (let j = 0; j < theBoard[i].length; j++){
                if(letter == theBoard[i][j]){
                    let cont = [i,j]
                    this.wordsMap[letter].push(cont)
                }
            }
        }
        return this.wordsMap[letter]
    }



}

let game = new Boggle(4)

console.log(game.board)
console.log(game.search("A",game.board))


