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




