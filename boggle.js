class boggle {

    randomBoard(num) {
        const alphabets = "qwertyuiopasdfghjklzxcvbnm"
        let board = []
        for (let i = 0; i < num; i++) {
            let tmp = []
            for (let j = 0; j < num; j++) {
                tmp.push(alphabets[Math.floor(Math.random() * alphabets.length - 1) + 1])
            }
            board.push(tmp)
        }
        return board
    }

    tesBoggle() {
        let board = [
            ['U', 'B', 'I', 'K'],
            ['S', 'A', 'N', 'L'],
            ['I', 'Z', 'P', 'U'],
            ['U', 'N', 'B', 'I']
        ]
        return board
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    readFile() {
        const fs = require('fs')
        const data = fs.readFileSync('./data.js', 'utf-8')
    }
    solve(inputParam) {
        let input = inputParam
        let firstIndex = false
        let board = this.tesBoggle()
        let position = [0, 0]
        let found = false
        let count = 1
        while (found === false) {
            if (firstIndex === false) {
                index1: for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (input[0] === board[i][j]) {
                            board[i][j] = ' '
                            position = [i, j]
                            firstIndex = true
                            break index1
                        }
                    }
                }
            }
            //console.log(board)
            let xMin = position[0] - 1
            let yMin = position[1] - 1
            let xMax = position[0] + 1
            let yMax = position[1] + 1
            if (xMin < 0) {
                xMin = 0
            }
            if (yMin < 0) {
                yMin = 0
            }
            if (xMax > board.length-1) {
                xMax = 3
            }
            if (yMax > board.length-1) {
                yMax = 3
            }
            loop: for (let x = xMin; x <= xMax; x++) {
                for (let y = yMin; y <= yMax; y++) {
                    if (input[count] === board[x][y]) {
                        board[x][y] = ' '
                        position = [x, y]
                        count++
                        break;
                    }
                }
            }
            if (count === input.length) {
                found = true
                break
            }
        }
        console.log(board)

    }
}

let boggle1 = new boggle()
boggle1.solve('SAPI')
let boggle2 = new boggle()
boggle2.solve('SAPU')
let boggle3 = new boggle()
boggle3.solve('NASI')
