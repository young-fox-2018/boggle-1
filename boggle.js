class BoggleBoard {
    constructor(dummy, dict){
        this.number = 0;
        this.board = dummy;
        this.dict = dict;
        this.duplicateBoard = [];
    }

    shake(num) {

        this.number = num;
        // this.board = this.randomBoard(num);
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
            console.log(`${arrFoundWords.length} word(s) found:`);
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
                        
            let found = this.checkAround(findFirstChar[0][0], findFirstChar[0][1], duplicate, arrWord);

            if (found) {                   
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
            board[x][y] = ' '
            searchWord.shift();
        }

        if (board[x][y] === searchWord[0] && searchWord.length === 1) {
            board[x][y] = ' '
            return true;
        }
                
        let xStart = (x - 1) < 0 ? 0 : x - 1;
        let xEnd = (x + 1) > this.board.length-1 ? this.board.length-1 : x + 1;
        let yStart = (y - 1) < 0 ? 0 : y - 1;
        let yEnd = (y + 1) > this.board.length-1 ? this.board.length-1 : y + 1;

        // loop dengan batas baru
        let found;
        for (let i = xStart; i <= xEnd; i++) {
            for (let j = yStart; j <= yEnd; j++) {    
                // recursive            
                if (searchWord[0] === board[i][j]) {
                    found = false || this.checkAround(i, j, board, searchWord);
                }
            }
        }

        return found;
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
    ['A', 'E', 'D', 'E'],
    ['L', 'O', 'O', 'P'],
    ['H', 'O', 'B', 'I'],
    ['H', 'T', 'E', 'L']
];
// const dictionary = require('./data.js');

const dictionary = ['DEPO', 'HOTEL', 'HOBE'];

const play = new BoggleBoard(dummyBoard, dictionary);

play.shake(4);