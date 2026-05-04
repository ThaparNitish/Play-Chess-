import { RootDiv, globalState } from "../Helper/constants.js";
import { renderHighlight, clearHighlight, selfHighlight, clearPreviousHighlight, moveElement } from "../Render/main.js";
import { checkPieceOfOpponenentOnElement } from "../Helper/commonHelper.js";

// highlight or not => state
let highlight_state = false

// current self highlight square state
let selfHighlightState = null

// in move state or not
let moveState = null;

// White Pawn Event Listner
function whitePawnclick({piece}){

    // if same piece is clicked on twice
    if (piece == selfHighlightState){
        clearPreviousHighlight(selfHighlightState);
        selfHighlightState = null;
        clearHighlight();
        return;
    }

    // highlight clicked element
    clearPreviousHighlight(selfHighlightState)
    selfHighlight(piece)
    selfHighlightState = piece

    // add piece as move state
    moveState = piece; 

    const curr_position = piece.curr_position;
    // for initial position
    if(curr_position[1] == "2"){
        const highlightSquareId = [
            `${curr_position[0]}${Number(curr_position[1]) + 1}`,
            `${curr_position[0]}${Number(curr_position[1]) + 2}`
        ];

        clearHighlight()

        highlightSquareId.forEach((highlight) => {
            globalState.forEach((row) => {
                row.forEach((el) => {
                    if(el.id == highlight){
                        el.highlight(true)
                    }
                })
            })
            
        })
    }
    else{

        
        const col1 = `${String.fromCharCode(curr_position[0].charCodeAt(0) - 1)}${Number(curr_position[1]) + 1}`;
        const col2 = `${String.fromCharCode(curr_position[0].charCodeAt(0) + 1)}${Number(curr_position[1]) + 1}`

        // ids available to move
        const forwardId = `${curr_position[0]}${Number(curr_position[1]) + 1}`;

        const highlightSquareId = [
            { id: forwardId, type: "move" }
        ];

        const captureIds  = [col1, col2]
        captureIds.forEach((el) => {
            if(checkPieceOfOpponenentOnElement(el, "White") == "capture"){
                highlightSquareId.push({id: el, type: "capture"});
            }
        })

        

        clearHighlight()

        highlightSquareId.forEach(({ id, type })=>{
            const squareEl = document.getElementById(id);

            if(type === "move"){
                renderHighlight(id);
            }

            if(type === "capture"){
                squareEl.classList.add("capture");
            }
        });
    }
}

// Black Pawn Event Listner
function BlackPawnclick({piece}){

    // if same piece is clicked on twice
    if (piece == selfHighlightState){
        clearPreviousHighlight(selfHighlightState);
        selfHighlightState = null;
        clearHighlight();
        return;
    }

    // highlight clicked element
    clearPreviousHighlight(selfHighlightState)
    selfHighlight(piece)
    selfHighlightState = piece

    // add piece as move state
    moveState = piece; 

    const curr_position = piece.curr_position;
    // for initial position
    if(curr_position[1] == "7"){
        const highlightSquareId = [
            `${curr_position[0]}${Number(curr_position[1]) - 1}`,
            `${curr_position[0]}${Number(curr_position[1]) - 2}`
        ];

        clearHighlight()

        highlightSquareId.forEach((highlight) => {
            globalState.forEach((row) => {
                row.forEach((el) => {
                    if(el.id == highlight){
                        el.highlight(true)
                    }
                })
            })
            
        })
    }
    else{
        const highlightSquareId = [`${curr_position[0]}${Number(curr_position[1]) - 1}`];

        clearHighlight()

        highlightSquareId.forEach((highlight) => {
            globalState.forEach((row) => {
                row.forEach((el) => {
                    if(el.id == highlight){
                        el.highlight(true)
                    }
                })
            })
            
        })
    }
}

function GlobalEvent(){
    RootDiv.addEventListener("click", function(event){
        if(event.target.localName === "img"){
            const ClickedId = event.target.parentNode.id
            const flatArray = globalState.flat();
            const square = flatArray.find(el => el.id == ClickedId)

            if(square.piece.piece_name == "WhitePawn"){
                whitePawnclick(square);
            }
            else if(square.piece.piece_name == "BlackPawn"){
                BlackPawnclick(square);
            }
        }
        else{
            const childElementOfClickedEl = Array.from(event.target.childNodes)

            if(childElementOfClickedEl.length == 1 || event.target.localName == "span"){
                if(event.target.localName == "span"){
                    const id = event.target.parentNode.id;
                    moveElement(moveState, id);
                    moveState = null;
                    selfHighlightState = null;
                }
                else{
                    const id = event.target.id
                    moveElement(moveState, id)
                    moveState = null;
                    selfHighlightState = null;
                }
            }
            else{
                clearHighlight()
                clearPreviousHighlight(selfHighlightState)
                selfHighlightState = null
            }
        }
    })
}

export {GlobalEvent}