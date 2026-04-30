import { RootDiv, globalState } from "../Helper/constants.js";
import { renderHighlight, clearHighlight, selfHighlight, clearPreviousHighlight, moveElement } from "../Render/main.js";

// highlight or not => state
let highlight_state = false

// current self highlight square state
let selfHighlightState = null

// in move state or not
let moveState = null;

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
        }
        else{
            const childElementOfClickedEl = Array.from(event.target.childNodes)

            if(childElementOfClickedEl.length == 1 || event.target.localName == "span"){
                if(event.target.localName == "span"){
                    const id = event.target.parentNode.id;
                    moveElement(moveState, id);
                    moveState = null;
                }
                else{
                    const id = event.target.id
                    moveElement(moveState, id)
                    moveState = null;
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