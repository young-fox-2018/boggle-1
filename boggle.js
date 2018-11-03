function createBoard(grid){
    let res = []
    let arr = []
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let arrRow = 0 ; arrRow < grid ; arrRow++){
        res.push(arr)
        for(let arrCol = 0; arrCol < grid ; arrCol++){
            let randAbc = abc.charAt(Math.floor(Math.random() * abc.length))
            res[arrRow].push(randAbc)
        }
        arr = []
    }
    return res
}