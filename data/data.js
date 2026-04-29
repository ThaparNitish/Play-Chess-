import { renderHighlight } from "../Render/main.js"

function Square(color, id, piece){
    const highlight = function(){
        renderHighlight(this.id);
        this.highlighted = true;
    }
    return {color, id, piece, highlight}
}

function SquareRow(rowID){
    const col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const row = []
    if(rowID % 2 == 0){
        col.forEach((element, index)=>{
        if(index % 2 == 0){
            row.push(Square("white", element + rowID, null))
        }
        else{
            row.push(Square("black", element + rowID, null))
        }
    })   
}
    else{
        col.forEach((element, index)=>{
            if(index % 2 == 0){
                row.push(Square("black", element + rowID, null))
            }
            else{
                row.push(Square("white", element + rowID, null))
            }
        })
    }
    return row;
}


function InitGame(){
    return [SquareRow(8), SquareRow(7), SquareRow(6), SquareRow(5), SquareRow(4), SquareRow(3), SquareRow(2), SquareRow(1)]
}

export {InitGame}

