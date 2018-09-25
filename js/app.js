//Assign deck classname to variable
const deck = document.querySelector('.deck');

//Assign card classname to variable and then to an array
let card = document.getElementsByClassName('card');
let cards = [...card];

//Assign variable for clicked cards to be used in event listener function
let flippedCards = [];

//Function limiting clicked cards to only 2
deck.addEventListener('click', function() {
    const targetClicked = event.target;
    hasTimerStarted();

    if (targetClicked.classList.contains('card') && !targetClicked.classList.contains('match') && flippedCards.length < 2) {
        targetClicked.classList.toggle('open');
        targetClicked.classList.toggle('show');
        flippedCards.push(targetClicked);
        console.log(flippedCards);

        if (flippedCards.length === 2) {
        totalMoves();
        cardMatchCheck();
        }
   }
});


//Assign open and show classes to clicked cards
function flipCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

//Variable to track number of matches
const pairs = 8;
let matchedCards = 0;

//Function to check for a match
 function cardMatchCheck() {
    if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
        console.log("Cards match");
        flippedCards[0].classList.toggle('match');
        flippedCards[1].classList.toggle('match');
        flippedCards = [];
        matchedCards++;
        console.log('Total = ' + matchedCards);
        gameOver();
    } else {
        setTimeout(() => {
        console.log("No match found");
        flipCard(flippedCards[0]);
        flipCard(flippedCards[1]);
        flippedCards = [];
        }, 1000);
    }
}

//Variable for total moves
let moves = 0;

//Variable for html move class
let movesInc = document.querySelector('.moves');

//Function to total moves
function totalMoves() {
    moves++;
    movesInc.innerHTML = moves;
}


//Shuffle cards when new game is started
window.onload = changeCardPosition();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Change card positions using shuffle function from stackoverflow
function changeCardPosition(){
   const cardPosition = shuffle(cards);
   for (var i= 0; i < cardPosition.length; i++){
      [].forEach.call(cardPosition, function(item){
         deck.appendChild(item);
      });
   }
}

//Functionality for ending game
function gameOver() {
    if (matchedCards === pairs) {
        console.log('All cards have matched! You win!');
        starRating();
        stopTimer();
        popup();

    }
}

/*
 * Modal logic for winning game
*/

//initialize modal variable
var modal = document.querySelector('.popup');

//set html for exit icon
var closeIcon = document.querySelector('.close-icon');

//Toggle on/off modal
function popup() {
    modal.classList.toggle('show-popup');
    document.querySelector('.tot-moves').innerHTML = moves;
    document.querySelector('.mins').innerHTML = parseInt(seconds / 60);
    document.querySelector('.secs').innerHTML = seconds % 60;
    var starPanel = document.querySelector('.stars').innerHTML;
    document.querySelector('.stars2').innerHTML = starPanel;
}

//Close modal by clicking
function windowOnClick(event) {
    if (event.target === popup) {
        popup();
    }
}


//X icon to close modal
closeIcon.addEventListener('click', function() {
    popup();
    restartGame();
});

//close modal by clicking underlay
window.addEventListener('click', windowOnClick);

//Initialize 3 stars IDs to variables
const starOne = document.querySelector('#one');
const starTwo = document.querySelector('#two');
const starThree = document.querySelector('#three');

//Determine stars by total moves
function starRating() {
    if (moves > 24) {
        starOne.style.display = 'none';
        starTwo.style.display = 'none';
    } else if (moves > 15 && moves <= 24) {
        starThree.style.display = 'none';
    } else {
    starOne.style.display = 'inline'
    starTwo.style.display = 'inline';
    starThree.style.display = 'inline';
    }
}


/*
 * Game Timer Functionality
*/

//Start the timer
let seconds = 0;
function startTimer() {
    timer = setInterval(function() {
        seconds ++;
        document.getElementById("seconds").innerText = seconds % 60;
            document.getElementById("minutes").innerText = parseInt(seconds / 60);
        }, 1000);
}

//Check whether timer has started
let timerOn = true;
function hasTimerStarted() {
if (timerOn) {
        startTimer();
        timerOn = false;
    }
}

//Stop the timer
function stopTimer() {
    clearInterval(timer);
}

/*
 * Restart game using restart icon
*/

function restartGame() {
  location.reload();
  stopTimer();
}
