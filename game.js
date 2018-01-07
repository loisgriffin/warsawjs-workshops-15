document.addEventListener('DOMContentLoaded', function() {
  var resetButton = document.getElementById('reset-score');

  var playerClasses = {
    'playerA': 'red',
    'playerB': 'blue'
  };

  var scores = {
    'playerA': 0,
    'playerB': 0
  }

  var currentPlayer;
  var emptyFields;

  initGame();

  resetButton.addEventListener('click', function() {
    scores['playerA'] = 0;
    scores['playerB'] = 0;

        displayPlayerScore('playerA');
        displayPlayerScore('playerB');
  });

  function displayPlayerScore(player) {
      var score = document.getElementById(`${player}-score`);
      score.innerHTML = `${player} score: ${scores[player]}`;
  }

  function updatePlayerScore(player) {
      scores[player]++;
  }



  function displayRoundInformation() {
    var round = document.getElementById('round-info');
    round.className = playerClasses[currentPlayer];
    round.innerHTML = `Round for ${currentPlayer}`;
  }


  function initGame() {
    var fields = document.querySelectorAll('.board > div');
    console.log(fields)
    for (let i =0; i < fields.length; i++) {
      let field = fields[i]
      console.log(field)
    currentPlayer = 'playerA';
    field.addEventListener('click', fieldClickHandler);
    emptyFields = 9;
    fields.forEach(field => field.removeAttribute('class'));

    displayRoundInformation();
    displayPlayerScore('playerA');
    displayPlayerScore('playerB');
    }
  };

  function fieldClickHandler() {
    var playerClass = playerClasses[currentPlayer];
    this.classList.add(playerClass);

    emptyFields--;

    if (currentPlayer === 'playerA') {
      currentPlayer = 'playerB';
    }
    else {
      currentPlayer = 'playerA';
    }

    displayRoundInformation();
    this.removeEventListener('click', fieldClickHandler);
    checkWinner();
  };


  function checkWinner() {
      var fields = document.querySelectorAll('.board > div');

      /*

                 +---+---+---+
                 | 0 | 1 | 2 |
                 +---+---+---+
                 | 3 | 4 | 5 |
                 +---+---+---+
                 | 6 | 7 | 8 |
                 +---+---+---+

        */

// Horizontal win configurations 012, 345, 678
    var row1 = fields[0].className + fields[1].className + fields[2].className;
    var row2 = fields[3].className + fields[4].className + fields[5].className;
    var row3 = fields[6].className + fields[7].className + fields[8].className;

// Vertical win configurations 036, 147, 258
    var column1 = fields[0].className + fields[3].className + fields[6].className;
    var column2 = fields[1].className + fields[4].className + fields[7].className;
    var column3 = fields[2].className + fields[5].className + fields[8].className;

	// Diagonal win configurations 048, 246
    var diagonal1 = fields[0].className + fields[4].className + fields[8].className;
    var diagonal2 = fields[2].className + fields[4].className + fields[6].className;

    var boardCheck = [
    row1,
    row2,
    row3,
    column1,
    column2,
    column3,
    diagonal1,
    diagonal2
    ];

    if(boardCheck.includes('redredred')) {
      setTimeout (() => {
        alert("Red wins!");
        updatePlayerScore('playerA');
        initGame();
      }, 100);
    }

    if(boardCheck.includes('blueblueblue')) {
      setTimeout (() => {
        alert("Blue wins!");
        updatePlayerScore('playerB');
        initGame();
      }, 100);
    }

    if(emptyFields === 0) {
    setTimeout (() => {
      alert('Tie');
      initGame();
    }, 100);
      }
    }
});

/*
// Longer way to check the above
// Check if any of win configuration is redredred (red wins)
if (row1 === 'redredred' ||
    row2 === 'redredred' ||
    row3 === 'redredred' ||
    column1 === 'redredred' ||
    column2 === 'redredred' ||
    column3 === 'redredred'
  ) {
    alert("Red wins!");
    return;
  }

// Check f any of win configurations is blueblueblue (blue wins)
if (row1 === 'blueblueblue' ||
    row2 === 'blueblueblue' ||
    row3 === 'blueblueblue' ||
    column1 === 'blueblueblue' ||
    column2 === 'blueblueblue' ||
    column3 === 'blueblueblue'
) {
  alert('Blue wins!');
  return;
}
*/
