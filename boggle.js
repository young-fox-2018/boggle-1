class Boggle {
  constructor(){
    this.papan = this.shake()
    this.dummy = [ [ 'D', 'G', 'H', 'I' ],
    [ 'K', 'L', 'P', 'S' ],
    [ 'Y', 'E', 'U', 'T' ],
    [ 'E', 'O', 'R', 'N' ] ]
    this.kamus = [  'APPLE' , 'SIT' , 'TRIP' , 'TURN' , 'SUPER']
  }
  // BUAT NAMPILIN BOARDNYA
  shake() {
    var result = []
    for(var i = 1 ; i < 5 ; i++){
      var arr = []
      for(var j = 1 ; j < 5; j++){
        arr.push(this.randomAbjad())
      }
      result.push(arr)
    }
    console.log(result)
  }
  // BUAT NGERANDOM ABZAD
  randomAbjad() {
    var text = '';
    var abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
    text += abjad.charAt(Math.floor(Math.random() * abjad.length))
    return text
  }


}

var board = new Boggle()
// manggil papannya udah bisa
// manggil kamus
board.papan