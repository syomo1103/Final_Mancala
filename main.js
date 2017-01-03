$(function() {

/*--Variables--*/
var board = {
  homeSpace: null, homeBowl1: 4, homeBowl2: 4, homeBowl3: 4, homeBowl4: 4,
  homeBowl5: 4, homeBowl6: 4, otherSpace: null, otherBowl1: 4, otherBowl2: 4,
  otherBowl3: 4, otherBowl4: 4, otherBowl5: 4, otherBowl6: 4,
};
var player, num, hand;
var holes = $('.bowl').toArray();

/*--Event Listeners--*/
$('td').on('click', function(evt) {
  if (player === 'Player1' && $(this).hasClass('other-turf')) {
    return;
  } else if (player === 'Player2' && $(this).hasClass('home-turf')) {
    return;
  }
  $('.home-bowl').off('click');
  hand = this.value;
  this.value = null;
  updateDisplay(this);
  moveOnClick(this);
  checkWinner();
});

$('a').on('click', function(evt) {
  location.reload();
});

/*--Functions--*/
function initialize() {
  assignSpaces();
  setPlayer();
  console.log(player);
  $('#title').show();
  $('.messages').hide();
};

function assignSpaces() {
  holes.forEach(function(el) {
    switch (el.id) {
      case 'hole13':
        el.value = board.otherBowl1;
        break;
      case 'hole1':
        el.value = board.homeBowl6;
        break;
      case 'hole12':
        el.value = board.otherBowl2;
        break;
      case 'hole2':
        el.value = board.homeBowl5;
        break;
      case 'hole11':
        el.value = board.otherBowl3;
        break;
      case 'hole3':
        el.value = board.homeBowl4;
        break;
      case 'hole10':
        el.value = board.otherBowl4;
        break;
      case 'hole4':
        el.value = board.homeBowl3;
        break;
      case 'hole9':
        el.value = board.otherBowl5;
        break;
      case 'hole5':
        el.value = board.homeBowl2;
        break;
      case 'hole8':
        el.value = board.otherBowl6;
        break;
      case 'hole6':
        el.value = board.homeBowl1;
        break;
      case 'hole7':
        el.value = board.homeSpace;
        break;
      case 'hole14':
        el.value = board.otherSpace;
    }
  updateDisplay(el);
  });
};

function moveOnClick(n) {
  if (hand > 1) {
    idNum = parseInt(n.id.substr(4)) + 1;
      if (idNum > 14) {
          idNum = 1;
      } else if (player === 'Player1' && idNum === 14) {
          idNum = 1;
      } else if (player === 'Player2' && idNum === 7) {
          idNum = 8;
      }
    var nextId = 'hole' + idNum;
    holes.forEach(function(el, index) {
      if (holes[index].id === nextId) {
        nextId = $(holes).get(index);
        nextId.value = nextId.value + 1;
        hand = hand - 1;
        updateDisplay(el);
      }
    })
    moveAfterClick(nextId);
  } if (hand === 1) {
    idNum = parseInt(n.id.substr(4)) + 1;
      if (idNum > 14) {
        idNum = 1;
      } else if (player === 'Player1' && idNum === 14) {
          idNum = 1;
      } else if (player === 'Player2' && idNum === 7) {
          idNum = 8;
      }
      nextId = 'hole' + idNum;
      holes.forEach(function(el, index) {
        if (holes[index].id === nextId) {
          nextId = $(holes).get(index);
          updateDisplay(el);
        }
      })
      checkBowl(nextId);
    };
};

function moveAfterClick(nextId) {
  for (var i = hand; i >= 0; i--) {
    if (hand > 1) {
      idNum = parseInt(nextId.id.substr(4)) + 1;
        if (idNum > 14) {
          idNum = 1;
        } else if (player === 'Player1' && idNum === 14) {
          idNum = 1;
        } else if (player === 'Player2' && idNum === 7) {
          idNum = 8;
        }
      nextId = 'hole' + idNum;
      holes.forEach(function(el, index) {
        if (holes[index].id === nextId) {
          nextId = $(holes).get(index);
          nextId.value = nextId.value + 1;
          hand = hand - 1;
          updateDisplay(el);
        }
      })
    } if (hand === 1) {
      idNum = parseInt(nextId.id.substr(4)) + 1;
        if (idNum > 14) {
          idNum = 1;
        } else if (player === 'Player1' && idNum === 14) {
          idNum = 1;
        } else if (player === 'Player2' && idNum === 7) {
          idNum = 8;
        }
      nextId = 'hole' + idNum;
      holes.forEach(function(el, index) {
        if (holes[index].id === nextId) {
          nextId = $(holes).get(index);
          updateDisplay(el);
        }
      })
      checkBowl(nextId);
    }
  }
};

function checkBowl(nextId, el, index, value) {
  if (nextId.id === 'hole7' || nextId.id === 'hole14') {
    nextId.value = nextId.value + 1;
    hand = hand - 1;
    updateDisplay(nextId);
    setMessage();
  } else if (nextId.value === null) {
    nextId.value = nextId.value + 1;
    hand = hand - 1;
    updateDisplay(nextId);
    switchPlayer();
  } else if (nextId.value >= 1) {
    hand = hand + nextId.value;
    nextId.value = null;
    updateDisplay(nextId);
    moveAfterClick(nextId);
  }
};

function setPlayer() {
  player = Math.round(Math.random()) ? 'Player1' : 'Player2';
  if (player === 'Player1') {
    $('#player1-div').css('textShadow', 'red 0 0 5px');
  } else if (player === 'Player2') {
    $('#player2-div').css('textShadow', 'red 0 0 5px');
  }
};

function switchPlayer() {
  player = (player === 'Player1') ? 'Player2' : 'Player1';
  if (player === 'Player1') {
    $('#player1-div').css('textShadow', 'red 0 0 5px');
    $('#player2-div').css('textShadow', 'none');
  } else if (player === 'Player2') {
    $('#player2-div').css('textShadow', 'red 0 0 5px');
    $('#player1-div').css('textShadow', 'none');
  }
};

function updateDisplay(el) {
  el.textContent = el.value;
};

function setMessage() {
  console.log('Nice one! Still your turn. Pick another bowl.');
};

function checkWinner() {
  holes.forEach(function() {
    if (holes[2].value === null && holes[4].value === null && holes[6].value === null && holes[8].value === null && holes[10].value === null && holes[12].value === null) {
      $('td').off('click');
      $('#player2-div').hide();
      $('#player1-message').show();
    } else if (holes[1].value === null && holes[3].value === null && holes[5].value === null && holes[7].value === null && holes[9].value === null && holes[11].value === null) {
      $('td').off('click');
      $('#player1-div').hide();
      $('#player2-message').show();
    }
  })
};

initialize();

});
