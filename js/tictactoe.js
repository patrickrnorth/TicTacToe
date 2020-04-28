window.onload = function () {watch()};
function watch() {
    var btn = document.getElementById("btnStop");
    btnDisabled(btn); //disable the stop button since the game has not been started.
}

// this function will roll for random number twice, one for
// each player and determine which player won the roll.
function rollForTurn()  {
    var xArray = [];
    var ranNum = "";
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        //random whole number between 1 and 10
        ranNum - Math.floor(Math.random() * (maximum - minimum) + minimum);
        xArray.push(ranNum);
    }
    diceRoll(); //play dice sounds during the game roll for turn
    //build the string to show which player rolled what die roll
    for (i = 0; i<xArray.length; i++) {
        var result = i + 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne == pTwo) { //rigging roll on tie to avoid bug in code. Need to address this later...
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled ["+pOne+"]<br>"; // may have wrong brackets!!!!
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled [+pTwo+]<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); //time delay for dramatic affect
    }
    //determine and concatenate string showing which player won the roll
    if (pOne > pTwo)  {
        first = "Player 1";
        setTimeout(function() {txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }  else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function() {txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    //pass which player won the roll
    return first;
}

//====================================================================
// initiate the game, roll for turn and determine the active player
//====================================================================
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") {// if it was a tie, then reroll
        activePlayer = rollForTurn();
    }
    setTimeout(function() {hideGameMsg();}, 4000);

    // assign proper state of the control buttons
    var btn = document.getElementById("btnStart");
    btnDisabled(btn); //disable the start button since the game is now afoot
    var btn= document.getElementById("btnStop");
    stopEnabled(btn); //enable the stop button since the game is now afoot

    //Assign the Active Player to the console
    var showPlayer = document.getElementById("showPlayer") //NO SEMICOLON????<<<<<<<<<<<<<<<<----------------------
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "green";
}

//this function styles the game buttons while they are disabled
function btnDisabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(153, 153, 102)";
    btn.style.backgroundColor = "rgb(214, 214, 194)";
    btn.disabled = true;
}

//this function styles the game buttons while they are disabled
function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2 px solid rgb(204,0,0)";
    btn.style.backgroundColor = "rgb(255,51,51)";
    btn.disabled = false;
}

//this function styles the game buttons while they are disabled
function stopGame() {
    hideGameMsg(); //clear the text and hide message box
    var btn = document.getElementById("btnStart");
    startEnabled(btn); //enable the start button since the game is now stopped
    var btn = document.getElementById("btnStop");
    btnDisabled(btn); // disable the stop button since the game is now stopped
    var showPlayer = document.getElementById("showPlayer");
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = "red";

    // reset all squars to their starting empty state.
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i=0; i<arrayO.length; i++) {
        arrayO[1].style.transform = "translateY(-100%)";
    }
    for (var i=0; i<arrayX.length; i++) {
        arrayX[1].style.transform = "translateY(100%)";
    }
    // this clears the running log of all game moves
    document.getElementsByClassName("boardState").innerHTML = "";
}


//this function will show the message console and any text it may have
function showGameMsg() {
    document.getElementById("gameMsgBox").style.display = "block"; 
}

//this function will conceal the message console from view
function hideGameMsg()  {
    clearMsg() // clear the text from the message console
    document.getElementById("gameMsgBox").style.display = "none"; //hide the div
}
// this function will write text to the game message console.
function writeMsg(txt) {
    showGameMsg();
    document.getElementById("gameMsg").innerHtml = txt;
}

// this funciton will clear the text from the message console
function clearMsg() {
    document.getElementById("gameMsg").innerHtml = "";
}

// this function is for the player configuration panel and checks the
// proposed avatar assignments and prevents them from being the same.
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player 1 and Player 2 cannot both be assigned as: "+p1Selected[p1Index].text);
    } else {
        document.getElementById('p1Display').innerHTML=p1Selected[p1Index].text;
        document.getElementById("psDisplay").innerHTML=p2Selected[p2Index].text;
    }
}

// this function returns the currently assigned avatar for each player
function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML;
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}

//this function will return the active player's avatar
function determineAvatar() {
    // determine the correct avatar to paint for the active player
    var avatarArray = getAvatars(); // returns an array of both player's assigned avatars
    var active = document.getElementById("showPlayer").innerHTML; // get active player
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player 1") {   //check which player is active and their corresponding avatar
        var paintAvatar = p1Avatar;
    } else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar; // returned back the correct avatar
}

// this function changes active player over to the other player
function avatarPlaced() {
    var parseText = document.getElementById("gameMsg").innerHTML;
    var showPlayer = document.getElementById("showPlayer"); // select the current element to memory
    // check if there is already a winner...if there is, then dont continue the game
    if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!"){
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = "red";
    }
    activePlayer = showPlayer.innerHTML; // get the current player from the element
    if (activePlayer == "Player 1") { // once active player selects a square change the active player
        showPlayer.innerHTML = "Player 2";        
    } else {
        showPlayer.innerHTML = "Player 1";
    }
    check4Tie(); // call this function to inquire if there was a cat's game.
}


// this function will get the array of the current board
// and check the proposed move for a validity
function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0); // comparing index of square
        if (tempINfo == square) {
            return tempInfo;
        }
    }
}

// as squares are selected they check in with this function to see if that particular
// square has already been assigned and if it has not, record new square with the assigned avatar.
function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById("boardstate").innerHTML; // retrieve boardState array
    var info = boardState.split(','); // separate the string by commas to create an arry
    verdict = check(info,square); // call function to check if proposed square is already occupied
    return verdict;
}

//this function will get list of previous moves
// and then concatenate the current move to it.
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var previousMOves = target.innerHTML;
    target.innerHTML = previousMoves+currentMove;
}
function checkForWinCon() {
    var squareArray = [];
    var target = document.getElementById("boardState");
    var info = target.innerHTML; // raw array with squares and avatars
    info = info.substring(l); // remove leading comma
    info = info.split(','); // separate the string by commas into an array
    info.sort(); // sort the square array in order despite the actual gameplay sequence
    for (var l in info) {
        squareArray.push(info[i].charAt(0)); // new array with only squares not avatars
    }
}

//==================================================================================================
//  These block of functions are for each click event of their corresponding square element
//==================================================================================================
function square1Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square2Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square3Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square4Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square5Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square6Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square7Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square8Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}
function square9Animate()  {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccumpied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove (currentMove);
            checkForWinCon(); //call function to check if current move completes a winning condition.
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    
    }
}

// this function will perform the animation for th O avatar.
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0)" : "translateY(-100%)";
}

function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(100%)" || null) ? "translateY(0%)" : "translateY(100%)";

}
