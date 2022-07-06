
let gameBoard = {
    gameBoardArray: [],
    createGame: function(numberOfSquares) {
        // Fill out gameBoardArray
        for (let i = 0; i < numberOfSquares; i++) {
            const gameSquare = {
                id: i,
                fill: 'none'
            };
            this.gameBoardArray.push(gameSquare);
        }
    },
    printGameBoardArray: function() {
        console.log(this.gameBoardArray);
    },
    
}

gameBoard.createGame(9);
gameBoard.printGameBoardArray();

