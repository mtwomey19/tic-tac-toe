let gameBoard = (function() {
    let gameBoardSquares = Array.from(document.getElementsByClassName('game-square'));
    gameBoardSquares.forEach(square => square.addEventListener('click', gameSquareClicked))

    function gameSquareClicked(event) {
        event.target.textContent = "X";

        // who's move? 
        // what's their letter is?
    }
    return {
        
    }
})();

let gameFlow = (function() {
    let player1Options = Array.from(document.getElementsByClassName('p1-select-btn'));
    player1Options.forEach(button => button.addEventListener('click', player1Selection));

    function player1Selection(event) {
        const letter = event.target.id;
        let player1Letter = '';
        let player2Letter = '';
        if (letter === 'p1-x') {
            player1Letter = 'X';
            player2Letter = 'O';
        } else {
            player1Letter = 'O';
            player2Letter = 'X';
        }
        playerLetterSelection.afterPlayer1Selection(player1Letter);
        playerLetterSelection.initPlayerHeader();
    }
})();

let playerLetterSelection = {
    afterPlayer1Selection: function(player1Letter) {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];
        let player1SelectContainer = Array.from(document.getElementsByClassName('p1-selection-container'))[0];
        player1SelectContainer.remove();

        player1Para = document.createElement('p');
        player2Para = document.createElement('p');
        playerContainer.appendChild(player1Para);
        playerContainer.appendChild(player2Para);

        if (player1Letter === 'X') {
            player1Para.textContent = 'Player 1, you are X\'s.';
            player2Para.textContent = 'Player 2, you are O\'s.';
        } else {
            player1Para.textContent = 'Player 1, you are O\'s.';
            player2Para.textContent = 'Player 2, you are X\'s.';
        }
    },
    initPlayerHeader: function() {
        let playerHeader = document.getElementById('player-header-p');
        playerHeader.textContent = 'Player 1, it\'s your turn.';
    }
}

