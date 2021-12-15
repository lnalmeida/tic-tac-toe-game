const X_CLASS = 'X';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restart-button');



let circleTurn;

start();

function start() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    setBoardHoverClass();
}

function handleCellClick(e) {
    // Colocar o X ou O
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // Verificar se alguem ganhou
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Deu velha!';
    } else {
        winningMessageText.innerText = `${circleTurn ? '"O"' : '"X"' } venceu!`;
    }
    winningMessage.classList.add('show');

}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });   
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}      

function disableCells() {
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleCellClick, { once: true });
    });
}

function swapTurn() {
    circleTurn = !circleTurn;

}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    };
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function handleRestartButtonClick() {
    restartButton.addEventListener('click', () => {

        start();
        winningMessage.classList.remove('show');
    });
}

handleRestartButtonClick();


