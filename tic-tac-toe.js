let gameBoard = {
    gameBoardSquares: Array.from(document.getElementsByClassName('game-square')),
    clickCount: 0,
    p1Letter: '',
    p2Letter: '',
    letterTracker: {},
    addListeners: function() {
        gameBoard.gameBoardSquares.forEach(function(square) {
            square.disabled = false;
            square.addEventListener('click', gameBoard.gameSquareClicked)
        })
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

        let horizCheck = gameResult.checkHorizontal(gameBoard.letterTracker);
        let vertCheck = gameResult.checkVertical(gameBoard.letterTracker);
        let diagCheck = gameResult.checkDiaganol(gameBoard.letterTracker);
        if (!horizCheck && !vertCheck && !diagCheck) {
            gameResult.checkTie(gameBoard.letterTracker);
        }
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
        // TextContent needs to display one step ahead because it changes on click
        if (playerTurn === 'Player1') {
            playerHeader.textContent = 'Player 2, it\'s your turn.';
        } else {
            playerHeader.textContent = 'Player 1, it\'s your turn.';
        }
    },
    updateLetterTracker: function (squareId, letter) {
        gameBoard.letterTracker[squareId] = letter;
    }
};

let gameFlow = {
    getPlayer1Options: function() {
        return Array.from(document.getElementsByClassName('p1-select-btn'));
    },
    addListeners: function() {
        let player1Options = gameFlow.getPlayer1Options();
        player1Options.forEach(button => button.addEventListener('click', gameFlow.player1Selection));
    },
    player1Selection: function(event) {
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
        playerLetterSelection.removePlayerSelectContainer();
        playerLetterSelection.afterPlayer1Selection(player1Letter);
        playerLetterSelection.initPlayerHeader();
        gameBoard.addListeners();
    }
};

let playerLetterSelection = {
    afterPlayer1Selection: function(player1Letter) {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];

        player1Para = document.createElement('p');
        player1Para.setAttribute('id', 'player1-para');
        player2Para = document.createElement('p');
        player2Para.setAttribute('id', 'player2-para');

        newGameBtn = document.createElement('button');
        newGameBtn.setAttribute('id', 'new-game-btn');
        newGameBtn.textContent = 'New Game';

        playerContainer.appendChild(player1Para);
        playerContainer.appendChild(player2Para);
        playerContainer.appendChild(newGameBtn);

        if (player1Letter === 'X') {
            player1Para.textContent = 'Player 1, you are X\'s.';
            player2Para.textContent = 'Player 2, you are O\'s.';
        } else {
            player1Para.textContent = 'Player 1, you are O\'s.';
            player2Para.textContent = 'Player 2, you are X\'s.';
        }
        playerLetterSelection.activateNewGameBtn();
    },
    initPlayerHeader: function() {
        let playerHeader = document.getElementById('player-header-p');
        playerHeader.textContent = 'Player 1, it\'s your turn.';
    },
    activateNewGameBtn: function() {
        let newGameBtn = document.getElementById('new-game-btn');
        newGameBtn.addEventListener('click', newGame.resetGame);
    },
    removePlayerSelectContainer: function() {
        let playerSelectContainer = Array.from(document.getElementsByClassName('p1-selection-container'))[0];
        playerSelectContainer.remove();
    }
}

let gameResult = {
    checkHorizontal: function(letterTracker) {
        if ((letterTracker['btn-0'] === 'X' && letterTracker['btn-1'] === 'X' && letterTracker['btn-2'] === 'X') ||
            (letterTracker['btn-0'] === 'O' && letterTracker['btn-1'] === 'O' && letterTracker['btn-2'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        } 
        if ((letterTracker['btn-3'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-5'] === 'X') ||
            (letterTracker['btn-3'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-5'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }
        if ((letterTracker['btn-6'] === 'X' && letterTracker['btn-7'] === 'X' && letterTracker['btn-8'] === 'X') ||
            (letterTracker['btn-6'] === 'O' && letterTracker['btn-7'] === 'O' && letterTracker['btn-8'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }  
    },
    checkVertical: function(letterTracker) {
        if ((letterTracker['btn-0'] === 'X' && letterTracker['btn-3'] === 'X' && letterTracker['btn-6'] === 'X') ||
            (letterTracker['btn-0'] === 'O' && letterTracker['btn-3'] === 'O' && letterTracker['btn-6'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }
        if ((letterTracker['btn-1'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-7'] === 'X') ||
            (letterTracker['btn-1'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-7'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }
        if ((letterTracker['btn-2'] === 'X' && letterTracker['btn-5'] === 'X' && letterTracker['btn-8'] === 'X') ||
            (letterTracker['btn-2'] === 'O' && letterTracker['btn-5'] === 'O' && letterTracker['btn-8'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }

    },
    checkDiaganol: function(letterTracker) {
        if ((letterTracker['btn-0'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-8'] === 'X') ||
            (letterTracker['btn-0'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-8'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }
        if ((letterTracker['btn-2'] === 'X' && letterTracker['btn-4'] === 'X' && letterTracker['btn-6'] === 'X') ||
            (letterTracker['btn-2'] === 'O' && letterTracker['btn-4'] === 'O' && letterTracker['btn-6'] === 'O')
        ) {
            gameResult.gameOver();
            return true;
        }
    },
    checkTie: function(letterTracker) {
        if (Object.keys(letterTracker).length === 9) {
            gameResult.gameOver('tie');
        }
    },
    gameOver: function(outcome='win') {
        gameResult.disableAllGameBoardSquares();
        gameResult.displayWinner(outcome);
    },
    disableAllGameBoardSquares: function() {
        let gameBoardSquares = Array.from(document.getElementsByClassName('game-square'))
        gameBoardSquares.forEach(square => square.disabled = true);
    },
    displayWinner: function(outcome) {
        let playerHeader = document.getElementById('player-header-p');
        if (outcome === 'tie') {
            playerHeader.textContent = 'Tie!';
        } else {
            let player = gameBoard.getPlayerTurn();
            if (player === 'Player2') {
                playerHeader.textContent = 'Player 1 Wins!';
            } else {
                playerHeader.textContent = 'Player 2 Wins!';
            }
        }
    },
    removePlayerContainerChildren: function() {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];
        let player1Para = document.getElementById('player1-para');
        let player2Para = document.getElementById('player2-para');
        let newGameBtn = document.getElementById('new-game-btn');
        if (player1Para !== null && player2Para !== null && newGameBtn !== null) {
            playerContainer.removeChild(player1Para);
            playerContainer.removeChild(player2Para);
            playerContainer.removeChild(newGameBtn);
        }
    }
}

const newGame = {
    resetGameBoardSquares: function() {
        gameBoard.gameBoardSquares.forEach(square => {
            square.disabled = true;
            square.textContent = '';
        });
    },
    clearPlayerHeader: function() {
        let playerHeader = document.getElementById('player-header-p');
        playerHeader.textContent = '';
    },
    clearLetterTracker: function() {
        gameBoard.letterTracker = {};
    },
    setPlayerSelectContainer: function() {
        let playerContainer = Array.from(document.getElementsByClassName('player-container'))[0];
        let playerSelectContainer = document.createElement('div');
        playerSelectContainer.setAttribute('class', 'p1-selection-container');
        playerContainer.appendChild(playerSelectContainer);
        let para1 = document.createElement('p');
        para1.setAttribute('id', 'player-para-1');
        para1.textContent = 'Player 1,';
        let para2 = document.createElement('p');
        para2.setAttribute('id', 'player-para-2')
        para2.textContent = ' or ';
        let xBtn = document.createElement('button');
        xBtn.setAttribute('class', 'p1-select-btn');
        xBtn.setAttribute('id', 'p1-x');
        xBtn.textContent = 'X';
        let oBtn = document.createElement('button');
        oBtn.setAttribute('class', 'p1-select-btn');
        oBtn.setAttribute('id', 'p1-o');
        oBtn.textContent = 'O';
        playerSelectContainer.appendChild(para1);
        playerSelectContainer.appendChild(xBtn);
        playerSelectContainer.appendChild(para2);
        playerSelectContainer.appendChild(oBtn);
    },
    resetGame: function() {
        newGame.resetGameBoardSquares();
        gameResult.removePlayerContainerChildren();
        newGame.clearPlayerHeader();
        newGame.clearLetterTracker();
        gameBoard.clickCount = 0;
        newGame.setPlayerSelectContainer();
        gameFlow.addListeners();
    }
}
newGame.setPlayerSelectContainer();
gameFlow.addListeners();