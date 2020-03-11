alert('Ready to do a memory game?! Press OK!');

var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var lastKnownButtonId = undefined;
var lastKnownButtonNumber = undefined;
var wait = false;
var numOfMatches;
var numOfMatches = 0;
var turnable;
var buttons = document.querySelectorAll("button");

var movesText = document.getElementById('moves-text');
var moves = 0;
movesText.textContent = moves;

shuffle(numbers);
distributeNumbers();

function distributeNumbers() {
    for (i = 0; i < buttons.length; i++) { 
    buttons[i].dataset.number = numbers[i];
    }
}

function shuffle(array) {
    var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
    }
    return array;
}
for ( i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) 
    {
         var turnable = e.target.dataset.turnable;
    //first guess
        if (!wait && lastKnownButtonId == undefined && lastKnownButtonNumber == undefined && turnable == 'true') {
           e.target.textContent = e.target.dataset.number;
            e.target.style.backgroundColor = "rgb(255, 102, 102)";

            lastKnownButtonId = e.target.id;
            lastKnownButtonNumber = e.target.dataset.number;
}
        
    //second guess
         else if(!wait && lastKnownButtonId != undefined && lastKnownButtonNumber != undefined && turnable == 'true' && e.target.id != lastKnownButtonId) {
            e.target.textContent = e.target.dataset.number;

        moves++;
        movesText.innerText = moves;
            
    //if guesses match...
        if (e.target.dataset.number == lastKnownButtonNumber) {
            e.target.style.backgroundColor = "rgb(255, 25, 33)";
            document.getElementById(lastKnownButtonId).style.backgroundColor = "rgb(255, 25, 33)";

            lastKnownButtonId = undefined;
            lastKnownButtonNumber = undefined;

            numOfMatches++;

            if (numOfMatches == 8) {
                playerWonWindow();
            }
            
        }
        // guesses do NOT match..
        else {
            document.getElementById(lastKnownButtonId).style.backgroundColor = "rgb(255, 102, 102)";
            e.target.style.backgroundColor = "rgb(255, 102, 102)";
            wait = false;
            setTimeout (() => {
                e.target.dataset.turnable = 'true';
                e.target.style.backgroundColor = 'black';

                var tempLastClickedButton = document.getElementById(lastKnownButtonId);
                tempLastClickedButton.dataset.turnable = 'true';
                tempLastClickedButton.style.backgroundColor = 'black';
                
                lastKnownButtonId = undefined;
                lastKnownButtonNumber = undefined;
                wait = false;
                
            }, 1000);
         }   
    }
    });
}

function playerWonWindow() {
    document.querySelector('.player_wins').style.display = 'block';
}

