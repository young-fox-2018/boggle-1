
//RELEASE 0
"use strict"

//REALESE 0
class Boggle {
    constructor(number){
        this.papan = [];
        this.dimension = number;
    }

    board(){
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i = 0; i < this.dimension; i++){
            this.papan.push([])
            for(let j = 0; j < this.dimension; j++){
                let randomize = alphabet[Math.floor(Math.random() * alphabet.length)];
                this.papan[i].push(randomize)
            }
        }
        return this.papan
    }
}

var game = new Boggle(4);
console.log(game.board())