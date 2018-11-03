/*eslint-disable*/
class Boggle {
    constructor(num, input) {
        this.num = num
        this.input = input
    }

    shake() {
        let result = []
        let arr =[]
        let moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        let arrTemp = []
        let alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                arrTemp.push(alph[
                    Math.floor(
                        Math.random() * alph.length
                    )]
                )
            }
            arr.push(arrTemp)
            arrTemp = []
        }
        function searchNodes(word, r, c) {
            
            if (word.length <= 1) return true;
            arr[r][c] = '*'
            let result = false

            //BACKTRACK
            for (let i = 0; i < moves.length; ++i) {
                let nextr = r + moves[i][0]
                let nextc = c + moves[i][1]
                
                if (nextr >= 0 && nextr < arr.length &&
                    nextc >= 0 && nextc < arr[nextr].length &&
                    arr[nextr][nextc] == word[1] &&
                    searchNodes(word.slice(1), nextr, nextc)) {
                    result = true
                    break
                }
            }

            //BACKTRACK RESTORE
            arr[r][c] = word[0]
            return result
        }

        function solve(word) {
            
            for (var r = 0; r < arr.length; ++r) {
                for (var c = 0; c < arr[r].length; ++c) {
                    // if (arr[r][c] == word[0] && searchNodes(word, r, c)) return true;
                    if (arr[r][c] == word[0] && searchNodes(word, r, c)) return true;
                }
            }
            return false
        }

        result = input.filter(
            function (word) {
                return solve(word)
            })
        console.log(arr);
        console.log(`${result.length} Word Found!`);
        result.forEach(element => {
            console.log(element);
            
        });
    }
}

let num = 4
let input = require("./data.js")
let game = new Boggle(num, input)
game.shake()
