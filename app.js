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

    return victory;
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

    if (playButton.isConnected){
        mainContainer.removeChild(playButton);
    }

    spawnCard('rock', mainContainer);
    spawnCard('paper', mainContainer);
    spawnCard('scissor', mainContainer);

  mainContainer.addEventListener('click', chooseOption);
}

function spawnCard(cardType, container, isRobot = false){
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
    container.appendChild(box);

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

function setGameStage(playerChoice, computerChoice){

  despawnSpareCards(playerChoice);

  let computerContainer = document.createElement('div');
  
  computerContainer.id = 'computer-container';
  computerContainer.style.flexGrow = "0";

  gameContainer.appendChild(computerContainer);   

  requestAnimationFrame(() => {
    computerContainer.style.flexGrow = "1";
  })

  spawnCard(computerChoice, computerContainer, true);

}

function setContainerTitles(){
    let computerContainer = document.querySelector('#computer-container');
    let playerContainer = document.querySelector('#main-container');

    let computerTitle = document.createElement('h2');
    let playerTitle = document.createElement('h2');

    computerContainer.style.flexDirection = 'column';
    playerContainer.style.flexDirection = 'column';

    computerTitle.textContent = 'Computer';
    playerTitle.textContent = 'Player';

    computerContainer.insertBefore(computerTitle, computerContainer.firstChild);
    playerContainer.insertBefore(playerTitle, playerContainer.firstChild);
}

function removeContainerTitles(){
    let computerContainer = document.querySelector('#computer-container');
    let playerContainer = document.querySelector('#main-container');

    let computerTitle = computerContainer.querySelector('h2');
    let playerTitle = playerContainer.querySelector('h2');

    computerContainer.removeChild(computerTitle);
    playerContainer.removeChild(playerTitle);

    computerContainer.style.flexDirection = 'row';
    playerContainer.style.flexDirection = 'row';
}

function setWinner(winner){
    let title = document.querySelector('.title-container > h1');
    let text = '';

    switch (winner){
        case "robot":
            text ="Robot wins!";
            computerScore += 1;
            break;
        case "human":
            text = "Player wins!";
            humanScore += 1;
            break;
        case "tie":
            text = "It is a tie!";
            break;
    }

    title.textContent = text;
}

async function waitSleep(amount) {
  await sleep(amount);
}


function startNewRound(){

    if (humanScore === 5 || computerScore === 5){
        let title = document.querySelector('.title-container > h1');
        if (humanScore === 5){
            title.textContent = "Player wins the game!";
        }
        else{
            title.textContent = "Robot wins the game!";
        }
        return;
    }
    let computerContainer = document.querySelector('#computer-container');
    if (!computerContainer){
        spawnBoxes();
    }
    else{
        computerContainer.remove();
        spawnBoxes();
    }
}

function resetRound(){
    let event = new CustomEvent('roundReset');
    window.dispatchEvent(event);
}

let playButton = document.querySelector("#play-button");
let mainContainer = document.querySelector('#main-container');
let gameContainer = document.querySelector("#game-container");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let humanScore = 0;
let computerScore = 0;


playButton.addEventListener('click', spawnBoxes);

window.addEventListener('decisionMade', async (event) => {
    let computerChoice = getComputerChoice()
    let playerChoice = event.detail.choice;

    setGameStage(playerChoice, computerChoice);
    setContainerTitles();
    let victory = playRound(playerChoice, computerChoice);
    setWinner(victory);

    await waitSleep(2000);

    despawnSpareCards('', playerChoice, computerChoice);
    removeContainerTitles();
    resetRound();
})

window.addEventListener('roundReset', () => {
    startNewRound();
})



