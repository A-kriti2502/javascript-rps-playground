console.log("hello aakriti");

const computerChoices = ['rock','paper','scissors'];
let computerScore = 0;
let personScore = 0;
// let round = 0;

function getComputerChoice() {
    const x = Math.floor(Math.random()*3);
    document.getElementById("display-computer").innerHTML = computerChoices[x];
    return computerChoices[x];
}

function getWinner(person, computer) {
    const rules = {
        rock: {
            paper: 'computer',
            scissors: 'person'
        },
        paper: {
            scissors: 'computer',
            rock: 'person'
        },
        scissors: {
            rock: 'computer',
            paper: 'person'
        }
    }
    return rules[person][computer] || 'tie';
}
function playingGame(){
    // get user choice
    const pChoice = event.target.id;
            // In the playingGame() function, the event parameter is passed in as an argument. 
            // This event parameter represents the event that triggered the function call, in this case, 
            // the button click event.
            // The event.target property refers to the element that triggered the event, 
            // which in this case is the button that was clicked. 
            // The id property of the button element is used to get the value of pChoice.
            // So, when a button is clicked, the playingGame() function is called with the event object as an argument. 
            // Inside the function, the pChoice variable is set to the id of the button that was clicked.
        
    document.getElementById("display-user").innerHTML = pChoice;

    // get computer choice
    const cChoice = getComputerChoice();

    // get winner
    const winner = getWinner(pChoice, cChoice);

    if (winner === 'computer') {
        computerScore++;
    }
    else if (winner === 'person') {
        personScore++;
    }

    document.getElementById("score-user").innerHTML = personScore;
    document.getElementById("score-computer").innerHTML = `${computerScore}`;
    // round++;

    // when 5 rounds are complete
    if (computerScore === 5 || personScore===5) {
        let result = "It's a tie";
        if (personScore > computerScore) {
            result = "You Won";
        }
        else if (computerScore > personScore) {
            result = "You Lost";
        }
        document.getElementById("result-div").innerHTML = result;
        
        // removing the event listners 
        const game = document.querySelectorAll('.play');
        game.forEach(x => {
            x.removeEventListener('click',playingGame);
            x.removeEventListener('click',playSound);
        });

        // setting the button visible
        const newgame = document.getElementById("button_restart");
        newgame.classList.remove("invisible");
        
        // timer
        const timerGame= document.getElementById("countdown");
        timerGame.classList.remove("invisible");
        setTimeout(function () {
            location.reload();
        },10000);
        let time =10;
        const countdownEL = document.getElementById('countdown');
        setInterval(updateCountDown,1000);
        function updateCountDown() {
            let seconds = time % 11;
            seconds = seconds<0 ? 'restart' :'Match restarts in '+seconds; 

            countdownEL.innerHTML =`${seconds}`;
            time--;
        }
    }
}


function playSound(){
    const audio = [
        new Audio('./Music/paperSound.mp3'),
        new Audio('./Music/rockSound.mp3'),
        new Audio('./Music/scissorsSound.mp3')
    ];
    const Soundchoice = event.target.id;
    
    if(Soundchoice === 'paper'){
        audio[0].play();
    }
    else if(Soundchoice === 'scissors'){
        audio[2].play();
    }
    else{
        audio[1].play();
    }
}
function addPlayEventListeners() {
    const game = document.querySelectorAll('.play');
    game.forEach(x => {
        x.addEventListener('click', playingGame);
        x.addEventListener('click',playSound);
            //The event object is automatically passed as the first argument to the 
            // event listener function when the event is triggered. In the case of x.addEventListener('click', playingGame);,
            // the playingGame function is defined with no arguments, but it can still access the event object because it is 
            // automatically passed as the first argument by the event listener.
            // So when a click event is triggered on the x element, the event object is passed to the
            // playingGame function as the first argument, even though we didn't explicitly include it in the listener.
    });
}

function removePlayEventListeners() {
    const game = document.querySelectorAll('.play');
    game.forEach(x => {
        x.removeEventListener('click', playingGame);
        x.removeEventListener('click',playSound);
    });
}

function resetGame() {
    addPlayEventListeners();
    computerScore = 0;
    personScore = 0;
    round = 0;
    document.getElementById("display-user").innerHTML = "You";
    document.getElementById("display-computer").innerHTML = "Computer";
    document.getElementById("score-user").innerHTML = 0;
    document.getElementById("score-computer").innerHTML = 0;
    document.getElementById("result-div").innerHTML = "";

    const tryAgainDiv = document.getElementById("button_restart");
    tryAgainDiv.classList.add("invisible"); 

    // timer function
    const timerGame= document.getElementById("countdown");
    timerGame.classList.add("invisible");
}

function restartGame() {
    removePlayEventListeners();
    resetGame();
    
    const newgame = document.getElementById("button_restart");
    newgame.classList.add("invisible");
}

addPlayEventListeners();

const restartGameButton = document.getElementById("button_restart");
restartGameButton.addEventListener('click', evt => {
    restartGame();
});

