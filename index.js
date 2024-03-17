 const rock = document.getElementById("rock");
 const paper = document.getElementById("paper");
 const scissors = document.getElementById("scissors");

 const buttons = [rock, paper, scissors];

 buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.getAttribute("id"));
    })
 })


