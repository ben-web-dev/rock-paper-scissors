 // DOM manipulation
 
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
 const rulesBtn = document.querySelector('.rules');
 const rulesDiv = document.createElement('div');

 // Other variable declarations

 const buttons = [rock, paper, scissors];
 let playerName = '';
 playerName = prompt('Enter your name: ');
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

 // As a player selects a choice, it automatically plays a computer turn
 // to effectively start the round

function playTurn(choice) {
    let aiTurn = computerChoice();
    gameDiv.textContent = '';
    if (choice === 'rock' && aiTurn === 'scissors' ||
        choice === 'paper' && aiTurn === 'rock'    ||
        choice === 'scissors' && aiTurn === 'paper'  ) {
            console.log('you win!');
            turnDiv.textContent = `${playerName} beats Computer!`;
            ++playerScore;
    } else if
       (choice === 'rock' && aiTurn === 'paper'    ||
        choice === 'paper' && aiTurn === 'scissors'||
        choice === 'scissors' && aiTurn === 'rock'   ) {
            console.log('you lose!');
            turnDiv.textContent = `Computer beats ${playerName}!`;
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

// Ends the game if either score reaches 5

function endCurrentGame() {
    if (playerScore === 5) {
        gameDiv.textContent = `${playerName} wins this game ${playerScore}:${comperScore}`;
    } else if (comperScore === 5) {
        gameDiv.textContent = `Computer wins this game ${comperScore}:${playerScore}`;
    }
    turnDiv.textContent = 'Choose to play again!';
    score.textContent = '';
    gameCount++;
    localStorage.setItem('gameCount', JSON.stringify(gameCount));
    gameTracker.push({
        game: gameCount,
        pname: playerName,
        pscore: playerScore,
        cscore: comperScore
    })
    console.log(gameTracker);
    localStorage.setItem('gameTracker', JSON.stringify(gameTracker));
    playerScore = 0;
    comperScore = 0;
}

// Produces a choice for the computer using random number generation

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

// Round history with counters!

histBtn.addEventListener('click', () => {
    history.innerHTML = '';
    history.style.visibility = 'visible';

    const historyExit = document.createElement('button');
    historyExit.innerHTML = 'X';
    historyExit.style.right = '0';
    historyExit.style.margin = '1vh';
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
        gameTrackerDivPlayer.textContent = `${game.pname}: ${game.pscore}`;
        gameTrackerDivComper.textContent = `Computer: ${game.cscore}`;
        if (game.pscore > game.cscore) {
            gameTrackerDivPlayer.style.color = 'lightgreen';
            gameTrackerDivComper.style.color = 'red';
        } else {
            gameTrackerDivPlayer.style.color = 'red';
            gameTrackerDivComper.style.color = 'lightgreen';
        }
        gameTrackerDiv.appendChild(gameTrackerDivGame);
        gameTrackerDiv.appendChild(gameTrackerDivPlayer);
        gameTrackerDiv.appendChild(gameTrackerDivComper);

        history.appendChild(gameTrackerDiv);
    });
    let totalHuman = 0;
    let totalComputer = 0;
    let totalLegsHuman = 0;
    let totalLegsComputer = 0;

    gameTracker.forEach(game => {
        totalLegsHuman += game.pscore
        totalLegsComputer += game.cscore
        if (game.pscore > game.cscore) {
            totalHuman++
        } else if (game.pscore < game.cscore) {
            totalComputer++
        }
    });

    const totalScores = document.createElement('p');
    totalScores.textContent = `Games: Human ${totalHuman} : ${totalComputer} Computer`;

    const totalLegs = document.createElement('p');
    totalLegs.textContent = `Rounds: Human ${totalLegsHuman} : ${totalLegsComputer} Computer`;


    history.appendChild(totalScores);
    history.appendChild(totalLegs);

    const clearHistory = document.createElement('button');
    clearHistory.textContent = 'Clear data?';
    clearHistory.style.margin = '1vh';
    history.appendChild(clearHistory);

    clearHistory.addEventListener('click', () => {
        gameCount = [];
        gameTracker = [];
        localStorage.setItem('gameCount', JSON.stringify(gameCount));
        localStorage.setItem('gameTracker', JSON.stringify(gameTracker));
        history.style.visibility = 'hidden';
    })
})

// Rules

rulesDiv.classList.add('rules-div')
rulesDiv.style.visibility = 'hidden';
container.appendChild(rulesDiv)

const rulesTitle = document.createElement('h2');
rulesTitle.textContent = 'Rules of Rock, Paper, Scissors';
rulesDiv.appendChild(rulesTitle)

const rulesList = document.createElement('ul');
rulesDiv.appendChild(rulesList);

const rockRules = document.createElement('li');
const scisRules = document.createElement('li');
const paprRules = document.createElement('li');
const playRules = document.createElement('li');
const compRules = document.createElement('li');
const drawRules = document.createElement('li');
const clickHere = document.createElement('p');

rockRules.textContent = 'Rock beats scissors';
paprRules.textContent = 'Paper beats rock';
scisRules.textContent = 'Scissors beats paper';
playRules.textContent = 'If the player wins a round, they get a point.';
compRules.textContent = 'If the computer wins a round, the computer gets a point.';
drawRules.textContent = 'A draw produces no points for either competitor.';
clickHere.textContent = 'Click here to continue!';
clickHere.classList.add('rules-click-here')

rulesDiv.appendChild(clickHere);

const rulesArray = [rockRules, scisRules, paprRules, playRules, compRules, drawRules];
rulesArray.forEach(rule => {
    rulesList.appendChild(rule);
});

rulesBtn.addEventListener('click', () => {
    rulesDiv.style.visibility = 'visible';
})
rulesDiv.addEventListener('click', () => {
    rulesDiv.style.visibility = 'hidden';
})