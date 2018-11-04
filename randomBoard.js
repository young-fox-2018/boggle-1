class RandomBoard {
    static board() {
        const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let board = []
        for (let i = 0; i < 4; i++) {
            let arr = []
            for (let j = 0; j < 4; j++) {
                let index = Math.floor(Math.random() * dict.length)
                arr.push(dict[index])
            }
            board.push(arr)
        }
        return board
    }
}

module.exports = RandomBoard