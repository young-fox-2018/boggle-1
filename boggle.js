class Boggle{
    constructor(){
        this.Alphabeth = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        this.BoggleBoard = this.shake()
        this.test = [ [ 'D', 'G', 'H', 'I' ],
        [ 'K', 'L', 'P', 'S' ],
        [ 'Y', 'E', 'U', 'T' ],
        [ 'E', 'O', 'R', 'N' ] ]
        this.testData = ["APPLE","SIT","TRIP","TURN","SUPER"]
        
    }

    solve(){
       

    }

    checkgrid(){

    }
    shake(){
        var result = []
        for(var i = 1 ; i < 5 ; i++){
            var arr = []
            for(var j = 1 ; j < 5 ; j++){
              arr.push(this.RandomAlphabeth())
            }
            result.push(arr)
        }
        console.log(result) 
    }


    RandomAlphabeth(){
        var str = "";
        str+= this.Alphabeth.charAt(Math.floor(Math.random() * this.Alphabeth.length ))
        return str
    }
}

var game = new Boggle()

game.BoggleBoard
