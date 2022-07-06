
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
    let player1Options = Array.from(document.getElementsByClassName('p1-select-btn'))
    function linkEventListeners() {
        player1Options.forEach(button => button.addEventListener('click', player1Selection))
    }
    function player1Selection(event) {
        console.log(event.target.id);
    }
    return {
        linkEventListeners: linkEventListeners
    }
})();
player.linkEventListeners();

