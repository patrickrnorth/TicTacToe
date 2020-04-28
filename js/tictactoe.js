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





}
