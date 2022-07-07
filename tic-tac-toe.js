let gameBoard = {
    gameBoardSquares: Array.from(document.getElementsByClassName('game-square')),
    clickCount: 0,
    p1Letter: '',
    p2Letter: '',
    letterTracker: {},
    addListeners: function() {
        this.gameBoardSquares.forEach(square => square.addEventListener('click', this.gameSquareClicked))
    },

    gameSquareClicked: function(event) {
        let playerTurn = gameBoard.getPlayerTurn();
        let squareId = event.target.id;
        if (playerTurn === 'Player1') {
            event.target.textContent = gameBoard.p1Letter;
            gameBoard.updateLetterTracker(squareId, gameBoard.p1Letter)
        } else {
            event.target.textContent = gameBoard.p2Letter;
            gameBoard.updateLetterTracker(squareId, gameBoard.p2Letter);
        }
        event.target.disabled = true
        gameBoard.updateHeader(playerTurn);
        gameResult.checkHorizontal(gameBoard.letterTracker);
        gameResult.checkVertical(gameBoard.letterTracker);
        gameResult.checkDiaganol(gameBoard.letterTracker);
    },
    getPlayerTurn: function() {
        gameBoard.clickCount += 1;
        if (gameBoard.clickCount % 2 !== 0) {
            return 'Player1';
        } return 'Player2';
    },
    setLetterAssignments: function (player1Letter, player2Letter) {
        gameBoard.p1Letter = player1Letter;
        gameBoard.p2Letter = player2Letter;
    },
    updateHeader: function (playerTurn) {
        let playerHeader = document.getElementById('player-header-p');
        // Text needs to display one step ahead because it changes on the click
        if (playerTurn === 'Player1') {
            playerHeader.textContent = 'Player 2, it\'s your turn.';
        } else {
            playerHeader.textContent = 'Player 1, it\'s your turn';
        }
    },
    updateLetterTracker: function (squareId, letter) {
        gameBoard.letterTracker[squareId] = letter;
    }
};

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
        gameBoard.setLetterAssignments(player1Letter, player2Letter);
        playerLetterSelection.afterPlayer1Selection(player1Letter);
        playerLetterSelection.initPlayerHeader();
        gameBoard.addListeners();
    }
})();

let playerLetterSelection = {
    afterPlayer1Selection: function(player1Letter) {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];
        let player1SelectContainer = Array.from(document.getElementsByClassName('p1-selection-container'))[0];
        player1SelectContainer.remove();

        player1Para = document.createElement('p');
        player1Para.setAttribute('id', 'player1-para');
        player2Para = document.createElement('p');
        player2Para.setAttribute('id', 'player2-para');

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

let gameResult = {
    checkHorizontal: function(letterTracker) {
        if ((letterTracker['btn-0'] === 'X' && letterTracker['btn-1'] === 'X' && letterTracker['btn-2'] === 'X') ||
            (letterTracker['btn-0'] === 'O' && letterTracker['btn-1'] === 'O' && letterTracker['btn-2'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(1);
        } 
        if ((letterTracker['btn-3'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-5'] === 'X') ||
            (letterTracker['btn-3'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-5'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(2);
        }
        if ((letterTracker['btn-6'] === 'X' && letterTracker['btn-7'] === 'X' && letterTracker['btn-8'] === 'X') ||
            (letterTracker['btn-6'] === 'O' && letterTracker['btn-7'] === 'O' && letterTracker['btn-8'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(3);
        }  
    },
    checkVertical: function(letterTracker) {
        if ((letterTracker['btn-0'] === 'X' && letterTracker['btn-3'] === 'X' && letterTracker['btn-6'] === 'X') ||
            (letterTracker['btn-0'] === 'O' && letterTracker['btn-3'] === 'O' && letterTracker['btn-6'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(4);
        }
        if ((letterTracker['btn-1'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-7'] === 'X') ||
            (letterTracker['btn-1'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-7'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(5);
        }
        if ((letterTracker['btn-2'] === 'X' && letterTracker['btn-5'] === 'X' && letterTracker['btn-8'] === 'X') ||
            (letterTracker['btn-2'] === 'O' && letterTracker['btn-5'] === 'O' && letterTracker['btn-8'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(6);
        }
    },
    checkDiaganol: function(letterTracker) {
        if ((letterTracker['btn-0'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-8'] === 'X') ||
            (letterTracker['btn-0'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-8'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(7);
        }
        if ((letterTracker['btn-2'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-6'] === 'X') ||
            (letterTracker['btn-2'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-6'] === 'O')
        ) {
            gameResult.gameOver();
            console.log(8);
        }
    },
    gameOver: function() {
        gameResult.disableAllGameBoardSquares();
        gameResult.displayWinner();
        gameResult.removePlayerContainerChildren();
        gameResult.addNewGameButton(); 
    },
    disableAllGameBoardSquares: function() {
        let gameBoardSquares = Array.from(document.getElementsByClassName('game-square'))
        gameBoardSquares.forEach(square => square.disabled = true);
    },
    displayWinner: function() {
        let player = gameBoard.getPlayerTurn();
        let playerHeader = document.getElementById('player-header-p');
        if (player === 'Player2') {
            playerHeader.textContent = 'Player 1 Wins!'
        } else {
            playerHeader.textContent = 'Player 2 Wins!'
        }
    },
    addNewGameButton: function() {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];
        const newGameBtn = document.createElement('button');
        newGameBtn.setAttribute('id', 'new-game-btn');
        newGameBtn.textContent = 'New Game';
        playerContainer.appendChild(newGameBtn);


    },
    removePlayerContainerChildren: function() {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];
        let child1 = document.getElementById('player1-para');
        let child2 = document.getElementById('player2-para');
        playerContainer.removeChild(child1);
        playerContainer.removeChild(child2);
    }
}

