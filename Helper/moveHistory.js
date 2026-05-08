const MoveHistory = []


function recordMove(piece, from, to, captured){
    if(captured){
        MoveHistory.push({piece: piece.piece_name, from:  from, to: to,captured:  captured.piece_name})
    }
    else{
      MoveHistory.push({piece: piece.piece_name, from:  from, to: to,captured: null})  
    }
    console.log(MoveHistory)
}

export { recordMove}