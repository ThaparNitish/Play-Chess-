import { moveElement } from "../Render/main.js";
import { getSquare, whichPieceExist } from "./commonHelper.js";
import { isKingInCheck, updateKingSquare } from "./King.js";


function isSquareUnderAttack(squareId, Attackcolor){
    if(checkPawnAttack(squareId, Attackcolor)) return true;
    else if (checkRookAttack(squareId, Attackcolor)) return true;
    else if (checkBishopAttack(squareId, Attackcolor)) return true;
    else if (checkKnightAttack(squareId, Attackcolor)) return true;
    else if (checkKingAttack(squareId, Attackcolor)) return true;
    else if (checkQueenAttack(squareId, Attackcolor)) return true;
    return false;
}

function checkPawnAttack(squareId, Attackcolor){
    const direction = Attackcolor === "White" ? -1 : 1;
    const pawnAttacks = [
        [1, direction],
        [-1, direction]
    ]

    let file = squareId[0].charCodeAt(0);
    let rank = Number(squareId[1])

    const pawnAttackSquare = []

    pawnAttacks.forEach(el => {
        pawnAttackSquare.push([file + el[0], rank + el[1]])
    });

    for(const[targetFile, targetRank] of pawnAttackSquare){
        if(targetFile < "a".charCodeAt(0) || targetFile > "h".charCodeAt(0) || targetRank < 1 || targetRank > 8){
            continue;
        }

        const targetSquare = `${String.fromCharCode(targetFile)}${targetRank}`

        const piece = whichPieceExist(targetSquare);

        if(piece && piece.piece_name.includes("Pawn") && piece.color === Attackcolor){
            return true;
        }
    }
    return false;
}

function checkKnightAttack(squareId, Attackcolor){
    const KnightAttacks = [
        [2,1],
        [2,-1],
        [-2,1],
        [-2, -1],
        [1,2],
        [-1,2],
        [-1,-2],
        [1,-2]
    ]

    let file = squareId[0].charCodeAt(0);
    let rank = Number(squareId[1])

    const KnightAttackSquare = []

    KnightAttacks.forEach(el => {
        KnightAttackSquare.push([file + el[0], rank + el[1]])
    });

    for(const[targetFile, targetRank] of KnightAttackSquare){
        if(targetFile < "a".charCodeAt(0) || targetFile > "h".charCodeAt(0) || targetRank < 1 || targetRank > 8){
            continue;
        }

        const targetSquare = `${String.fromCharCode(targetFile)}${targetRank}`

        const piece = whichPieceExist(targetSquare);

        if(piece && piece.piece_name.includes("Knight") && piece.color === Attackcolor){
            return true;
        }
    }
    return false;
}

function checkKingAttack(squareId, Attackcolor){
    const KingAttacks = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1],
        [1,1],
        [1,-1],
        [-1,-1],
        [-1,1]
    ]

    let file = squareId[0].charCodeAt(0);
    let rank = Number(squareId[1])

    const KingAttackSquare = []

    KingAttacks.forEach(el => {
        KingAttackSquare.push([file + el[0], rank + el[1]])
    });

    for(const[targetFile, targetRank] of KingAttackSquare){
        if(targetFile < "a".charCodeAt(0) || targetFile > "h".charCodeAt(0) || targetRank < 1 || targetRank > 8){
            continue;
        }

        const targetSquare = `${String.fromCharCode(targetFile)}${targetRank}`

        const piece = whichPieceExist(targetSquare);

        if(piece && piece.piece_name.includes("King") && piece.color === Attackcolor){
            return true;
        }
    }
    return false;
}

function checkQueenAttack(squareId, Attackcolor){
    const QueenAttacks = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1],
        [1,1],
        [-1,1],  
        [1,-1],  
        [-1,-1],
    ]

    for(const[fileDirection, rankDirection] of QueenAttacks){
        let File = squareId[0].charCodeAt(0);
        let Rank = Number(squareId[1])    

        while(true){
            File += fileDirection;
            Rank += rankDirection;

            if(File < "a".charCodeAt(0) || File > "h".charCodeAt(0) || Rank < 1 || Rank > 8){
                break;
            }

            const targetSquare = `${String.fromCharCode(File)}${Rank}`
            const piece = whichPieceExist(targetSquare)

            if(piece){
                if(piece.piece_name.includes("Queen") && piece.color === Attackcolor){
                    return true;
                }
                break;
            }  
        }
    }

    return false;
}

function checkRookAttack(squareId, Attackcolor){
    const RookAttacks = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1]
    ]

    for(const[fileDirection, rankDirection] of RookAttacks){
        let File = squareId[0].charCodeAt(0);
        let Rank = Number(squareId[1])    

        while(true){
            File += fileDirection;
            Rank += rankDirection;

            if(File < "a".charCodeAt(0) || File > "h".charCodeAt(0) || Rank < 1 || Rank > 8){
                break;
            }

            const targetSquare = `${String.fromCharCode(File)}${Rank}`
            const piece = whichPieceExist(targetSquare)

            if(piece){
                if(piece.piece_name.includes("Rook") && piece.color === Attackcolor){
                    return true;
                }
                break;
            }  
        }
    }

    return false;
}

function checkBishopAttack(squareId, Attackcolor){
    const BishopAttacks = [
        [1,1],   // right++
        [-1,1],  // left++
        [1,-1],  // right--
        [-1,-1], // left--
    ]

    for(const[fileDirection, rankDirection] of BishopAttacks){
        let File = squareId[0].charCodeAt(0);
        let Rank = Number(squareId[1])    

        while(true){
            File += fileDirection;
            Rank += rankDirection;

            if(File < "a".charCodeAt(0) || File > "h".charCodeAt(0) || Rank < 1 || Rank > 8){
                break;
            }

            const targetSquare = `${String.fromCharCode(File)}${Rank}`
            const piece = whichPieceExist(targetSquare)

            if(piece){
                if(piece.piece_name.includes("Bishop") && piece.color === Attackcolor){
                    return true;
                }
                break;
            }   
        }
    }
    return false;
}

function filterLegalMoves(fromSquare, PossibleMoves, color){
    const legalMoves = []

    PossibleMoves.forEach(el => {

        const moveData = {from: fromSquare, to: el.id, movedPiece: whichPieceExist(fromSquare), capturedPiece: whichPieceExist(el.id)}

        makeTemporaryMove(moveData, color)

        if(!isKingInCheck(color)){
            legalMoves.push(el)
        }

        undoTemporaryMove(moveData, color)
    })

    return legalMoves;
}

function makeTemporaryMove(moveData, color){
    const fromSquare = getSquare(moveData.from);
    const toSquare = getSquare(moveData.to)

    moveData.movedPiece = fromSquare.piece;
    if(moveData.movedPiece.piece_name.includes("King")){
        updateKingSquare(color, moveData.to)
    }
    moveData.capturedPiece = toSquare.piece;

    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;

    if(toSquare.piece){
        toSquare.piece.curr_position = moveData.to
    }
}

function undoTemporaryMove(moveData, color){
    const fromSquare = getSquare(moveData.from);
    const toSquare = getSquare(moveData.to);

    fromSquare.piece = moveData.movedPiece;
    toSquare.piece = moveData.capturedPiece;
    if(moveData.movedPiece.piece_name.includes("King")){
        updateKingSquare(color, moveData.from)
    }

    if(fromSquare.piece){
        fromSquare.piece.curr_position = moveData.from;
    }

    if(toSquare.piece){
        toSquare.piece.curr_position = moveData.to;
    }
}

export {isSquareUnderAttack, filterLegalMoves}