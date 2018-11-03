const dict = require('./data.js')

class Boggle {
    
    constructor(kamus) {
        this.kamus = kamus
    }

    main() {
        let finalKamus = this.kamus
        let finalResult = []
        let finalCounter = 0
        let board = this.generateBoard()
        
        for(let i = 0; i < finalKamus.length; i++) {
            var finalBoard = JSON.parse(JSON.stringify(board))
            let temp = []
            for(let j = 0; j < finalKamus[i].length; j++) {
               let cekFirstIndex = true
               
               if(j === 0 || temp.length === 0) {
                   let cekfirst = this.firstCek(finalBoard, finalKamus[i][j])
                   if(cekfirst[0] === true) {
                       temp.push(cekfirst[1])
                       finalBoard[temp[0][0]][temp[0][1]] = ' '
                       finalCounter += 1
                    } else if(cekfirst[0] === false) {
                        cekFirstIndex = false
                        break;
                    }
                } else {
                    let ceksecond = this.secondCek(finalBoard, temp[temp.length-1], finalKamus[i][j])
                    if(ceksecond[0] === true) {
                        temp.push(ceksecond[1])
                        finalCounter += 1
                        finalBoard[temp[temp.length-1][0]][temp[temp.length-1][1]] = ' '
                    } else if(ceksecond[0] === false) {
                        temp = temp.slice(0, temp.length-1)
                        j -= 2
                        finalCounter -= 1   
                    }
                }

                
                if(cekFirstIndex === false && temp.length === 0) {
                    break;
                }
            }
            if(finalCounter === finalKamus[i].length) {
                finalResult.push(finalKamus[i])
            }
            finalCounter = 0
        }
        console.log(board)
        console.log(finalResult.length, 'words found :')
        return finalResult.join('\n')
    }

    firstCek(board, kamus) {
        for(let i = 0; i < board.length; i++) {
            // console.log(board[i])
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] === kamus) {
                    return [true, [i, j]]
                }
            }
        }

        return [false]
    }

    secondCek(board, coor, kamus) {
        
        let startX = coor[0] - 1
        let endX = coor[0] + 1
        let startY = coor[1] - 1
        let endY = coor[1] + 1

        if(startX < 0) {
            startX = 0
        }
        if(endX > 3) {
            endX = 3
        }
        if(startY < 0) {
            startY = 0
        }
        if(endY > 3) {
            endY = 3
        }

        for(let i = startX; i <= endX; i++) {
            for(let j = startY; j <= endY; j++) {
                if(board[i][j] === kamus) {
                    return [true, [i, j]]
                }
            }
        }

        return [false]
    }

    generateBoard() {
        let letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let board = []
        for(let i = 0; i < 4; i++) {
            let temp = []
            for(let j = 0; j < 4; j++) {
                temp.push(letter[Math.floor(Math.random()*26)])
            }
            board.push(temp)
        }

        return board
    }

    sleep (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
            break;
            }
        }
    }

    clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return main.stdout.write('\033c');
    console.clear();
    }
      
}

var boggle = new Boggle(dict)

console.log(boggle.main())