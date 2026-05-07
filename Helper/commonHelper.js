import { globalState } from "./constants.js"


function getSquare(squareid){
    return globalState.flat().find(el => el.id === squareid);
}

function whichPieceExist(squareid){
    for (let row of globalState) {
        for (let el of row) {
            if (el.id === squareid) {
                if (!el.piece) {
                    return null;
                }
                return el.piece; 
            }
        }
    }
    return null
}

function switchTurn(Curr_Turn){
    return Curr_Turn === "White" ? "Black" : "White";
}

 
export {getSquare, whichPieceExist, switchTurn}