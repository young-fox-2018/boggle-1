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

  //BUAT CARI KATANYA
  solve() {
    let kata = []
    let counterhuruf = 0

    //LOOPING SETIAP KATA DALAM KAMUS
    for (let i = 0; i < this.kamustest.length; i++) {
      // papan 2 biar bisa simpan kata yang udah digunain dan diganti string kosong
      var papan2 = JSON.parse(JSON.stringify(this.dummy))
      // buat nyimpan list dari koordinate huruf dari huruf 1 sampai habis
      let koor = []

      // LOOPING SETIAP HURUS DALAM KATA
      for(let j = 0; j < this.kamustest[i].length; j++) {
        // let cekindex1 = true
        
        // pake persyaratan j = 0 biar dia masuk kesini kalo cek huruf 1
        if (j == 0 && koor.length == 0 ) {
          if(this.cekPertama(papan2, this.kamustest[i][j])[0] === true) {
            koor.push(this.cekPertama(papan2, this.kamustest[i][j])[1])
            counterhuruf++
            papan2[koor[0][0]][koor[0][1]] = ' '
          } else {
              break
          }
        } else {

            if(this.cekGrid(papan2, koor[koor.length-1], this.kamustest[i][j])[0] === true) {
                koor.push(this.cekGrid(papan2, koor[koor.length-1], this.kamustest[i][j])[1])
                papan2[koor[koor.length-1][0]][koor[koor.length-1][1]] = ' '
                counterhuruf++
            } else {
                koor = koor.slice(0, koor.length-1)
                j -= 2
                counterhuruf-- 
            }
        }
      }
      if(counterhuruf === this.kamustest[i].length) {
        kata.push(this.kamustest[i])
        counterhuruf = 0
      }
    }
    console.log(this.dummy)
    console.log(`${kata.length} words found :`)
    console.log(kata.join('\n'))
  }

  // BUAT NEGBENTUK BOARDNYA
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

  //CEK HURUF PERTAMANYA
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

  //CEK SEKELILINGNYA
  cekGrid(board, koor,kamus) {
    let istart = koor[0]-1
    let iend = koor[0]+1
    let jstart = koor[1]-1
    let jend = koor[1]+1

   if (istart < 0 ) {
      istart = 0 
   } else if (iend > this.size - 1) {
      iend = this.size -1
   } else if (jstart < 0 ) {
      jstart = 0
   } else if ( jend > this.size - 1 ) {
      jend  = this.size - 1
   }

    for (let i = istart; i <= iend; i++) {
      for (let j = jstart; j <= jend; j++) {
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

board.solve()
