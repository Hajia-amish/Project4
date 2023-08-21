const tiles = document.querySelectorAll(".tile");
const PLAYER_X ="x";
const PLAYER_0 ="0";
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);
console.log(boardState)

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const  gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

//sounds
const gameOverSound = new Audio("sounds/game_Over.war");
const Click =new Audio("sounds/click.war");


tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText(){
    //remove all hover text
    tiles.forEach((tiles) => {
    tiles.classList.remove("x-hover");
    tiles.classList.remove("o-hover");  
    });
    const hoverClass =  `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    })
}
 
function tileClick(event) {
    if (gameOverArea.classList.contains("visible"))  {
        return;
    }

const tile = event.target;
const tileNumber = tile.dataset.index;

if(tile.innerText !="")  {
    return;
}

if (turn === PLAYER_X){
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_0;
}

else {
    tile.innerText = PLAYER_0;
    boardState[tileNumber - 1] = PLAYER_0;
    turn = PLAYER_X;

}

    // clickSound.play();
setHoverText();
checkWinner();

}

function checkWinner(){
    //Check for a winner
    for (const winnerCombination of winnerCombinations){
        //object Destructuring
        // console.log(winnerCombination);
        const {combo, strikeClass } = winnerCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if(tileValue1 != null &&
             tileValue1 === tileValue2 && 
             tileValue1 === tileValue3    
         ) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
         }  

    }
    //Check for a draw
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if (allTileFilledIn){
        gameOverScreen(null);
    }
}
function gameOverScreen(winnerText){
    let text = 'Draw!'
    if(winnerText != null){
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    gameOverSound.play();
}


function startNewGame(){
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PLAYER_X ;
    setHoverText();
}



const winnerCombinations = [
    // rows
    { combo: [1 ,2, 3], strikeClass: "strike-row-1" },
    { combo: [4 ,5, 6], strikeClass: "strike-row-1" },
    { combo: [7 ,8, 9], strikeClass: "strike-row-1" },

    //columns
    { combo: [1 ,2, 3], strikeClass: "strike-column-1" },
    { combo: [4 ,5, 6], strikeClass: "strike-column-2" },
    { combo: [7 ,8, 9], strikeClass: "strike-column-3" },

    //diagonals
    { combo: [1 ,2, 3], strikeClass: "strike-diagonal-1" },
    { combo: [4 ,5, 6], strikeClass: "strike-diagonal-2" },

];




