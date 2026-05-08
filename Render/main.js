import * as piece from "../data/pieces.js"
import { getSquare } from "../Helper/commonHelper.js";
import { RootDiv, globalState } from "../Helper/constants.js";

// change Game State
function moveElement(from, to){
    const fromSquare = getSquare(from);
    const toSquare = getSquare(to);

    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;

    toSquare.piece.curr_position = to;
    renderSquare(from);
    renderSquare(to);
}

// moves piece from one square to another
function renderSquare(squareid){
    const square = getSquare(squareid) // curr in gamestate
    const squareEl = document.getElementById(squareid) // curr in html

    // remove the old html
    squareEl.innerHTML = "";
    if(square.piece){
        const img = document.createElement("img")
        img.src = square.piece.img;
        img.classList.add("piece")
        squareEl.appendChild(img)
    }

}

// highlight the clicked  piece
function MakeSquareYellow(id){
    document.getElementById(id).classList.add("highlightYellow");
}

// dehighlight the previously clicked piece
function removeYellowSquare(id){
    if(id){
        document.getElementById(id).classList.remove("highlightYellow");
    }
}

function pieceRender(data){
    data.forEach(row => {
        row.forEach(square => {
     // if square has piece
        if (square.piece){
            const squareEl = document.getElementById(square.id);
            //create piece
            const piece = document.createElement("img")
            piece.src = square.piece.img;
            piece.classList.add("piece")
            // insert piece into square
            squareEl.appendChild(piece);
        }
    })
 })
}

// when u want to render the game for the first time 
function initGameRender(data){
  data.forEach((element)=>{
    // create a div for each row,
    const rowEL = document.createElement("div")
    element.forEach((square)=>{
      const squareEL = document.createElement("div")
      squareEL.classList.add(square.color, "square")
      squareEL.id = square.id
        // Black pieces
        if(square.id[1] == 7){
            square.piece = piece.BlackPawn(square.id)
        }
        if(square.id == "a8" || square.id == "h8"){
            square.piece = piece.BlackRook(square.id)
        }
        if(square.id == "b8" || square.id == "g8"){
            square.piece = piece.Blackknight(square.id)
        }
        if(square.id == "c8" || square.id == "f8"){
            square.piece = piece.BlackBishop(square.id)
        }
        if(square.id == "d8"){
            square.piece = piece.BlackQueen(square.id)
        }
        if(square.id == "e8"){
            square.piece = piece.BlackKing(square.id)
        }
        // white pieces
        if(square.id[1] == 2){
            square.piece = piece.WhitePawn(square.id);
        }
        if(square.id == "a1" || square.id == "h1"){
            square.piece = piece.WhiteRook(square.id)
        }
        if(square.id == "b1" || square.id == "g1"){
            square.piece = piece.WhiteKnight(square.id)
        }
        if(square.id == "c1" || square.id == "f1"){
            square.piece = piece.WhiteBishop(square.id)
        }
        if(square.id == "d1"){
            square.piece = piece.WhiteQueen(square.id)
        }
        if(square.id == "e1"){
            square.piece = piece.WhiteKing(square.id)
        }
      rowEL.appendChild(squareEL)
})
    rowEL.classList.add("squareRow")
    RootDiv.appendChild(rowEL)
  })
  pieceRender(data)
}

// render highlight circle
function renderHighlight(squareId, type){
    const hightlightsquare = document.getElementById(squareId)
    hightlightsquare.classList.add(type)
}

// clear all highlights from the board
function clearHighlight(){
    const moveSquares = document.querySelectorAll(".move");
    moveSquares.forEach(el => {
        el.classList.remove("move");
    });
    const captureSquares = document.querySelectorAll(".capture");
    captureSquares.forEach(el => {
        el.classList.remove("capture");
    })
}


export{initGameRender, renderHighlight, clearHighlight, MakeSquareYellow, removeYellowSquare, moveElement}