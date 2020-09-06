
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
};
//Used like so
//var arr = [1,2,3,4,5];
//arr = shuffle(arr);
//console.log(arr);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Create a list that holds all of your cards
var myCards = ["diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
myCards = [...myCards, ...myCards];

//  List of card that will be selected by players during the game.
var selectedCards = [];

// List to prevent same card is clicked twice
var idChecking =[];

//List of cards that have been matched
var provenCards = [];
var count = 0;
var numberOfStars = document.getElementsByClassName("fa-star").length;

const cardInBox = document.querySelectorAll('.card'); //NodeList form, this need to be converted to Array
var cardArray = Array.prototype.slice.call(cardInBox);


    // Get the modal
    var modal = document.getElementById("myModal");
    var para = document.getElementById("result");
    var newSpan = document.createElement('span');


    //For Testing the Modal - win/lose situation
    var btnWin = document.getElementById("win");
    var btnLose = document.getElementById("lose");
    var btnPlay = document.getElementById("close-button");

    // Get the <span> element that closes the modal
    var span1 = document.getElementsByClassName("close");

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
    modal.style.display = 'none';
}


btnPlay.onclick = function () {
    modal.style.display = 'none';
    para.removeChild(newSpan);
    reset();
}

span1.onclick = function () {
    modal.style.display = 'block';
}

window.onclick = function(event) {
    if (event.target == modal) {
        this.modal.style.display = "none";
        this.para.removeChild(newSpan);
        this.reset();
    }
}

// Modal Stop

/*
List of Function Start
*/

function removeStar() {
    document.querySelector("ul").firstElementChild.remove();
}


function shuffleCard () {
    var uls = document.querySelectorAll('ul')[1]; 
    for(var t = uls.children.length; t >= 0; t--) {
        uls.appendChild(uls.children[Math.random() * t | 0]);
    };
}


//set counting-up timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
this.interval = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function myStopFunction(){
    clearInterval(this.interval);
}

//timer finish


function addStars() {
    for (let s = document.querySelector("ul").childElementCount; s<7; s++){
        const listOfStar = document.querySelectorAll('ul')[0];
        var addStar = document.createElement("li");
        var addIcon = document.createElement("i");
        addIcon.classList.add("fa", "fa-star");
        addStar.appendChild(addIcon);
        listOfStar.appendChild(addStar);
    }
}

function addOneStar(){
    const listOfStar = document.querySelectorAll('ul')[0];
    var addStar = document.createElement("li");
    var addIcon = document.createElement("i");
    addIcon.classList.add("fa", "fa-star");
    addStar.appendChild(addIcon);
    listOfStar.appendChild(addStar);
}


//Reset: Shuffle the card, add the stars
function reset(){
    for (var n=0; n < cardInBox.length; n++) {
        cardInBox[n].classList.remove("open", "show", "match");
    };
    myStopFunction();
    shuffleCard();
    addStars();
    count = 0;
    document.querySelector('.moves').textContent = count;

    totalSeconds = 0;
    minutesLabel.innerHTML = '00'
    secondsLabel.innerHTML = '00'

    this.interval = setInterval(setTime, 1000);
}



//What happen after player lose
function endLose() {
    newSpan.textContent ='Game Over.. You lose in ' + count + ' moves, and time: ' + minutesLabel.innerText + ':'+ secondsLabel.innerText;
    myStopFunction();
    para.appendChild(newSpan);
    modal.style.display = "block";
}

//What happen after player win
function endWin() {
  if (provenCards.length === myCards.length) { 
        myStopFunction();
        var starLeft = document.getElementsByClassName("fa-star").length;     
        newSpan.textContent ='Congrats!!  You win with ' + count + ' moves, time: ' + minutesLabel.innerText + ':'+ secondsLabel.innerText + ', and ' + starLeft + ' stars remaining.';
        para.appendChild(newSpan);
        modal.style.display = "block";
  };
}

//For testing purpose, check the Modal in WIN and LOSE condition
btnWin.onclick = function () {
    provenCards.length = 16;
    endWin();
}

btnLose.onclick = function () {
    endLose();
}


//console.log(i); --> this prove that 'i' always has value 16, so we need to use event as a standard.
const onClick = (event) => {    
    const cardId = event.target.id;
    const cardClass = event.target.classList;

    //If Icon is clicked
    const parentId = event.path[1].id;

    const classCard = event.target.classList;


    if (event.target.firstElementChild === null) {
        selectedCards.push(event.target.classList[1]);
        idChecking.push(event.path[1].id);
    } else {
        selectedCards.push(event.target.firstElementChild.classList[1]);
        idChecking.push(event.target.id);
    }


    classCard.add('open', 'show');
    checkCard();
    console.log(idChecking);
    console.log(selectedCards);

    //Update the number of clicks in the MOVES
        count += 1;
        const totalMoves = document.querySelector('.moves');
        totalMoves.textContent = count;
} 


//function to check 2 chosen cards: Match or not Match
function checkCard(event) {
if (selectedCards[1] !== undefined) {
    if (idChecking[0] === idChecking[1]) {
        idChecking.pop();
        selectedCards.pop();
        count -= 1;
        const totalMoves = document.querySelector('.moves');
        totalMoves.textContent = count;

        
        console.log("Select different card.")
   
    } else if (idChecking[0] !== idChecking[1]) {
        if (selectedCards[0] === selectedCards[1]) {
            //Opening 2 matching cards

            provenCards.push(selectedCards[0]);
            provenCards.push(selectedCards[1]);

            console.log("Cards match");
            document.getElementsByClassName("open")[1].classList.replace("open", "match");
            document.getElementsByClassName("open")[0].classList.replace("open", "match");
            
            selectedCards=[];
            idChecking=[];
            addOneStar();
            setTimeout(function(){
                endWin();}, 1100);


        } else if (selectedCards[0] !== selectedCards[1]) {
            console.log("Cards did not match");
            document.getElementsByClassName("open")[1].classList.replace("open", "wrong");
            document.getElementsByClassName("open")[0].classList.replace("open", "wrong");

            //time delay one second to change red color to grey closed card again
                selectedCards=[];
                idChecking=[];

            setTimeout(function(){
                document.getElementsByClassName("wrong")[1].classList.remove("show", "wrong");
                document.getElementsByClassName("wrong")[0].classList.remove("show", "wrong");
            },1000);
            

            // remove star one by one that represented the remaining lives of player
            if (document.querySelector("ul").childElementCount === 1) {
                setTimeout(function(){
                    endLose();}, 1100);
            } else {
                removeStar();
            }
        }
    } 
} }


const handleRestart = () => {
    for (var n=0; n < cardInBox.length; n++) {
        cardInBox[n].classList.remove("open", "show", "match");
    };
    shuffleCard();
    addStars();
    count = 0;
    document.querySelector('.moves').textContent = count;

    totalSeconds = 0;
    minutesLabel.innerHTML = '00'
    secondsLabel.innerHTML = '00'

    this.interval = setInterval(1000);
}


var restartButton = document.querySelector('div .restart i');
restartButton.addEventListener('click', handleRestart);


//FOR Loops to add event listener in multiple cards needs a FOR loops
shuffleCard();
for (var i=0; i< cardInBox.length; i++){
    cardInBox[i].addEventListener('click', onClick);

}

//gameEnd();
