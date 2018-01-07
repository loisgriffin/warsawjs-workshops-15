document.addEventListener('DOMContentLoaded', function() {

  var playerClasses = {
    'playerA': 'red',
    'playerB': 'blue'
  };
  var currentPlayer;
  var emptyFields;

  initGame();

  function initGame() {
    var fields = document.querySelectorAll('.board > div');
    console.log(fields)
    for (let i =0; i < fields.length; i++) {
      let field = fields[i]
      console.log(field)
      currentPlayer = 'playerA';
      field.addEventListener('click', fieldClickHandler);
      emptyFields = 9;
    }
  };

  function fieldClickHandler() {
    console.log("Hello", this)

    var playerClass = playerClasses[currentPlayer];
    this.classList.add(playerClass);

    emptyFields--;

    if (currentPlayer === 'playerA') {
      currentPlayer = 'playerB';
    }
    else {
      currentPlayer = 'playerA';
    }

    this.removeEventListener('click', fieldClickHandler);

    if (emptyFields === 0) {
      alert('End of the game!');
    }

  }






})
