
const colourBlue = "blue";
const colourRed = "red";
var whomest = "White"; 

// Starts the Game here
init();

function init() {
    board();
    settingUpBoard();
    displayWhoTurnItIs(whomest);
}
// Creates the chessboard base here 
function board(){
    var main = document.createElement('div');
    main.setAttribute('class', 'main');
    main.setAttribute('style', '   display: grid;   justify-content: center;   align-content: center;')
    document.body.appendChild(main);
    var container = document.createElement('div');
    container.setAttribute('class','container');
    container.setAttribute('style','font-size: 0; --grid-cols:8; --grid-rows:8; display: grid; grid-template-rows: repeat(var(--grid-rows), 100px); grid-template-columns: repeat(var(--grid-cols), 100px); text-align: center;');
    main.appendChild(container);
    for (let j = 8; j > 0; j--) { // Y
        var boardCell = document.createElement('div');
        for (let i = 1; i < 9; i++) { // X
            var boardCell = document.createElement('div');
            boardCell.setAttribute('class', 'grid-item '+i+','+j);
            boardCell.setAttribute('id',i+','+j);
            // makes the checkerboard pattern
            if (j % 2) {
                if (i % 2){
                    setDivStyleEven(boardCell);
                }
                else{
                    setDivStyleOdd(boardCell);
                }
            }
            else {
                if (i % 2){
                    setDivStyleOdd(boardCell);
                }
                else{
                    setDivStyleEven(boardCell);
                }
            }
            boardCell.innerHTML += "";
            container.appendChild(boardCell);
        }
    }

}
// this for the style of the div-cells in the board
function setDivStyleOdd(params) {
    params.setAttribute('style', 'background-color: lightgreen; padding: 0px; height: 100px; width: 100px;');
}
function setDivStyleEven(params) {
    params.setAttribute('style', 'background-color: green; padding: 0px; height: 100px; width: 100px;');
}

// logic for putting the img-element of the chess pieces onto the board
function settingUpBoard() {
    for (let i = 1; i < 9; i++) {
        setupAnyPiece(i+',2','Pawn','White');
        setupAnyPiece(i+',7','Pawn','Black');
    }
    setupAnyPiece('1,1','Rook','White');
    setupAnyPiece('8,1','Rook','White');
    setupAnyPiece('1,8','Rook','Black');
    setupAnyPiece('8,8','Rook','Black');
    setupAnyPiece('2,1','Knight','White');
    setupAnyPiece('2,8','Knight','Black');
    setupAnyPiece('7,1','Knight','White');
    setupAnyPiece('7,8','Knight','Black');
    setupAnyPiece('3,1','Bishop','White');
    setupAnyPiece('3,8','Bishop','Black');
    setupAnyPiece('6,1','Bishop','White');
    setupAnyPiece('6,8','Bishop','Black');
    setupAnyPiece('4,1','Queen','White');
    setupAnyPiece('4,8','Queen','Black');
    setupAnyPiece('5,1','King','White');
    setupAnyPiece('5,8','King','Black');
}

// spawn any piece, of both colors, anywhere
function setupAnyPiece(coor, piece, colour) {
    var tet = document.getElementById(coor);
    var test = document.createElement('img');
    var link = piece+"_"+colour;
    test.setAttribute('src','lib/img/'+link+'_Chess_Piece.png');
    test.setAttribute('id', link);
    test.setAttribute('class', 'gamePiece '+colour);
    test.setAttribute('style','max-width: 100px; max-height: 100px;');
    test.setAttribute('onclick', 'clickPiece("'+coor+'","'+piece+'","'+colour+'")');
    tet.appendChild(test);
}

// switch for checking what rules the piece has
function clickPiece(coor, piece, colour) {

    if (canYouMave(colour) && stopMovementTilChoosen()) {
        removeLegalMoves();
        switch(piece) {
            case 'Pawn':
                pawnMoves(coor, colour);
                break;
            case 'Rook':
                rookMoves(coor, colour);
                break;
            case 'Bishop':
                bishopMoves(coor, colour);
                break;
            case 'Knight':
                knightMoves(coor, colour);
                break;
            case 'Queen':
                queenMoves(coor, colour);
                break;
            case 'King':
                checkIfkingCouldDieIfMoved(coor, colour);
                break;
            default:
        }
    }
    
}

// movement
function pawnMoves(coor, colour) {
    if (colour == 'White') {
        if (coor[2] == '2') {
            nMovement(coor,2,colour);
            pawnAttackN(coor, colour);
        }
        else{
            nMovement(coor,1,colour);
            pawnAttackN(coor, colour);
        }
    }
    else{
        if (coor[2] == '7') {
            sMovement(coor,2,colour);
            pawnAttackS(coor, colour);
        }
        else{
            sMovement(coor,1,colour);
            pawnAttackS(coor, colour);
        }
    }
}
function rookMoves(coor, colour){
    nMovement(coor,Number(8-coor[2]),colour);
    eMovement(coor,Number(8-coor[0]),colour);
    sMovement(coor,Number(coor[2]-1),colour);
    wMovement(coor,Number(coor[0]-1),colour);
}
function bishopMoves(coor, colour){
    neMovement(coor, findShortestLine(coor, 'ne'), colour);
    seMovement(coor, findShortestLine(coor, 'se'), colour);
    nwMovement(coor, findShortestLine(coor, 'nw'), colour);
    swMovement(coor, findShortestLine(coor, 'sw'), colour);
}
function knightMoves(coor, colour){
    knigthMovementN(coor,colour);
    knigthMovementE(coor,colour);
    knigthMovementS(coor,colour);
    knigthMovementW(coor,colour);
}
function queenMoves(coor, colour){
    nMovement(coor,Number(8-coor[2]),colour);
    eMovement(coor,Number(8-coor[0]),colour);
    sMovement(coor,Number(coor[2]-1),colour);
    wMovement(coor,Number(coor[0]-1),colour);
    neMovement(coor, findShortestLine(coor, 'ne'), colour);
    seMovement(coor, findShortestLine(coor, 'se'), colour);
    nwMovement(coor, findShortestLine(coor, 'nw'), colour);
    swMovement(coor, findShortestLine(coor, 'sw'), colour);
}
function kingMoves(coor, colour){
    nMovement(coor, coor[2] < 8 ? 1 : 0,colour);
    eMovement(coor, coor[0] < 8 ? 1 : 0,colour);
    sMovement(coor, coor[2] > 1 ? 1 : 0,colour);
    wMovement(coor, coor[0] > 1 ? 1 : 0,colour);
    neMovement(coor, findShortestLineKing(coor, 'ne'), colour);
    seMovement(coor, findShortestLineKing(coor, 'se'), colour);
    nwMovement(coor, findShortestLineKing(coor, 'nw'), colour);
    swMovement(coor, findShortestLineKing(coor, 'sw'), colour);
}

/// Movement-logic 
function legalMoveHighlight(origin, coor, colour) {
    var legalDiv = document.getElementById(coor);
    var transDiv = document.createElement('div');
    let style =  'background-color: '+colour+'; opacity: 0.5; height: 100px;';
    if (colour == colourRed) {
        style += 'position: relative; top: -100px;';
    }
    transDiv.setAttribute('style', style);
    transDiv.setAttribute('class','legalmove');
    transDiv.setAttribute('onclick','movePieceToLegal("'+origin+'", "'+coor+'")');
    legalDiv.appendChild(transDiv);
}

function movePieceToLegal(origin, coor) {
    var theOrginalDiv = document.getElementById(origin);
    var theOrginalImage = theOrginalDiv.querySelector('.gamePiece');
    var targerDiv = document.getElementById(coor);
    if (targerDiv.querySelector('.gamePiece') !== null){
        targerDiv.querySelector('.gamePiece').remove();
    }
    var line = theOrginalImage.id.split('_');
    setupAnyPiece(coor,line[0],line[1]);
    theOrginalImage.remove();
    removeLegalMoves();
    switchTurn();
    // The list of checks for statues of the move
    checkIfKingIsDead(line[1]);
    canPawnBePromoted(coor);
}

function removeLegalMoves() {
    var allLegalMoves = document.getElementsByClassName('legalmove');
    allLegalMoves.remove();
}
// returns null if a game piece is the same colour, and true if its opposing
function isThereGamePieceHere(coor, colour){
    var div = document.getElementById(coor);
    if (div.querySelector('.gamePiece') !== null) {
        if (div.querySelector('.'+colour) !== null) {
            return null;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

/// directions a piece can move and the number of steps it has
// n=> North, ne => NorthEast, e => East ect.
function nMovement(coor,steps,colour) {
    if(steps > 0){
        for (let index = 1; index <= steps; index++) {
            let xy = coor[0]+','+Number(Number(coor[2])+index);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function eMovement(coor,steps,colour) {
    if (steps > 0) {
        for (let index = 1; index <= steps; index++) {
            let xy = Number(Number(coor[0])+index)+','+coor[2];
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function sMovement(coor,steps,colour) {
    if(steps > 0){
        for (let index = 1; index <= steps; index++) {
            let xy = coor[0]+','+Number(Number(coor[2])-index);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function wMovement(coor,steps,colour) {
    if(steps > 0){
        for (let index = 1; index <= steps; index++) {
            let xy = Number(Number(coor[0])-index)+','+coor[2];
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function neMovement(coor,steps,colour) {
    if (steps > 0) {
        for (let index = 1; index <= steps; index++) {
            let xy = Number(Number(coor[0])+index)+','+Number(Number(coor[2])+index);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function seMovement(coor,steps,colour) {
    if (steps > 0) {
        for (let index = 1; index <= steps; index++) {
            let xy = Number(Number(coor[0])+index)+','+Number(Number(coor[2])-index);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function swMovement(coor,steps,colour) {
    if (steps > 0) {
        for (let index = 1; index <= steps; index++) {
            let xy = Number(Number(coor[0])-index)+','+Number(Number(coor[2])-index);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
function nwMovement(coor,steps,colour) {
    if (steps > 0) {
        for (let index = 1; index <= steps; index++) {
            let xy = Number(Number(coor[0])-index)+','+Number(Number(coor[2])+index);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
                break;
            }
            if (answer == null) {
                break;
            }
            legalMoveHighlight(coor, xy,colourBlue);
        }
    }
}
// the knights movement strategy 
function knigthMovementN(coor, colour) {
    if (Number(coor[2])+2 <= 8) {
        if (Number(coor[0]) != 1) {
            let xy = Number(Number(coor[0])-1)+','+Number(Number(coor[2])+2);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
        if (Number(coor[0]) != 8) {
            let xy = Number(Number(coor[0])+1)+','+Number(Number(coor[2])+2);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
    }
} 
function knigthMovementE(coor, colour) {
    if (Number(coor[0])+2 <= 8) {
        if (Number(coor[2]) != 1) {
            let xy = Number(Number(coor[0])+2)+','+Number(Number(coor[2])-1);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
        if (Number(coor[2]) != 8) {
            let xy = Number(Number(coor[0])+2)+','+Number(Number(coor[2])+1);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
    }
    
} 
function knigthMovementS(coor, colour) {
    if (Number(coor[2])-2 >= 1) {
        if (Number(coor[0]) != 1) {
            let xy = Number(Number(coor[0])-1)+','+Number(Number(coor[2])-2);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
        if (Number(coor[0]) != 8) {
            let xy = Number(Number(coor[0])+1)+','+Number(Number(coor[2])-2);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
    }
    
} 
function knigthMovementW(coor, colour) {
    if (Number(coor[0])-2 >= 1) {
        if (Number(coor[2]) != 1) {
            let xy = Number(Number(coor[0])-2)+','+Number(Number(coor[2])-1);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
        if (Number(coor[2]) != 8) {
            let xy = Number(Number(coor[0])-2)+','+Number(Number(coor[2])+1);
            let answer = isThereGamePieceHere(xy, colour);
            if (answer == null) { }
            else if (answer) {
                legalMoveHighlight(coor, xy,colourRed);
            } else {
                legalMoveHighlight(coor, xy,colourBlue);
            }
        }
    }
    
}
// the pawns attack move 
function pawnAttackN(coor, colour) {
    if (Number(coor[0]) != 8) {
        let xy = Number(Number(coor[0])+1)+','+Number(Number(coor[2])+1);
        let answer = isThereGamePieceHere(xy, colour);
        if (answer) {
            legalMoveHighlight(coor, xy,colourRed);
        }
    }
    if (Number(coor[0]) != 1) {
        let xy = Number(Number(coor[0])-1)+','+Number(Number(coor[2])+1);
        let answer = isThereGamePieceHere(xy, colour);
        if (answer) {
            legalMoveHighlight(coor, xy,colourRed);
        }
    }
}  
function pawnAttackS(coor, colour) {
    if (Number(coor[0]) != 1) {
        let xy = Number(Number(coor[0])-1)+','+Number(Number(coor[2])-1);
        let answer = isThereGamePieceHere(xy, colour);
        if (answer) {
            legalMoveHighlight(coor, xy,colourRed);
        }
    }
    if (Number(coor[0]) != 8) {
        let xy = Number(Number(coor[0])+1)+','+Number(Number(coor[2])-1);
        let answer = isThereGamePieceHere(xy, colour);
        if (answer) {
            legalMoveHighlight(coor, xy,colourRed);
        }
    }
}

// findes the number of "steps" a piece can take without going off board
function findShortestLine(coor, direction) {
    let steps = 0;
    if (direction == 'ne') {
        if (Number(coor[0]) >= Number(coor[2])){
            steps = 8 - Number(coor[0]);
        } else {
            steps = 8 - Number(coor[2]);
        }
        return steps;
    }
    if (direction == 'nw') {
        if (Number(coor[0]) <= 8 - Number(coor[2])){
            steps = Number(coor[0]) - 1;
        } else {
            steps = 8 - Number(coor[2]);
        }
        return steps;
    }
    if (direction == 'se') {
        if (8 - Number(coor[0]) <= Number(coor[2]) - 1){
            steps = 8 - Number(coor[0]);
        } else {
            steps = Number(coor[2]) - 1;
        }
        return steps;
    }
    if (direction == 'sw') {
        if (Number(coor[0]) <= Number(coor[2]) - 1){
            steps = Number(coor[0]) - 1;
        } else {
            steps = Number(coor[2]) - 1;
        }
        return steps;
    }
    return steps;
}
function findShortestLineKing(coor, direction) {
    let steps = 0;
    if (direction == 'ne') {
        if (Number(coor[0]) != 8 && Number(coor[2]) != 8){
            steps = 1;
        }
        return steps;
    }
    if (direction == 'nw') {
        if (Number(coor[0]) != 1 && Number(coor[2]) != 8){
            steps = 1;
        }
        return steps;
    }
    if (direction == 'se') {
        if (Number(coor[0]) != 8 && Number(coor[2]) != 1){
            steps = 1;
        } 
        return steps;
    }
    if (direction == 'sw') {
        if (Number(coor[0]) != 1 && Number(coor[2]) != 1){
            steps = 1;
        } 
        return steps;
    }
    return steps;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

/// game logic
// Shows who's turn it is
function displayWhoTurnItIs(params) {
    var temp = document.getElementsByTagName('h1')[0];
    temp.innerHTML = "Chess - It's " + params + "'s Turn"; 
} 
function switchTurn() {
    var temp = document.getElementsByTagName('h1')[0];
    if (whomest == "White") {
        whomest = "Black";
    } else {
        whomest = "White";
    }
    temp.innerHTML = "Chess - It's " + whomest + "'s Turn"; 
}
function canYouMave(colour) {
    if (whomest == colour) {
        return true;
    }
    return false;
}
// this checks if the king is dead 
function checkIfKingIsDead(colour) {
    var king = document.getElementById("King_"+whomest);
    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(king) == 'undefined' || king == null){
        if (confirm("Congratulation to " + colour + " for Winning the game.\n Do you wanna play again?") == true) {
            document.getElementsByClassName('main').remove();
            init();
        }
    }
}
// this where it checks if the pawn can be promoted 
function canPawnBePromoted(coor) {
    var pawn = document.getElementById(coor).childNodes;
    if(coor[2] == 8 && pawn[0].id == "Pawn_White"){
        makePawnPromotionList(coor, "White");
    }
    if (coor[2] == 1 && pawn[0].id == "Pawn_Black"){
        makePawnPromotionList(coor, "Black");
    }
}
function makePawnPromotionList(coor, colour) {
    var listDiv = document.createElement('div');
    listDiv.setAttribute('class','listOfChoices');
    listDiv.setAttribute('id','listOfChoices');
    listDiv.setAttribute('style', 'position: fixed; display: inline-grid; background-color: blue;');
    document.getElementById(coor).appendChild(listDiv);
    var array= ["Queen","Bishop","Knight","Rook"];
    array.forEach(element => {
        var choose = document.createElement('img');
        var link = element+"_"+colour;
        choose.setAttribute('src','lib/img/'+link+'_Chess_Piece.png');
        choose.setAttribute('style','max-width: 50px; max-height: 50px;');
        choose.setAttribute('class','gamePiece');
        choose.setAttribute('onclick','changePawnToo("'+link+'","'+coor+'")');
        listDiv.appendChild(choose);
    });
}
function changePawnToo(gamePiece, coor) {
    var oldPiecePlace = document.getElementById(coor);
    var oldPiece = oldPiecePlace.querySelector('.gamePiece');
    var array = gamePiece.split('_');
    oldPiece.remove();
    document.getElementsByClassName('listOfChoices').remove();
    setupAnyPiece(coor,array[0],array[1]);
}
function stopMovementTilChoosen() {
    var list = document.getElementById("listOfChoices");
    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(list) == 'undefined' || list == null){
        return true;
    } else {
        return false;
    }
}
// this will remove any tile i the kings movement options, if a opponent can see that tile
// this function might be chooped up in the future
function checkIfkingCouldDieIfMoved(coor, colour) {
    // what colour is our king and what is the enemy
    let enemy = "";
    if (colour == "White") {
        enemy = "Black";
    } else {
        enemy = "White";
    }
    // run all of the enemies posible moves
    var enemyArray = document.getElementsByClassName(enemy);
    for (let index = 0; index < enemyArray.length; index++) {
        let piece = enemyArray[index].id.split('_');
        gamePieceSwitch(piece[0], enemyArray[index].parentElement.id, enemy);
    }
    // runs our kings moves
    kingMoves(coor, colour);
    // finds the coordinates that overlap and adds them to an array then remove all highlights
    var noGoZones = [];
    for (let Y = -1; Y <= 1; Y++) {
        for (let X = -1; X <= 1; X++) {
            var XY = Number(X+Number(coor[0]))+','+Number(Y+Number(coor[2]));
            var div = document.getElementById(XY);
            if (div.querySelectorAll('.legalmove').length > 1) {
                noGoZones.push(XY);
            }
        }
    }
    removeLegalMoves();
    // with the array we run king again and now we only remove the highlights in array
    kingMoves(coor, colour);
    for (noGo of noGoZones) {
        document.getElementById(noGo).querySelectorAll('.legalmove').remove();
    }
}
function gamePieceSwitch(piece, coor, colour) {
    switch(piece) {
        case 'Pawn':
            pawnMoves(coor, colour);
            break;
        case 'Rook':
            rookMoves(coor, colour);
            break;
        case 'Bishop':
            bishopMoves(coor, colour);
            break;
        case 'Knight':
            knightMoves(coor, colour);
            break;
        case 'Queen':
            queenMoves(coor, colour);
            break;
        case 'King':
            kingMoves(coor, colour);
            break;
        default:
    }
}