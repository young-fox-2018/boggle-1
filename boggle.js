"use strict"
// const words = ["TURN", "SIT", "TRIP", "APPLE", "SUPER"];

class Boggle {
    constructor() {
        this.papan = [];
        this.wordsCollection = require('./data.js')
        // this.dummy = [
        //               ["D", "G", "H", "I"],
        //               ["K", "L", "P", "S"],
        //               ["Y", "E", "U", "T"], 
        //               ["E", "O", "R", "N"]];
    }

    shake(number){
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i = 0; i < number; i++){
            this.papan.push([]);
            for(let j = 0; j < number; j++){
                let randomize = alphabet[Math.floor(Math.random() * alphabet.length)];
                this.papan[i].push(randomize);
            }
        }
        return this.papan;
    }

    solve() {
        let result = [];
        for (let i = 0; i < this.wordsCollection.length; i++) {
            let dictionaryWords = this.wordsCollection[i];
            let start = this.checkFirstLetter(dictionaryWords);
            if (start.length > 0) {
                let sliced = dictionaryWords.slice(1);
                for (let i = 0; i < start.length; i++) {
                    this.checker(result, sliced, dictionaryWords, start[i], [start[i]]);
                }
            }
        }

        console.log("Found words are:");
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
        }   
    }

    checkFirstLetter(word) {
        let index = [];
        for (let i = 0; i < this.papan.length; i++) {
            for (let j = 0; j < this.papan[i].length; j++) {
                if (this.papan[i][j] == word[0]){
                    index.push([i, j]);
                }
            }
        }
        return index;
    }

    checker(result, sliced, word, current, movement) {

        let position = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < position.length; i++) {

            let row = current[0] + position[i][0];
            let col = current[1] + position[i][1];

            if (row >= 0 && row < this.papan.length && col >= 0 && col < this.papan.length) {
                if (this.legalMove([row, col], movement)) {
                    if (this.papan[row][col] == sliced[0]) {

                        let newCurrent = [row, col];
                        let newSliced = sliced.slice(1);

                        if (newSliced.length == 0) {
                            result.push(word);
                            return result;
                        } 
                        else {
                            movement.push(newCurrent);
                            return this.checker(result, newSliced, word, newCurrent, movement)
                        }
                    }
                }
            }
        }
    }

    legalMove(indexes, movement) {
        // console.log(indexes)
        for (let i = 0; i < movement.length; i++) {
            if (indexes[0] == movement[i][0] && indexes[1] == movement[i][1]) {
                return false;
            }
        }
        return true;
    }
}

const boggle = new Boggle();
// boggle.legalMove()
// console.log(boggle.exampleBoard);
console.log(boggle.shake(4))
boggle.solve();