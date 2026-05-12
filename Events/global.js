import { RootDiv, globalState } from "../Helper/constants.js";
import { renderHighlight, clearHighlight, moveElement, MakeSquareYellow, removeYellowSquare, RenderPossibleMoves } from "../Render/main.js";
import {getSquare, whichPieceExist, switchTurn } from "../Helper/commonHelper.js";
import {updateKingSquare, findKingSquare} from "../Helper/King.js"
import {recordMove } from "../Helper/moveHistory.js";
import { isSquareUnderAttack, filterLegalMoves } from "../Helper/legalMoves.js";


let PossibleMoves = []
let CurrentTurn = "White"
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

    PossibleMoves = filterLegalMoves(squareid, PossibleMoves, color)
}

function GenerateBishopMoves(squareid, color){
    clearHighlight()
    PossibleMoves.length = 0;
    const enemyColor = color === "White"? "Black": "White";

    const directions = [
        [1,1],   // right++
        [-1,1],  // left++
        [1,-1],  // right--
        [-1,-1], // left--
    ]

    for(const[fileDirection, rankDirection] of directions){
        let file = squareid[0].charCodeAt(0); // currFile
        let rank = Number(squareid[1]); // currRow

        while(true){
            file += fileDirection;
            rank += rankDirection
        
            // boundary
            if (file < "a".charCodeAt(0) || file > "h".charCodeAt(0) || rank < 1 || rank > 8){
                break;
            }

            const targetSquare = `${String.fromCharCode(file)}${rank}`;
            const piece = whichPieceExist(targetSquare);

            // empty square add to Possible moves
            if(piece == null){
                PossibleMoves.push({
                    id: targetSquare,
                    type: "move"
                });

                continue;
            }

            // piece found move in different direction
            if(piece.color === enemyColor){
                PossibleMoves.push({
                    id: targetSquare,
                    type: "capture"
                });
            }
            break;
        }
    }
    PossibleMoves = filterLegalMoves(squareid, PossibleMoves, color)
}

function GenerateRookMoves(squareid, color){
    clearHighlight()
    PossibleMoves.length = 0;
    const enemyColor = color === "White" ? "Black" : "White";

    const directions = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1]
    ]

    for(const[fileDirection, rankDirection] of directions){
        let file = squareid[0].charCodeAt(0);
        let rank = Number(squareid[1]);

        while(true){
            file += fileDirection
            rank += rankDirection

            // set boundary
            if(file < "a".charCodeAt(0) || file > "h".charCodeAt(0) || rank < 1 || rank > 8){
                break;
            }

            const targetSquare = `${String.fromCharCode(file)}${rank}`
            const piece = whichPieceExist(targetSquare)

            if (piece == null){
                PossibleMoves.push({
                    id: targetSquare,
                    type: "move"
                })
                continue;
            }

            if(piece.color == enemyColor){
                PossibleMoves.push({
                    id: targetSquare,
                    type: "capture"
                })
            }
            break;
        }
    }
    PossibleMoves = filterLegalMoves(squareid, PossibleMoves, color)
}

function GenerateQueenMoves(squareid, color){
    clearHighlight();
    PossibleMoves.length = 0;
    const enemyColor = color === "White"? "Black" : "White"

    const directions = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1],
        [1,1],
        [-1,1],  
        [1,-1],  
        [-1,-1],
    ]

    for (const[fileDirection, rankDirection] of directions){
        let file = squareid[0].charCodeAt(0);
        let rank = Number(squareid[1])

        while(true){
            file += fileDirection;
            rank += rankDirection;

            if(file < "a".charCodeAt(0) || file > "h".charCodeAt(0) || rank < 1 || rank > 8){
                break;
            }

            const targetSquare = `${String.fromCharCode(file)}${rank}`;
            const piece = whichPieceExist(targetSquare);

            if(piece == null){
                PossibleMoves.push({
                    id: targetSquare,
                    type: "move"
                })
                continue;
            }

            if (piece.color === enemyColor){
                PossibleMoves.push({
                    id: targetSquare,
                    type: "capture"
                })
            }
            break;
        }    
    }
    PossibleMoves = filterLegalMoves(squareid, PossibleMoves, color)
}

function GenereateKnightMoves(squareid, color){
    clearHighlight()
    PossibleMoves.length = 0;

    const enemyColor = color === "White"? "Black": "White";
    
    const directions = [
        [2,1],
        [2,-1],
        [-2,1],
        [-2, -1],
        [1,2],
        [-1,2],
        [-1,-2],
        [1,-2]
    ]

    for(const[fileDirection, rankDirection] of directions){
        let file = squareid[0].charCodeAt(0)
        let rank = Number(squareid[1])

        file += fileDirection;
        rank += rankDirection;

        if(file < "a".charCodeAt(0) || file > "h".charCodeAt(0) || rank < 1 || rank > 8){
            continue;
        }

        const targetSquare = `${String.fromCharCode(file)}${rank}`;
        const piece = whichPieceExist(targetSquare);

        if(piece == null){
            PossibleMoves.push({
                id: targetSquare,
                type: "move"
            })
            continue;
        }

        if (piece.color === enemyColor){
            PossibleMoves.push({
                id: targetSquare,
                type: "capture"
            })
        }
    }
    PossibleMoves = filterLegalMoves(squareid, PossibleMoves, color)
}

function GenerateKingMoves(squareid, color){

    clearHighlight()
    PossibleMoves.length = 0;

    const enemyColor = color === "White"? "Black": "White";

    const directions = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1],
        [1,1],
        [1,-1],
        [-1,-1],
        [-1,1]
    ]
    
    for(const[fileDirection, rankDirection] of directions){
        let file = squareid[0].charCodeAt(0)
        let rank = Number(squareid[1])

        file += fileDirection;
        rank += rankDirection;

        if(file < "a".charCodeAt(0) || file > "h".charCodeAt(0) || rank < 1 || rank > 8){
            continue;
        }

        const targetSquare = `${String.fromCharCode(file)}${rank}`;
        if(isSquareUnderAttack(targetSquare, enemyColor)){
            continue;
        }
        const piece = whichPieceExist(targetSquare);

        if(piece == null){
            PossibleMoves.push({
                id: targetSquare,
                type: "move"
            })
            continue;
        }

        if (piece.color === enemyColor){
            PossibleMoves.push({
                id: targetSquare,
                type: "capture"
            })
        }
    }
    PossibleMoves = filterLegalMoves(squareid, PossibleMoves, color)
}

function GlobalEvent(){

    RootDiv.addEventListener("click", function(event){
        
        // available clicks: img, square, pseudo elements like move capture
        const ClickedON = event.target.closest(".square")?.id;
        if(!ClickedON) return; // just to avoid any exceptions

        const clickedPiece = whichPieceExist(ClickedON); // can be null or a piece object

        // if a piece is already selected check if the clicked square is one of the possible moves: call moveElement

        const move = PossibleMoves.find(
            move => move.id === ClickedON
        )

        if(CurrentHighlighted && move){
            recordMove(SelectedPiece, CurrentHighlighted, ClickedON, clickedPiece)
            moveElement(CurrentHighlighted, ClickedON);
            if(SelectedPiece.includes("King")){
                updateKingSquare(CurrentTurn, ClickedON)
            }
            CurrentTurn = switchTurn(CurrentTurn)

            clearHighlight();
            removeYellowSquare(CurrentHighlighted);
            CurrentHighlighted = null;
            SelectedPiece = null;
            PossibleMoves.length = 0;
            return;
        }
        // if the squares are not one of the possible moves and no piece is selected
        else if (CurrentHighlighted && (CurrentHighlighted === ClickedON || !clickedPiece)){
            clearHighlight();
            removeYellowSquare(CurrentHighlighted);
            CurrentHighlighted = null;
            SelectedPiece = null;
            PossibleMoves.length = 0;
            return;
        }

        //  we click on a new piece 
        if(clickedPiece){
            if(clickedPiece.color !== CurrentTurn){
                clearHighlight();
                removeYellowSquare(CurrentHighlighted);
                CurrentHighlighted = null;
                SelectedPiece = null;
                PossibleMoves.length = 0;
                return;
            }
            // check if any other piece was selected
            if(CurrentHighlighted){
                removeYellowSquare(CurrentHighlighted)
                clearHighlight();
            }
            // make the current piece selected
            CurrentHighlighted = ClickedON;
            SelectedPiece = clickedPiece.piece_name;
            MakeSquareYellow(ClickedON);
            PossibleMoves.length = 0;

            // white pawn logic
            if(clickedPiece.piece_name === "WhitePawn"){
                GeneratePawnMoves(ClickedON, "White");
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "BlackPawn"){
                GeneratePawnMoves(ClickedON, "Black")
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "WhiteBishop"){
                GenerateBishopMoves(ClickedON, "White");
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "BlackBishop"){
                GenerateBishopMoves(ClickedON, "Black");
                RenderPossibleMoves(PossibleMoves)
            }
            else if (clickedPiece.piece_name === "WhiteRook"){
                GenerateRookMoves(ClickedON, "White")
                RenderPossibleMoves(PossibleMoves)
            }
            else if (clickedPiece.piece_name === "BlackRook"){
                GenerateRookMoves(ClickedON, "Black")
                RenderPossibleMoves(PossibleMoves)
            }
            else if (clickedPiece.piece_name === "WhiteQueen"){
                console.log(true)
                GenerateQueenMoves(ClickedON, "White")
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "BlackQueen"){
                GenerateQueenMoves(ClickedON, "Black")
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "WhiteKnight"){
                GenereateKnightMoves(ClickedON, "White")
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "BlackKnight"){
                GenereateKnightMoves(ClickedON, "Black")
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "WhiteKing"){
                GenerateKingMoves(ClickedON, "White")
                RenderPossibleMoves(PossibleMoves)
            }
            else if(clickedPiece.piece_name === "BlackKing"){
                GenerateKingMoves(ClickedON, "Black")
                RenderPossibleMoves(PossibleMoves)
            }
        }
        
    });
}

export {GlobalEvent}