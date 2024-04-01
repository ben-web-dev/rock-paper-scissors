 const container = document.querySelector('.container');
 const rock = document.getElementById("rock");
 const paper = document.getElementById("paper");
 const scissors = document.getElementById("scissors");
 const footer = document.querySelector(".footer");
 const turnDiv = document.querySelector('.turn-announcement');
 const score = document.querySelector('.score');
 const gameDiv = document.querySelector('.game-announcement');
 const histBtn = document.querySelector('.history-button');
 const history = document.querySelector('.history');

 const buttons = [rock, paper, scissors];
 let record = []
 let gameCount = JSON.parse(localStorage.getItem('gameCount')) || [];
 let playerScore = 0;
 let comperScore = 0;
 let gameTracker = JSON.parse(localStorage.getItem('gameTracker')) || [];

 if (gameTracker == []) {
    histBtn.style.visibility = 'hidden';
} else {
    histBtn.style.visibility = 'visible';
}

 buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonSelected = button.getAttribute("id");
        playTurn(buttonSelected);
    })
 })

function playTurn(choice) {
    let aiTurn = computerChoice();
    gameDiv.textContent = '';
    if (choice === 'rock' && aiTurn === 'scissors' ||
        choice === 'paper' && aiTurn === 'rock'    ||
        choice === 'scissors' && aiTurn === 'paper'  ) {
            console.log('you win!');
            turnDiv.textContent = 'You win!';
            ++playerScore;
    } else if
       (choice === 'rock' && aiTurn === 'paper'    ||
        choice === 'paper' && aiTurn === 'scissors'||
        choice === 'scissors' && aiTurn === 'rock'   ) {
            console.log('you lose!');
            turnDiv.textContent = 'You lose!';
            ++comperScore;
    } else {
            console.log('draw!');
            turnDiv.textContent = 'Draw!';
    }
    score.textContent = `Player ${playerScore} : ${comperScore} Computer`
    if (playerScore === 5 || comperScore === 5) {
        endCurrentGame();
    }
}

function endCurrentGame() {
    if (playerScore === 5) {
        gameDiv.textContent = `You win this game ${playerScore}:${comperScore}`;
    } else if (comperScore === 5) {
        gameDiv.textContent = `Computer wins this game ${comperScore}:${playerScore}`;
    }
    turnDiv.textContent = 'Choose to play again!';
    score.textContent = '';
    gameCount++;
    localStorage.setItem('gameCount', JSON.stringify(gameCount));
    gameTracker.push({
        game: gameCount,
        pscore: playerScore,
        cscore: comperScore
    })
    console.log(gameTracker);
    localStorage.setItem('gameTracker', JSON.stringify(gameTracker));
    playerScore = 0;
    comperScore = 0;
}

function computerChoice() {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0) {
        return 'rock';
    } else if (choice === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

histBtn.addEventListener('click', () => {
    history.innerHTML = '';
    history.style.visibility = 'visible';

    const historyExit = document.createElement('button');
    historyExit.innerHTML = 'X';
    historyExit.style.right = '0';
    historyExit.addEventListener('click', () => {
        history.style.visibility = 'hidden';
    })
    history.appendChild(historyExit);
    gameTracker.forEach(game => {
        const gameTrackerDiv = document.createElement('div');
        gameTrackerDiv.classList.add('game-tracker-div');
        const gameTrackerDivGame = document.createElement('p');
        const gameTrackerDivPlayer = document.createElement('p');
        const gameTrackerDivComper = document.createElement('p');
        gameTrackerDivGame.textContent = `Game: ${game.game}`;
        gameTrackerDivPlayer.textContent = `Player: ${game.pscore}`;
        gameTrackerDivComper.textContent = `Computer: ${game.cscore}`;
        gameTrackerDiv.appendChild(gameTrackerDivGame);
        gameTrackerDiv.appendChild(gameTrackerDivPlayer);
        gameTrackerDiv.appendChild(gameTrackerDivComper);

        history.appendChild(gameTrackerDiv);
    });
    const clearHistory = document.createElement('button');
    clearHistory.textContent = 'Clear data?';
    history.appendChild(clearHistory);

    clearHistory.addEventListener('click', () => {
        gameCount = [];
        gameTracker = [];
        localStorage.setItem('gameCount', JSON.stringify(gameCount));
        localStorage.setItem('gameTracker', JSON.stringify(gameTracker));
        history.style.visibility = 'hidden';
    })
})