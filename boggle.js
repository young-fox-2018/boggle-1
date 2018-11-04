class Boggle {
  constructor(size){
    this.papan = []
    this.kamus = kamus
    this.dummy = [ [ 'D', 'G', 'H', 'I' ],
    [ 'K', 'L', 'P', 'S' ],
    [ 'Y', 'E', 'U', 'T' ],
    [ 'E', 'O', 'R', 'N' ] ]
    this.kamustest = [  'APPLE' , 'SIT' , 'TRIP' , 'TURN' , 'SUPER']
    this.size = size
  }
  // BUAT NAMPILIN BOARDNYA
  shake() {
    for(var i = 1 ; i <= this.size ; i++){
      var arr = []
      for(var j = 1 ; j <= this.size; j++){
        arr.push(this.randomAbjad())
      }
      this.papan.push(arr)
    }
    return this.papan
  }

  // BUAT NGERANDOM ABZAD
  randomAbjad() {
    var text = '';
    var abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    text += abjad.charAt(Math.floor(Math.random() * abjad.length))
    return text
  }

  cekPertama (board , kamus){
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == kamus ) {
          return [true , [i,j]]
        }        
      }      
    }
    return [false]
  }

  cekGrid(board, I,J,kamus) {
    let istart = I-1
    let iend = I+1
    let jstart = J-1
    let jend = J+1

   if (istart < 0 ) {
      istart = 0 
   } else if (iend > this.size - 1) {
      iend = this.size -1
   } else if (jstart < 0 ) {
      jstart = 0
   } else if ( jend > this.size - 1 ) {
      jend  = this.size - 1
   }

    for (let i = xstart; i <= xend; i++) {
      for (let j = ystart; j <= yend; j++) {
        if (board[i][j] == kamus){
          return [true, [i,j]]
        }
      } 
    } 
  return [false] 
  }


}
const kamus = require('./data.js')
var board = new Boggle(4)
// manggil papannya udah bisa
// console.log(board.shake())
// manggil kamus
// console.log(board.kamustest)
// manggil dummy papan
// console.log(board.dummy)
