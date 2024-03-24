 const container = document.querySelector('.container');
 const rock = document.getElementById("rock");
 const paper = document.getElementById("paper");
 const scissors = document.getElementById("scissors");
 const footer = document.querySelector(".footer");

 const buttons = [rock, paper, scissors];
 let record = []
 let gameCount = [];
 let playerScore = 0;
 let comperScore = 0;
 let gameTracker = [];

 buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonSelected = button.getAttribute("id");
        playTurn(buttonSelected);
    })
 })

function playTurn(choice) {
    let aiTurn = computerChoice();
    if (choice === 'rock' && aiTurn === 'scissors' ||
        choice === 'paper' && aiTurn === 'rock'    ||
        choice === 'scissors' && aiTurn === 'paper'  ) {
            console.log('you win!')
            playerScore++
    } else if
       (choice === 'rock' && aiTurn === 'paper'    ||
        choice === 'paper' && aiTurn === 'scissors'||
        choice === 'scissors' && aiTurn === 'rock'   ) {
            console.log('you lose!')
            comperScore++
    } else {
            console.log('draw!');
    }
    if (playerScore === 5 || comperScore === 5) {
        endCurrentGame();
    }
}

function endCurrentGame() {
    gameCount++
    gameTracker.push({
        'Game': gameCount,
        'Player Score:': playerScore,
        'Computer Score': comperScore
    })
    console.log(gameTracker);
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