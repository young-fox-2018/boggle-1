class BoggleBoard{
    constructor(grid){
        this.diction =
        [
            "SIP",
            "MELON",
            "PUSH",
            "PUTS",
            "KEY"
        ]
    
        this.dummyBoard = 
        [
            ['D','G','H','I'],
            ['K','L','P','S'],
            ['Y','E','U','T'],
            ['E','O','R','N']
        ] 

    }

    shake(grid){
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
}
const newGame = new BoggleBoard()
console.log(newGame.shake(4))
