import { RootDiv, globalState } from "../Helper/constants.js";
import { renderHighlight, clearHighlight, moveElement, MakeSquareYellow, removeYellowSquare, whichPieceExist } from "../Render/main.js";
import { checkPieceOfOpponenentOnElement, getSquare } from "../Helper/commonHelper.js";

// highlight or not => state
let highlight_state = false

// current self highlight square state
let selfHighlightState = null

// in move state or not
let moveState = null;


const PossibleMoves = []

let CurrentHighlighted = null;
let SelectedPiece = null;


function GeneratePawnMoves(squareid, color){
    const direction = color === "White" ? 1 : -1;
    const initialRank = color === "White" ? 2 : 7
    const enemyColor = color === "White" ? "Black" : "White"

    // clear old highlights + moves
    clearHighlight();


    PossibleMoves.length = 0;

    const file = squareid[0];
    const rank = Number(squareid[1]);

    const oneStep = `${file}${rank + direction}`;
    const twoStep = `${file}${rank + direction + direction}`;

    const leftCapture =
        `${String.fromCharCode(file.charCodeAt(0) - 1)}${rank + direction}`;

    const rightCapture =
        `${String.fromCharCode(file.charCodeAt(0) + 1)}${rank + direction}`;

    if (!whichPieceExist(oneStep)) {
        PossibleMoves.push({id: oneStep, type: "move"});

        // initial double move
        if (rank === initialRank && !whichPieceExist(twoStep)) {
            PossibleMoves.push({id: twoStep, type: "move"});
        }
    }

    [leftCapture, rightCapture].forEach(el => {

        const piece = whichPieceExist(el);

        if (piece && piece.color === enemyColor) {
            PossibleMoves.push({id: el, type: "capture"});
        }
    });

    PossibleMoves.forEach(el => {
        renderHighlight(el.id, el.type);
    });
}

function GlobalEvent(){

    RootDiv.addEventListener("click", function(event){

        // available clicks: img, square, pseudo elements like move capture
        const ClickedON = event.target.closest(".square")?.id;
        if(!ClickedON) return; // just to avoid any exceptions

        const clickedPiece = whichPieceExist(ClickedON); // can be null or a piece

        // if a piece is already selected check if the clicked square is one of the possible moves: call moveElement

        if(CurrentHighlighted && PossibleMoves.some(move => move.id === ClickedON)){
            moveElement(CurrentHighlighted, ClickedON);

            clearHighlight();
            removeYellowSquare(CurrentHighlighted);
            CurrentHighlighted = null;
            SelectedPiece = null;
            PossibleMoves.length = 0;
            return;
        }
        // if the squares are not one of the possible moves and no piece is selected
        else if (CurrentHighlighted && !clickedPiece){
            clearHighlight();
            removeYellowSquare(CurrentHighlighted);
            CurrentHighlighted = null;
            SelectedPiece = null;
            PossibleMoves.length = 0;
            return;
        }

        //  we click on a new piece 
        else if(clickedPiece){
            // check if any other piece was selected
            if(CurrentHighlighted){
                removeYellowSquare(CurrentHighlighted)
                clearHighlight();
            }
            // make the current piece selected
            CurrentHighlighted = ClickedON;
            MakeSquareYellow(ClickedON);
            SelectedPiece = clickedPiece;
            PossibleMoves.length = 0;

            // white pawn logic
            if(clickedPiece.piece_name === "WhitePawn"){
                GeneratePawnMoves(ClickedON, "White");
            }
            else if(clickedPiece.piece_name === "BlackPawn"){
                GeneratePawnMoves(ClickedON, "Black")
            }
        }
        
    });
}

export { GlobalEvent };