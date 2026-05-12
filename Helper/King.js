import { isSquareUnderAttack } from "./legalMoves.js";

let whiteKing = "e1";
let blackKing = "e8"

function updateKingSquare(color, squareid){
    if(color == "White"){
        whiteKing = squareid;
        console.log("White king at" + squareid)
    }
    else{
        blackKing = squareid;
        console.log("Black King at " + squareid)
    }
}

function findKingSquare(color){
    if(color == "White"){
        return whiteKing;
    }
    return blackKing;
}

function isKingInCheck(color){
    const enemyColor = color === "White" ? "Black" : "White"
    if(color == "White"){
        return isSquareUnderAttack(whiteKing, enemyColor)
    }
    else{
        return isSquareUnderAttack(blackKing, enemyColor);
    }
}

export {updateKingSquare, findKingSquare, isKingInCheck}
