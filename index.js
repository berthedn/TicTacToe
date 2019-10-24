
var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;


//Initilization of the board and start the game.
function init() {
  var board = document.createElement('table');
  
  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }
  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

//New game
function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

//Check if one of the player won or not
function win(clicked) {
  //Go through every cells to test
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}


 //Function that check if the cell contain a caracter or not and change from X to O
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}


 //Update the turns and get the click
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    alert('Winner: Player ' + turn);
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert('Draw');
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn;
  }
}

init();



