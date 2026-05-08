
// Black Pieces
function BlackPawn(curr_position){
  return{curr_position, img: "../images/pieces/black/pawn.png", piece_name: "BlackPawn", color : "Black"}
}

function BlackKing(curr_position){
  return{curr_position, img: "../images/pieces/black/king.png", piece_name: "BlackKing", color : "Black"}
}

function BlackQueen(curr_position){
  return{curr_position, img: "../images/pieces/black/queen.png", piece_name: "BlackQueen", color: "Black"}
}

function BlackBishop(curr_position){
  return{curr_position, img: "../images/pieces/black/bishop.png", piece_name: "BlackBishop", color:"Black"}
}

function BlackRook(curr_position){
  return{curr_position, img: "../images/pieces/black/rook.png", piece_name: "BlackRook", color: "Black"}
}

function Blackknight(curr_position){
  return{curr_position, img: "../images/pieces/black/knight.png", piece_name: "BlackKnight", color : "Black"}
}

// White Pieces
function WhitePawn(curr_position){
  return{curr_position, img: "../images/pieces/white/pawn.png", piece_name: "WhitePawn", color : "White"}
}

function WhiteKing(curr_position){
  return{curr_position, img: "../images/pieces/white/king.png", piece_name: "WhiteKing", color : "White"}
}

function WhiteQueen(curr_position){
  return{curr_position, img: "../images/pieces/white/queen.png", piece_name: "WhiteQueen", color : "White"}
}

function WhiteBishop(curr_position){
  return{curr_position, img: "../images/pieces/white/bishop.png", piece_name: "WhiteBishop", color : "White"}
}

function WhiteRook(curr_position){
  return{curr_position, img: "../images/pieces/white/rook.png", piece_name: "WhiteRook", color : "White"}
}

function WhiteKnight(curr_position){
  return{curr_position, img: "../images/pieces/white/knight.png", piece_name: "WhiteKnight", color : "White"}
}



export{BlackBishop, BlackKing, BlackQueen, BlackRook, Blackknight,BlackPawn, WhitePawn, WhiteBishop, WhiteKing, WhiteKnight, WhiteQueen, WhiteRook}
