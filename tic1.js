let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let playerChoice = 'X';
let scores = { 'X': 0, 'O': 0 };
const backgroundMusic = new Audio('background.mp3');
backgroundMusic.loop = true;
function playBackgroundMusic() {
    backgroundMusic.play().catch(error => console.log('Autoplay prevented:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
});

function chooseSymbol(symbol) {
    playerChoice = symbol;
    currentPlayer = symbol;
    startGame();
    playBackgroundMusic();
}

function startGame() {
    document.getElementById('board').innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', makeMove);
        document.getElementById('board').appendChild(cell);
    }
}

function makeMove(event) {
    let index = event.target.dataset.index;
    if (board[index] === '') {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            alert(currentPlayer + ' wins!');
            scores[currentPlayer]++;
            updateScoreboard();
            startGame();
        } else if (!board.includes('')) {
            alert('It\'s a draw!');
            startGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        return board[combo[0]] !== '' &&
               board[combo[0]] === board[combo[1]] &&
               board[combo[1]] === board[combo[2]];
    });
}

function updateScoreboard() {
    document.getElementById('scoreX').textContent = scores['X'];
    document.getElementById('scoreO').textContent = scores['O'];
}

function resetGame() {
    scores = { 'X': 0, 'O': 0 };
    updateScoreboard();
    startGame();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
    let visitSound = new Audio('visit-sound.mp3');
    visitSound.play().catch(error => console.log('Autoplay prevented:', error));
});

startGame();
