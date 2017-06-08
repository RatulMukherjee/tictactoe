var board = new Array();
var BOARD_SIZE = 9;
var UNOCCUPIED = ' ';
var HUMAN_PLAYER = 'O';
var COMPUTER_PLAYER = 'X';
var active_turn = "HUMAN";
var choice;



function NewGame()
{
    for (i = 0; i < BOARD_SIZE; i++)
    {
        board[i] = UNOCCUPIED;
        document.getElementById("box0").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box1").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box2").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box3").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box4").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box5").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box6").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box7").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
        document.getElementById("box8").innerHTML="<h3 style=\"visibility: hidden\" >1</h3>";
    }
   
     document.getElementById("turnInfo").innerHTML="Your turn";
    active_turn = "HUMAN";
    
}

function hit(pos)
{
    
    if (!GameOver(board) && board[pos] == UNOCCUPIED)
    {
        board[pos] = HUMAN_PLAYER;
        id = "box"+pos;
        document.getElementById(id).innerHTML = "<h3 style=\"color:black; text-shadow: 2px 2px #e0e0e0; \">O</h3>";
        
        if (!GameOver(board))
        {
            var alert = document.getElementById("turnInfo");
            active_turn = "COMPUTER";
            alert.innerHTML = "Computer's turn.";
            MakeComputerMove();
        }
    }
}

function MakeComputerMove()
{
    console.log("its computer's turn now");
    minimax(board, 0);
    var move = choice;
    console.log(move);
    board[move] = COMPUTER_PLAYER;
    choice = [];
    id = "box"+move;
    console.log(id);
    document.getElementById(id).innerHTML = "<h3 style=\"color: black; text-shadow: 2px 2px #e0e0e0; \">X</h3>";
    active_turn = "HUMAN";
    if (!GameOver(board))
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "Your turn!";     
    }
}

function score(game, depth) {
    var score = CheckForWinner(game);
    if (score === 1)
        return 0;
    else if (score === 2)
        return depth-10;
    else if (score === 3)
        return 10-depth;
}

function minimax(tempBoardGame, depth) {
    if (CheckForWinner(tempBoardGame) !== 0)
        return score(tempBoardGame, depth);
    
    depth+=1;
    var scores = new Array();
    var moves = new Array();
    var availableMoves = GetAvailableMoves(tempBoardGame);
    var move, possible_game;
    for(var i=0; i < availableMoves.length; i++) {
	move = availableMoves[i];
        possible_game = GetNewState(move, tempBoardGame);
        scores.push(minimax(possible_game, depth));
        moves.push(move);
        tempBoardGame = UndoMove(tempBoardGame, move);
    }
    
    var max_score, max_score_index, min_score,
            min_score_index;
    if (active_turn === "COMPUTER") {
        max_score = Math.max.apply(Math, scores);
        max_score_index = scores.indexOf(max_score);
        choice = moves[max_score_index];
        return scores[max_score_index];

    } else {
        min_score = Math.min.apply(Math, scores);
        min_score_index = scores.indexOf(min_score);
        choice = moves[min_score_index];
        return scores[min_score_index];
    }
}

function UndoMove(game, move) {
    game[move] = UNOCCUPIED;
    ChangeTurn();
    return game;
}

function GetNewState(move, game) {
    var piece = ChangeTurn();
    game[move] = piece;
    return game;
}

function ChangeTurn() {
    var piece;
    if (active_turn === "COMPUTER") {
        piece = 'X';
        active_turn = "HUMAN";
    } else {
        piece = 'O';
        active_turn = "COMPUTER";
    }
    return piece;
}

function GetAvailableMoves(game) {
    var possibleMoves = new Array();
    for (var i = 0; i < BOARD_SIZE; i++)
        if (game[i] === UNOCCUPIED)
            possibleMoves.push(i);
    return possibleMoves;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if HUMAN_PLAYER won
//   3 if COMPUTER_PLAYER won
function CheckForWinner(game) {
    // Check for horizontal wins
    for (i = 0; i <= 6; i += 3)
    {
        if (game[i] === HUMAN_PLAYER && game[i + 1] === HUMAN_PLAYER && game[i + 2] === HUMAN_PLAYER)
            return 2;
        if (game[i] === COMPUTER_PLAYER && game[i + 1] === COMPUTER_PLAYER && game[i + 2] === COMPUTER_PLAYER)
            return 3;
    }

    // Check for vertical wins
    for (i = 0; i <= 2; i++)
    {
        if (game[i] === HUMAN_PLAYER && game[i + 3] === HUMAN_PLAYER && game[i + 6] === HUMAN_PLAYER)
            return 2;
        if (game[i] === COMPUTER_PLAYER && game[i + 3] === COMPUTER_PLAYER && game[i + 6] === COMPUTER_PLAYER)
            return 3;
    }

    // Check for diagonal wins
    if ((game[0] === HUMAN_PLAYER && game[4] === HUMAN_PLAYER && game[8] === HUMAN_PLAYER) ||
            (game[2] === HUMAN_PLAYER && game[4] === HUMAN_PLAYER && game[6] === HUMAN_PLAYER))
        return 2;

    if ((game[0] === COMPUTER_PLAYER && game[4] === COMPUTER_PLAYER && game[8] === COMPUTER_PLAYER) ||
            (game[2] === COMPUTER_PLAYER && game[4] === COMPUTER_PLAYER && game[6] === COMPUTER_PLAYER))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++)
    {
        if (game[i] !== HUMAN_PLAYER && game[i] !== COMPUTER_PLAYER)
            return 0;
    }
    return 1;
}

function GameOver(game)
{
    if (CheckForWinner(game) === 0)
        return false;
    else if (CheckForWinner(game) === 1)
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "It is a tie.";
    }
    else if (CheckForWinner(game) === 2)
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "You have won! Congratulations!";
    }
    else
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "The computer has won.";
    }
    
    return true;
}


