import { RootDiv, globalState } from "../Helper/constants.js";
import { renderHighlight, clearHighlight, selfHighlight, clearPreviousHighlight } from "../Render/main.js";

// highlight or not => state
let highlight_state = false

// current self highlight square state
let selfHighlightState = null

function whitePawnclick({piece}){
    clearPreviousHighlight(selfHighlightState)
    selfHighlight(piece)
    selfHighlightState = piece

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
            console.log(`clicked on ${ClickedId}, piece name is ${square.piece.piece_name}`)

            if(square.piece.piece_name == "WhitePawn"){
                whitePawnclick(square);
            }
        }
    })
}

export {GlobalEvent}