
let gameBoard = (function() {
    let gameBoardArray = [];
    function createGame(numberOfSquares) {
        // Fill out gameBoardArray
        for (let i = 0; i < numberOfSquares; i++) {
            const gameSquare = {
                id: i,
                fill: 'none'
            };
            gameBoardArray.push(gameSquare);
        }
    }
    function printGameBoardArray() {
        console.log(gameBoardArray);
    }
    return {
        createGame: createGame,
        printGameBoardArray: printGameBoardArray
    }
})();

