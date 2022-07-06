
let gameBoard = (function() {
    let gameBoardSquares = Array.from(document.getElementsByClassName('game-square'));
    function linkEventListeners() {
        gameBoardSquares.forEach(square => square.addEventListener('click', gameSquareClicked))
    }
    function gameSquareClicked(event) {
        console.log(event.target.id);
    }
    return {
        gameBoardSquares: gameBoardSquares,
        linkEventListeners: linkEventListeners
    }
})();
gameBoard.linkEventListeners();

let player = (function() {
    
})

