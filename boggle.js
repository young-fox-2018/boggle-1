class BoggleBoard {
    constructor(num, board, dict){
        this.number = num;
        this.board = board;
        this.dict = dict;
        this.duplicateBoard = [];
    }

    shake() {
        // random board plus hasilnya langsung
        var arrFoundWords = [];

        for (let i = 0; i < this.dict.length; i++) {
            let wordFound = this.findWords(this.dict[i]);            
            if (wordFound) {
                arrFoundWords.push(this.dict[i]);
            }
        }

        console.log(this.board);
        if (arrFoundWords.length === 0) {
            console.log(`No word found`);
        } else {
            console.log(`${arrFoundWords.length} word found:`);
            console.log(arrFoundWords.join('\n'));
        }
    }

    randomBoard(num) {
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // buat board random alphabet
        var board = [];
        for (let i = 0; i < num; i++) {
            let row = [];
            for (let j = 0; j < num; j++) {
                let random = Math.floor(Math.random() * ALPHABET.length);
                row.push(ALPHABET[random]);
            }
            board.push(row);
        }
        return board;
    }

    findWords(dict) {
        // cari indeks dari huruf pertama          
        let findFirstChar = this.findChar(this.board.length, this.board.length, dict[0]);
        
        // loop indeks huruf pertama, bisa saja huruf pertama > 1
        while(findFirstChar.length > 0) {
            let duplicate = JSON.parse(JSON.stringify(this.board));
            let arrWord = dict.split('');
            
            // console.log(arrWord);
            let found = this.checkAround(findFirstChar[0][0], findFirstChar[0][1], duplicate, arrWord);
            // console.log(`masuk sini: ${findFirstChar[0][0]}, ${findFirstChar[0][1]}, ${duplicate}, ${arrWord}`); 
            // console.log(`masuk sini2: ${this.checkAround(findFirstChar[0][0], findFirstChar[0][1], duplicate, arrWord)}`); 
            // console.log(`masuk sini2: ${found}`); 
            if (found) {
                
                // console.log(`The word ${this.dict} is found`)                    
                return true;
            } else {
                findFirstChar.shift();
            }
        } 
        return false;       
    }    

    checkAround (x, y, board, searchWord) {
        if (board[x][y] !== searchWord[0]) {
            return false;
        }

        if (board[x][y] === searchWord[0] && searchWord.length > 1) {
            // console.log(`char pertama '${searchWord[0]}' ketemu di [${x}, ${y}]`);
            board[x][y] = ' '
            searchWord.shift();
        }

        if (board[x][y] === searchWord[0] && searchWord.length === 1) {
            board[x][y] = ' '
            return true;
        }
        
        // console.log(board);
        let xStart = (x - 1) < 0 ? 0 : x - 1;
        let xEnd = (x + 1) > this.board.length-1 ? this.board.length-1 : x + 1;
        let yStart = (y - 1) < 0 ? 0 : y - 1;
        let yEnd = (y + 1) > this.board.length-1 ? this.board.length-1 : y + 1;

//         console.log(`xStart: ${xStart},
// xEnd: ${xEnd},
// yStart: ${yStart},
// yEnd: ${yEnd}`);
        for (let i = xStart; i <= xEnd; i++) {
            for (let j = yStart; j <= yEnd; j++) {
                // console.log(`[i, j] = [${i}, ${j}]`, board[i][j], searchWord[0]);
                if (searchWord[0] === board[i][j]) {
                    // board[i][j] = ' ';
                    // searchWord.shift();
                    // console.log(`===========board sekarang===========`);
                    // console.log(`karakter ${searchWord[0]} ketemu di board [${i}, ${j}], kata sekarang ${searchWord}`);
                    // console.log(board);
                    return this.checkAround(i, j, board, searchWord);
                }
            }
        }

        return false;
    }

    findChar(x, y, char){
        let arr = []
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (this.board[i][j] === char) {
                    arr.push([i,j]);
                }
            }
        }        
        return arr;
    }
}

// shake(4);
const dummyBoard = [
    ['A', 'G', 'H', 'I'],
    ['K', 'L', 'E', 'S'],
    ['Y', 'L', 'A', 'T'],
    ['X', 'P', 'P', 'N']
];
// const dictionary = require('./data.js');
// const dictionary = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER'];
const dictionary = ['APPLE', 'SEAT', 'PANTEA'];

var play = new BoggleBoard(4, dummyBoard, dictionary);
// console.log(play.findWords());
// let findFirstChar = play.findChar(dummyBoard.length, dummyBoard.length, dictionary[1][0]);
// let arrWord = dictionary[1].split('');
// // console.log(arrWord);
// console.log(`First char found on`, findFirstChar);
// console.log(play.checkAround(findFirstChar[0][0], findFirstChar[0][1], dummyBoard, arrWord));

play.shake();

// console.log('RANDOM BOARD');
// console.log(play.randomBoard(4));
// console.log('RANDOM BOARD');
// console.log(play.randomBoard(7));