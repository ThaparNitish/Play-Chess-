import { RootDiv, globalState } from "../Helper/constants.js";
import { renderHighlight, clearHighlight, moveElement, MakeSquareYellow, removeYellowSquare, whichPieceExist } from "../Render/main.js";
import { checkPieceOfOpponenentOnElement } from "../Helper/commonHelper.js";

// highlight or not => state
let highlight_state = false

// current self highlight square state
let selfHighlightState = null

// in move state or not
let moveState = null;

const MoveableSquares = [];
const CaptureableSquares = [];

let CurrentHighlighted = null;
let SelectedPiece = null;


function WhitePawnClicked(squareid){

    // clear old highlights + moves
    clearHighlight();

    MoveableSquares.length = 0;
    CaptureableSquares.length = 0;

    const file = squareid[0];
    const rank = Number(squareid[1]);

    // forward moves
    const oneStep = `${file}${rank + 1}`;
    const twoStep = `${file}${rank + 2}`;

    // capture moves
    const leftCapture =
        `${String.fromCharCode(file.charCodeAt(0) - 1)}${rank + 1}`;

    const rightCapture =
        `${String.fromCharCode(file.charCodeAt(0) + 1)}${rank + 1}`;

    if (!whichPieceExist(oneStep)) {

        MoveableSquares.push(oneStep);

        // initial double move
        if (rank === 2 && !whichPieceExist(twoStep)) {
            MoveableSquares.push(twoStep);
        }
    }

    [leftCapture, rightCapture].forEach(el => {

        const piece = whichPieceExist(el);

        if (piece && piece.includes("Black")) {
            CaptureableSquares.push(el);
        }
    });

    MoveableSquares.forEach(el => {
        renderHighlight(el, "move");
    });

    CaptureableSquares.forEach(el => {
        renderHighlight(el, "capture");
    });
}

function BlackPawnClicked(squareid){

    // clear old highlights + moves
    clearHighlight();

    MoveableSquares.length = 0;
    CaptureableSquares.length = 0;

    const file = squareid[0];
    const rank = Number(squareid[1]);

    // forward moves
    const oneStep = `${file}${rank - 1}`;
    const twoStep = `${file}${rank - 2}`;

    // capture moves
    const leftCapture =
        `${String.fromCharCode(file.charCodeAt(0) - 1)}${rank - 1}`;

    const rightCapture =
        `${String.fromCharCode(file.charCodeAt(0) + 1)}${rank - 1}`;

    if (!whichPieceExist(oneStep)) {

        MoveableSquares.push(oneStep);

        // initial double move
        if (rank === 7 && !whichPieceExist(twoStep)) {
            MoveableSquares.push(twoStep);
        }
    }

    [leftCapture, rightCapture].forEach(el => {

        const piece = whichPieceExist(el);

        if (piece && piece.includes("White")) {
            CaptureableSquares.push(el);
        }
    });

    MoveableSquares.forEach(el => {
        renderHighlight(el, "move");
    });

    CaptureableSquares.forEach(el => {
        renderHighlight(el, "capture");
    });
}

function GlobalEvent(){

    RootDiv.addEventListener("click", function(event){

        // available clicks: img, square, pseudo elements like move capture
        const ClickedON = event.target.closest(".square")?.id;

        if(!ClickedON) return;

        const clickedPiece = whichPieceExist(ClickedON);
        // piece: captureable 
        if(CaptureableSquares.includes(ClickedON)){

        const pieceObj = globalState
            .flat()
            .find(el => el.id === CurrentHighlighted).piece;

        moveElement(pieceObj, ClickedON);

        clearHighlight();

        removeYellowSquare(CurrentHighlighted);

        CurrentHighlighted = null;
        SelectedPiece = null;

        MoveableSquares.length = 0;
        CaptureableSquares.length = 0;

        return;
    }

        // when any piece is clicked
        if(clickedPiece){

            // same piece clicked twice
            if(CurrentHighlighted === ClickedON){

                removeYellowSquare(CurrentHighlighted);

                clearHighlight();

                CurrentHighlighted = null;
                SelectedPiece = null;

                return;
            }

            // remove old highlight
            if(CurrentHighlighted){
                removeYellowSquare(CurrentHighlighted);
            }

            // select new piece
            CurrentHighlighted = ClickedON;

            MakeSquareYellow(ClickedON);

            SelectedPiece = clickedPiece;

            // white pawn logic
            if(clickedPiece === "WhitePawn"){
                WhitePawnClicked(ClickedON);
            }
            else if(clickedPiece === "BlackPawn"){
                BlackPawnClicked(ClickedON)
            }
        }

        // clicked on a empty square
        else{

            // valid move
            if(
                MoveableSquares.includes(ClickedON) ||
                CaptureableSquares.includes(ClickedON)
            ){

                const pieceObj = globalState
                    .flat()
                    .find(el => el.id === CurrentHighlighted).piece;

                moveElement(pieceObj, ClickedON);
            }

            clearHighlight();

            removeYellowSquare(CurrentHighlighted);

            CurrentHighlighted = null;
            SelectedPiece = null;

            MoveableSquares.length = 0;
            CaptureableSquares.length = 0;
        }
    });
}

export { GlobalEvent };