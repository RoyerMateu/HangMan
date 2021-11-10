//Start + displays
window.onload = init;


var mainChoose = document.getElementById("user-name-container")
var mainGame = document.getElementById("game-container")
var errors = document.getElementById("error")
var buttons40 = document.getElementById("all-buttons")

function init(){
    document.querySelector("#start-button").addEventListener("click",Start);
    document.querySelector("#pause-button").addEventListener("click",stop);
    document.querySelector("#reset-button").addEventListener("click",reset);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00:00";
    loadLocalStorage();
}

function loadLocalStorage(){
    if (localStorage.getItem(HISTORIC_KEY) !== null) {
        userHistoric = JSON.parse(localStorage.getItem(HISTORIC_KEY));
        console.log("YES");
        console.log(userHistoric);
        updateList(userHistoric);
    }
    else{
        console.log("NO!")
    }
}

function Start(){
    if (validationStart()==true){
            mainChoose.classList.add("notShow") //choose a user name page display none
            mainGame.classList.remove("notShow") //game display block
            document.querySelector("#start-button").removeEventListener("click",Start);
            writeSecs();
            id = setInterval(writeSecs,1000);
            document.querySelector("#currently-playing-name").innerText=userName.value;
            createButtons()
        }
}
function validationStart(){
    if (!userName.value == null || !userName.value.length==0 ){
        if (easyButton.checked || mediumButton.checked || hardButton.checked) {
            return true;
        }else {
            errors.textContent = "Select a difficulty"
        }
    }else {
        errors.textContent = "Write a name"
    }
}
function writeSecs(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}
    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}
    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
}
function stop(){
    clearInterval(id);
    document.querySelector("#start-button").addEventListener("click",Start);

}
function reset(){
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00:00";
    h=0;m=0;s=0;
    document.querySelector("#start-button").addEventListener("click",Start);
}
//Objects

const HISTORIC_KEY = "historic";
var userHistoric = [];

const userName=document.querySelector("#user-name-input");
let userNameV;
let newUser;
const newUserI=document.querySelector("#pause-button").addEventListener("click",assignName);

function assignName(){
    userNameV=userName.value;
    userStart=document.getElementById("hms").innerHTML;
    createUser(userNameV,userStart);
    userHistoric.push(newUser);
    userScoreOr()
    updateList(userHistoric);
    saveLocalStorage()
}

function createUser(name = "default", score = "Currently playing...") {
    console.log(userHistoric)
        newUser = {
        name: name,
        score: score
    };
}

let  userHistoricOr;

function userScoreOr(){
    userHistoricOr = userHistoric.sort(function (a, b) {
        if (a.score > b.score) {
        return 1;
        }
        if (a.score < b.score) {
        return -1;
        }
        // a must be equal to b
        return 0;
    });
}

let userScoresList = document.querySelector("#users-scores-list")

function updateList(items) {
    userScoresList.innerHTML = null;
    items.forEach((i) => {
    createListElement({ name: i.name, score: i.score });
    });
}

function createListElement({ name, score }) {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = "<div id='nameOfUser'>" + name + "</div>" + "<div id='nameOfScore'>" + score + "</div>";
    userScoresList.appendChild(newListItem);
}

function saveLocalStorage(){
    localStorage.setItem(HISTORIC_KEY, JSON.stringify(userHistoric));
}

let clearHistory = document.getElementById("clear-button")
clearHistory.addEventListener("click", historyClearing)

function historyClearing(){
    localStorage.clear()
    updateList(userHistoric)
}

let restartButtonWin = document.getElementById("again-button")
let restartButtonLose = document.getElementById("again-button-lose")
restartButtonWin.addEventListener("click",restartFun)
restartButtonLose.addEventListener("click",restartFun)
let buttons1=document.querySelectorAll(".buttons")

function restartFun(){
    reset();
    loseContainer.classList.add("notShow")
    winContainer.classList.add("notShow")
    mainChoose.classList.remove("notShow")
    wordSplit1.classList.add("invisible");
    wordSplit2.classList.add("invisible");
    wordSplit3.classList.add("invisible");
    wordSplit4.classList.add("invisible");
    wordSplit5.classList.add("invisible");
    wordSplit6.classList.add("invisible");
    wordSplit7.classList.add("invisible");
    wordSplit8.classList.add("invisible");
    wordSplit9.classList.add("invisible");
    wordSplit10.classList.add("invisible");
    easyButton.checked=false;
    mediumButton.checked=false;
    hardButton.checked=false;
    buttons1.forEach(btn=>{
        btn.classList.remove("invisible")
    })
    counterWin=0;
    contadorI=0;
    userName.value="";
    errors.textContent ="";
    hangmanPicturesSrc=hangmanPicturesArray[contadorI]
    hangmanPictures.src=hangmanPicturesSrc;
}


//random words

    //Easy
    var wordsEasy = ['Rock',
    'King',
    'Good'];
var randomEasy = wordsEasy[Math.floor(Math.random()*wordsEasy.length)];

    //Medium
var wordsMedium = [
    'Space',
    'Mouse',
    'Pasta'];
var randomMedium = wordsMedium[Math.floor(Math.random()*wordsMedium.length)];

    //Hard
var wordsHard = [
    'Nightmare',
    'Keyboard',
    'Potatoe'];
var randomHard = wordsHard[Math.floor(Math.random()*wordsHard.length)];

//Choose Difficulty
var easyButton = document.getElementById("easy")
var mediumButton = document.getElementById("medium")
var hardButton = document.getElementById("hard")

easyButton.addEventListener("click", gameEasy)
mediumButton.addEventListener("click", gameMedium)
hardButton.addEventListener("click", gameHard)

var wordGame = document.getElementById("word-guess")
var wordSplit1 = document.getElementById("word-guess-1")
var wordSplit2 = document.getElementById("word-guess-2")
var wordSplit3 = document.getElementById("word-guess-3")
var wordSplit4 = document.getElementById("word-guess-4")
var wordSplit5 = document.getElementById("word-guess-5")
var wordSplit6 = document.getElementById("word-guess-6")
var wordSplit7 = document.getElementById("word-guess-7")
var wordSplit8 = document.getElementById("word-guess-8")
var wordSplit9 = document.getElementById("word-guess-9")
var wordSplit10 = document.getElementById("word-guess-10")

var wordGame1="";
let wordSplit;
let wordSplitcontainer = document.querySelector("#word-split-container")
let wordSplitI;
function wordSplitFun(){
    wordSplit = wordGame1.split("");
for (i in wordSplit){
    wordSplitI = document.createElement("div")
    console.log(wordSplit[i]);
    wordSplitcontainer.appendChild(wordSplitI)
}


    wordSplit1.textContent = wordSplit[0]
    wordSplit2.textContent = wordSplit[1]
    wordSplit3.textContent = wordSplit[2]
    wordSplit4.textContent = wordSplit[3]
    wordSplit5.textContent = wordSplit[4]
    wordSplit6.textContent = wordSplit[5]
    wordSplit7.textContent = wordSplit[6]
    wordSplit8.textContent = wordSplit[7]
    wordSplit9.textContent = wordSplit[8]
    wordSplit10.textContent = wordSplit[9]
}

function gameEasy() {
    wordGame.textContent = (randomEasy)
    wordGame1 = wordGame.textContent
    wordSplitFun()
}
function gameMedium() {
    wordGame.textContent = (randomMedium)
    wordGame1=wordGame.textContent
    wordSplitFun()
}
function gameHard() {
    wordGame.textContent = (randomHard)
    wordGame1=wordGame.textContent;
    wordSplitFun()
}

//counter to win or loose
let counterWin = 0;
const winContainer = document.getElementById("youWinContainer")
const loseContainer = document.getElementById("youLoseContainer")
function WinOrLooseFun(){
    if(counterWin>=wordSplit.length){
        mainGame.classList.add("notShow")
        winContainer.classList.remove("notShow")
        assignName();
        stop();
        removeButtons()
    }
    if(contadorI>=6){
        mainGame.classList.add("notShow")
        loseContainer.classList.remove("notShow")
        removeButtons()
    }
    return;
}


//Buttons

let buttons = document.querySelectorAll("#all-buttons");

buttons.forEach(btn => {
    btn.addEventListener("click",(e)=> {
        if (e.target.matches(".buttons")){
            buttonValue=e.target.innerText;
            console.log(wordSplit)
            if(wordSplit.includes(buttonValue)||wordSplit.includes(buttonValue.toLowerCase())){
                //hangmanPictures.src=hangmanPicturesSrc;
                e.target.classList.add("invisible");
                console.log("yes")
                for (i in wordSplit){
                    if(wordSplit[i]==buttonValue||wordSplit[i]==buttonValue.toLowerCase()){
                        //e.target.classList.add("invisible");
                        switch (i) {
                            case "0":
                                wordSplit1.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "1":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "2":
                                wordSplit3.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "3":
                                wordSplit4.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "4":
                                wordSplit5.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "5":
                                wordSplit6.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "6":
                                wordSplit7.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "7":
                                wordSplit8.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "8":
                                wordSplit9.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "9":
                                wordSplit10.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "10":
                                wordSplit11.classList.remove("invisible");
                                counterWin++;
                                break;
                        }
                       // return; lo quito por si se repite la letra
                    }
                }
            }else{
                e.target.classList.add("invisible");
                hangmanPicturesArraySum()
                hangmanPictures.src=hangmanPicturesSrc;
            }
        }
        WinOrLooseFun()
    })
});

//array de imagenes
let contadorI=0;
const hangmanPictures=document.querySelector("#hangman-pictures")
let hangmanPicturesArray=["assets/hangman - 1.png","assets/hangman - 2.png","assets/hangman - 3.png","assets/hangman - 4.png","assets/hangman - 5.png","assets/hangman - 6.png","assets/hangman - 7.png"]
let hangmanPicturesSrc=hangmanPicturesArray[contadorI]
hangmanPictures.src=hangmanPicturesSrc;

function hangmanPicturesArraySum(){
    contadorI++;
    hangmanPicturesSrc=hangmanPicturesArray[contadorI];
}


//CREATE BUTTONS
let btnbtn;

function createButtons() {
    btnbtn = document.createElement("div")
    btnbtn.innerHTML = '<button class="buttons" id="button-A">A</button><button class="buttons" id="button-B">B</button><button class="buttons" id="button-C">C</button><button class="buttons" id="button-D">D</button><button class="buttons" id="button-E">E</button><button class="buttons" id="button-F">F</button><button class="buttons" id="button-G">G</button><button class="buttons" id="button-H">H</button><button class="buttons" id="button-I">I</button><button class="buttons" id="button-J">J</button><button class="buttons" id="button-K">K</button><button class="buttons" id="button-L">L</button><button class="buttons" id="button-M">M</button><button class="buttons" id="button-N">N</button><button class="buttons" id="button-Ñ">Ñ</button><button class="buttons" id="button-O">O</button><button class="buttons" id="button-P">P</button><button class="buttons" id="button-Q">Q</button><button class="buttons" id="button-R">R</button><button class="buttons" id="button-S">S</button><button class="buttons" id="button-T">T</button><button class="buttons" id="button-U">U</button><button class="buttons" id="button-V">V</button><button class="buttons" id="button-W">W</button><button class="buttons" id="button-X">X</button><button class="buttons" id="button-Y">Y</button><button class="buttons" id="button-Z">Z</button>'
    buttons40.appendChild(btnbtn)
}

function removeButtons(){
    buttons40.removeChild(btnbtn)
}

// var element;

// function elem(type, elemID, elemClass) {
//     element = document.createElement(type)
//     if(elemID != null) element.setAttribute("id", elemID)
//     if(elemClass != null) element.setAttribute("class", elemClass)
//     return element
// }

// function createButtons() {
//                     [elem("button", "button-A", "buttons"),
//                     elem("button", "button-B", "buttons"),
//                     elem("button", "button-C", "buttons"),
//                     elem("button", "button-D", "buttons"),
//                     elem("button", "button-E", "buttons"),
//                     elem("button", "button-F", "buttons"),
//                     elem("button", "button-G", "buttons"),
//                     elem("button", "button-H", "buttons"),
//                     elem("button", "button-I", "buttons"),
//                     elem("button", "button-J", "buttons"),
//                     elem("button", "button-K", "buttons"),
//                     elem("button", "button-L", "buttons"),
//                     elem("button", "button-M", "buttons"),
//                     elem("button", "button-N", "buttons"),
//                     elem("button", "button-O", "buttons"),
//                     elem("button", "button-P", "buttons"),
//                     elem("button", "button-Q", "buttons"),
//                     elem("button", "button-R", "buttons"),
//                     elem("button", "button-S", "buttons"),
//                     elem("button", "button-T", "buttons"),
//                     elem("button", "button-U", "buttons"),
//                     elem("button", "button-V", "buttons"),
//                     elem("button", "button-W", "buttons"),
//                     elem("button", "button-X", "buttons"),
//                     elem("button", "button-Y", "buttons"),
//                     elem("button", "button-Z", "buttons"),
// ]
//     buttons.appendChild(element)
// }

//Click Button
// function clickButton {
//     if(!$(mainGame).hasClass("notShow")){
//     for (i=0; i<buttons1; i++){
//         buttons1[i].addEventListener("keydown", clicking()){

//         }}

//     else {buttons1[i].removeEventListener}
// }

//NUMS PAD
//function numsPad(){
//         window.addEventListener("keydown", (e) => {
//             if(mainGame.matches("notShow")==false){
//                 if (
//                 e.key === "a" ||
//                 e.key === "b" ||
//                 e.key === "c" ||
//                 e.key === "d" ||
//                 e.key === "e" ||
//                 e.key === "f" ||
//                 e.key === "g" ||
//                 e.key === "h" ||
//                 e.key === "i" ||
//                 e.key === "j" ||
//                 e.key === "k" ||
//                 e.key === "l" ||
//                 e.key === "m" ||
//                 e.key === "n" ||
//                 e.key === "ñ" ||
//                 e.key === "o" ||
//                 e.key === "p" ||
//                 e.key === "q" ||
//                 e.key === "r" ||
//                 e.key === "s" ||
//                 e.key === "t" ||
//                 e.key === "u" ||
//                 e.key === "v" ||
//                 e.key === "w" ||
//                 e.key === "x" ||
//                 e.key === "y" ||
//                 e.key === "z"
//                 ) {
//                 clickButtonEl(e.key);
//                 }
//             }
//         });
// // //}


// function keyPadRemove(){
//     window.removeEventListener("keydown", (e))
//     console.log("eliminado")
// }

// function clickButtonEl(key) {
//     buttons1.forEach((button) => {
//         if(mainGame.matches("notShow")==false){
//             if (button.innerText === key.toUpperCase()) {
//                 console.log(key.toUpperCase());
//                 button.click();
//             }
//         }
//     });
// }
// function clickOperation(key) {
//     operator.forEach((operation) => {
//     if (operation.innerText === key) {
//         operation.click();
//     }
//     });
// }
// function clickEqual() {
//     equal.click();
// }




// const HISTORIC_KEY = "historic";

// let usersList = document.getElementById("historicList");
// let btnAdd = document.getElementById("btnAdd");

// let historicList = [];

// window.onload = (e) => {
//   initDOMRefs();
//   historicList = [];

//   if (localStorage.getItem(HISTORIC_KEY) !== null) {
//     historicList = JSON.parse(localStorage.getItem(HISTORIC_KEY));
//     updateList(historicList);
//   }
// };

// function initDOMRefs() {
//   usersList = document.getElementById("historicList");
//   btnAdd = document.getElementById("btnAdd");
//   btnAdd.addEventListener("click", (e) => {
//     addNewUser();
//   });
// }

// function createListElement({ username, score }) {
//   const newListItem = document.createElement("li");
//   newListItem.innerText = "Username: " + username + "\nScore: " + score;
//   usersList.appendChild(newListItem);
// }

// function updateList(items) {
//   usersList.innerHTML = null;
//   items.forEach((i) => {
//     createListElement({ username: i.username, score: i.score });
//   });
// }

// function addNewUser() {
//   const newUser = { username: "John", score: 100 };
//   historicList.push(newUser);
//   updateList(historicList);
//   localStorage.setItem(HISTORIC_KEY, JSON.stringify(historicList));
// }

//RANKING

// let ranking1=document.querySelector("#ranking-1");
// let ranking2=document.querySelector("#ranking-2");
// let ranking3=document.querySelector("#ranking-3");
// let ranking4=document.querySelector("#ranking-4");

// let ranking1Time=document.querySelector("#ranking-1-time");
// let ranking2Time=document.querySelector("#ranking-2-time");
// let ranking3Time=document.querySelector("#ranking-3-time");
// let ranking4Time=document.querySelector("#ranking-4-time");


// function printScore(){
//     userScoreOr();
//     ranking1.innerText=userHistoric[0].name;
//     ranking1Time.innerText=userHistoric[0].score;
//     ranking2.innerText=userHistoric[1].name;
//     ranking2Time.innerText=userHistoric[1].score;
//     ranking3.innerText=userHistoric[2].name;
//     ranking3Time.innerText=userHistoric[2].score;
//     ranking4.innerText=userHistoric[3].name;
//     ranking4Time.innerText=userHistoric[3].score;
// }

//userHistoric.push(newUser);
