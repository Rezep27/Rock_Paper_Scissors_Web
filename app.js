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
        return "scissor";
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
            else if (computerChoice === "scissor"){
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
            else if (computerChoice === "scissor"){
                victory = "robot";
            }
            break;
        case "scissor":
            if (computerChoice === "rock"){
                victory = "robot";
            }
            else if (computerChoice === "paper"){
                victory = "human";
            }
            else if (computerChoice === "scissor"){
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
    
    let choice = '';
    if (event.target.closest('#rock-box')){
        choice = 'rock'
    }
    else if (event.target.closest('#paper-box')){
        choice = 'paper';
    }
    else if (event.target.closest('#scissor-box')){
        choice = 'scissor';
    }
    else{
        console.log('Chose nothing');
    }

    if (choice){
        fireChoiceEvent(choice);
    } 
}

function fireChoiceEvent(selectedOpt){
    let playerChose = new CustomEvent('decisionMade', {detail:{
        choice: selectedOpt
    }})

    window.dispatchEvent(playerChose);
}


function spawnBoxes(){

    mainContainer.removeChild(playButton);

    spawnCard('rock');
    spawnCard('paper');
    spawnCard('scissor');

  mainContainer.style.setProperty('gap', '30px');

  mainContainer.addEventListener('click', chooseOption);
}

function spawnCard(cardType, isRobot = false;){
    let id;
    let textCont;
    let imgSrc;
    let robotId = '';

    if (isRobot){
        robotId = 1;
    }
    switch (cardType){
        case 'rock':
            id = `rock-box${robotId}`;
            textCont = 'Rock';
            imgSrc = 'rock.png';
            break;
        case 'paper':
            id = `paper-box${robotId}`;
            textCont = 'Paper';
            imgSrc = 'paper.png';
            break;
        case 'scissor':
            id = `scissor-box${robotId}`;
            textCont = 'Scissors';
            imgSrc = 'scissors.png';
            break;
        default:
            break;
    }

    let box = document.createElement('div');
    let imageContainer = document.createElement('div');
    let image = document.createElement('img');
    let text = document.createElement('h3');

    box.id = id;
    box.classList.add('choice-container');

    text.textContent = textCont;

    imageContainer.appendChild(image);

    box.appendChild(imageContainer);
    box.appendChild(text);

    image.src = imgSrc;
    mainContainer.appendChild(box);

}

function despawnSpareCards(chosenCard, playerChoice = '', robotChoice = ''){
    let card1Name;
    let card2Name;

    switch (chosenCard){
        case 'rock':
            card1Name = '#paper-box';
            card2Name = '#scissor-box';
            break;
        case 'paper':
            card1Name = '#rock-box';
            card2Name = '#scissor-box';
            break;
        case 'scissor':
            card1Name = '#paper-box';
            card2Name = '#rock-box';
            break;   
        case '':
            card1Name = `#${playerChoice}-box`;
            card2Name = `#${robotChoice}-box1`;

    }

    document.querySelector(card1Name).remove();
    document.querySelector(card2Name).remove();
}

let playButton = document.querySelector("#play-button");
let mainContainer = document.querySelector('#main-container');
playButton.addEventListener('click', spawnBoxes);

window.addEventListener('decisionMade', (event) => {
    let computerChoice = getComputerChoice()
    let playerChoice = event.detail.choice;

    despawnSpareCards(playerChoice);

    playRound(playerChoice, computerChoice);
})

