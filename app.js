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

function getHumanChoice(){
    let choice = prompt("Insert your choice: ").toLowerCase();
    return choice;
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

