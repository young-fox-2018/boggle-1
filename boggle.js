//  BOGGLE
var dummyBoard = [
    ['D', 'T', 'X', 'I'],
    ['K', 'L', 'P', 'S'],
    ['Y', 'E', 'U', 'T'],
    ['E', 'O', 'R', 'N']
];
// var dummyKamus = ['APPLE', 'TRIP', 'TURN', 'SIT', 'SUPER'];
var dummyKamus = ['TURN', 'TRIP', 'SIT', 'SUPER', 'TUTS'];
// var dummyKamus = ['SUPER'];

class Boggle {
    constructor(num) {
        // this.boardGame = this.shake(num); //MAKE BOARD
        this.testBoard = dummyBoard; // dummy board
        this.testKamus = dummyKamus; // dummy kamus
        this.tempBoard = JSON.parse(JSON.stringify(this.testBoard));
        this.result = [];
        this.count = 0;

    }

    solve() {
        var board = this.testBoard;
        var kamus = this.testKamus;

        for (let i = 0; i < kamus.length; i++) { //  loop kamus
            var temp = {value: kamus[i], coordinate: this.findCoordinate(kamus[i][0])};

            if (temp.coordinate.length > 0) {
                for (let j = 0; j < temp.coordinate.length; j++) {   //  loop coordinate yang ditemukan
                    var coordinate = temp.coordinate[j];
                    var check = true;

                    for (let k = 1; k < temp.value.length; k++) {    //  loop setiap huruf dari kata
                        var alphabet = temp.value[k];
                        board[coordinate[0]][coordinate[1]] = ' ';

                        if (this.checkGrid(coordinate, alphabet) !== false) {
                            coordinate = this.checkGrid(coordinate, alphabet)
                        } else {
                            check = false;
                            break;
                        }
                    }
                    if (check === true) {
                        this.count++
                        this.result.push(temp.value);
                        board = this.tempBoard
                        break;
                    }
                }
            }
        }
        console.log(`${this.count} words found:`);
        console.log(this.result);
    }

    shake(num) {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = [];
        for (let i = 0; i < num; i++) {
            result.push([]);
            for (let j = 0; j < num; j++) {
                var random = Math.floor(Math.random() * alphabet.length);
                result[i].push(alphabet[random])
            }
        }
        return result;
    }

    checkGrid(coordinate, alphabet) {
        // var board = this.boardGame; // for random board
        var tempBoard = this.tempBoard; //  for dummy board
        
        var xstart = coordinate[0] - 1;
        var xend = xstart + 2;
        var ystart = coordinate[1] - 1;
        var yend = ystart + 2;

        if (xstart < 0) {
            xstart = 0;
        }
        if (xend > tempBoard.length - 1) {
            xend = tempBoard.length - 1;
        }
        if (ystart < 0) {
            ystart = 0;
        }
        if (yend > tempBoard.length - 1) {
            yend = tempBoard.length -  1;
        }
        for (let i = xstart; i <= xend; i++) {
            for (let j = ystart; j <= yend; j++) {
                if (tempBoard[i][j] === alphabet) {
                    return [i, j];
                }
            }
        }
        return false;
    }

    findCoordinate(alphabet) {  //  to find coordinate of first alphabet
        // var board = this.boardGame; // random board
        var board = this.testBoard;
        var result = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if(alphabet === board[i][j]) {
                    result.push([i, j])
                }
            }
        }
        return result;
    }

}

// var game = new Boggle(4); // random board
// console.log(game.shake(4)); //  BOGGLE 1
var game = new Boggle(); // dummy board
game.solve()