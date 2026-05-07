import { globalState } from "./constants.js"

// function to check if piece exits of oppoenent
function checkPieceOfOpponenentOnElement(id, color){
    console.log(id, color)
    const flatArray = globalState.flat()
    const opponentColor = color === "White" ? "Black" : "White";

    for (let index = 0; index < flatArray.length; index++) {
        const element = flatArray[index];
        if(element.id == id){
            if(element.piece && element.piece.piece_name.includes(opponentColor)){
                return "capture"
            }
            break;
        }
    }
    return null;
}
function getSquare(squareid){
    return globalState.flat().find(el => el.id === squareid);
}

 
export {checkPieceOfOpponenentOnElement, getSquare}