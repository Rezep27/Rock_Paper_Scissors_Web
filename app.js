let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    let choice = 3 * Math.random(); 
    if (choice < 1){
        return "rock";
    }
    else if (choice < 2){
        return "paper";
    }
    else{
        return "scissors";
    }
}

function playRound(humanChoice, computerChoice){
    let victory = "";
    switch (humanChoice){
        case "rock":
            if (computerChoice === "rock"){
                victory = "tie";
            }
            else if (computerChoice === "paper"){
                victory = "robot";
            }
            else if (computerChoice === "scissors"){
                victory = "human";
            }
            break;
        case "paper":
            if (computerChoice === "rock"){
                victory = "human";
            }
            else if (computerChoice === "paper"){
                victory = "tie";
            }
            else if (computerChoice === "scissors"){
                victory = "robot";
            }
            break;
        case "scissors":
            if (computerChoice === "rock"){
                victory = "robot";
            }
            else if (computerChoice === "paper"){
                victory = "human";
            }
            else if (computerChoice === "scissors"){
                victory = "tie";
            }
            break;
        default:
            break;
    }

    switch (victory){
        case "robot":
            console.log("Robot wins!");
            computerScore += 1;
            break;
        case "human":
            console.log("Human wins!");
            humanScore += 1;
            break;
        case "tie":
            console.log("It is a tie!");
            break;
        default:
            console.log("Robot wins!");
            break;
    }
}

function chooseOption(event){

    let playerChose = new CustomEvent('decisionMade', {detail:{}})
    
    if (event.target.closest('#rock-box')){
        console.log('Chose rock');
        mainContainer.dispatchEvent(playerChose)
    }
    else if (event.target.closest('#paper-box')){
        console.log('Chose paper');
    }
    else if (event.target.closest('#scissor-box')){
        console.log('Chose scissors');
    }
    else{
        console.log('Chose nothing');
    }
}

let playButton = document.querySelector("#play-button");
let mainContainer = document.querySelector('#main-container');


function spawnBoxes(){
    mainContainer.removeChild(playButton);

  let rockBox = document.createElement('div');
  let paperBox = document.createElement('div');
  let scissorBox = document.createElement('div');

  let rockImageContainer = document.createElement('div');
  let paperImageContainer = document.createElement('div');
  let scissorImageContainer = document.createElement('div');

  let rockImage = document.createElement('img');
  let paperImage = document.createElement('img');
  let scissorImage = document.createElement('img');

  let rockText = document.createElement('h3');
  let paperText = document.createElement('h3');
  let scissorText = document.createElement('h3');

  rockBox.id = 'rock-box';
  paperBox.id = 'paper-box';
  scissorBox.id = 'scissor-box';

  rockBox.classList.add('choice-container');
  paperBox.classList.add('choice-container');
  scissorBox.classList.add('choice-container');

  rockText.textContent = "Rock";
  paperText.textContent = "Paper";
  scissorText.textContent = "Scissors";

  rockImageContainer.appendChild(rockImage);
  paperImageContainer.appendChild(paperImage);
  scissorImageContainer.appendChild(scissorImage);

  rockBox.appendChild(rockImageContainer);
  rockBox.appendChild(rockText);

  paperBox.appendChild(paperImageContainer);
  paperBox.appendChild(paperText);
  
  scissorBox.appendChild(scissorImageContainer);
  scissorBox.appendChild(scissorText);

  rockImage.src = 'rock.png';
  paperImage.src = 'paper.png';
  scissorImage.src = 'scissors.png';

  mainContainer.appendChild(rockBox);
  mainContainer.appendChild(paperBox);
  mainContainer.appendChild(scissorBox);

  mainContainer.style.setProperty('gap', '30px');

  mainContainer.addEventListener('click', chooseOption);
}

playButton.addEventListener('click', spawnBoxes);

