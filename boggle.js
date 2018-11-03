/*eslint-disable*/
class Boggle{
    constructor(num,input) {
        this.kocoq = this.shake()
        this.num = num
        this.input = input
    }

    shake() {
        let arr = []
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
        return arr
    }
}
let num = 8
let input = require('./data.js')
let game = new Boggle(num,input)
console.log(game.shake());







