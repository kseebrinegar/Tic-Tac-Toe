var gameBoard = document.getElementById('container');
var checkPlayersTurn = document.getElementsByTagName('h1');
var playerBox = document.getElementsByClassName('playerbox');
var error = document.getElementsByClassName('error');
var reset = document.querySelector('button');
var player1 = true;
var player2 = false;
var hotPicList = [
	'url(images/0.png)', 
	'url(images/1.png)', 
	'url(images/2.png)', 
	'url(images/3.png)', 
	'url(images/4.png)', 
	'url(images/5.png)', 
	'url(images/6.png)',
	'url(images/7.png)',
	'url(images/8.png)'
];

reset.addEventListener('click', function() {
	resetGame();
});


gameBoard.addEventListener('click', function(event) {
	var boxClicked = event.target;
	addXorO(boxClicked);

});


function changePlayer() {
	if (checkPlayersTurn[0].textContent === 'Player X\'s Turn!') {
		checkPlayersTurn[0].textContent ='Player O\'s Turn!';
		player1 = false;
		player2 = true;
	} else  {
		checkPlayersTurn[0].textContent = 'Player X\'s Turn!';
		player2 = false;
		player1 = true;
	}
}


function addXorO(boxClicked) {
	if (player1 === true) {
		if (boxClicked.textContent === '') {
			boxClicked.textContent = 'X';
			error[0].textContent = '';
			addBackgroundImage(boxClicked);
		} else {
			error[0].textContent = 'Please pick an area that hasen\'t already been picked...';
		}
	} else {
		if (boxClicked.textContent === '') {
			boxClicked.textContent = 'O';
			boxClicked.style.color = 'rgba(253, 238, 33, 0.5)';
			error[0].textContent = ''
			addBackgroundImage(boxClicked);
		} else {
			error[0].textContent = 'Please pick an area that hasen\'t already been picked...';
		}
	}
	addToList();
}

function addBackgroundImage(boxClicked) {
	for (var i = 0; i < playerBox.length; i++) {
		if (boxClicked == playerBox[i]) {
			playerBox[i].style.backgroundImage = hotPicList[i];
		}
	}
	return;
}

function addToList() {
	var playerList = []
	
	for (var i = 0; i < playerBox.length; i++) {
		
		if (playerBox[i].textContent === 'X' && checkPlayersTurn[0].textContent === 'Player X\'s Turn!') {
			playerList.push(i);
	
		} else if (playerBox[i].textContent === 'O' && checkPlayersTurn[0].textContent === 'Player O\'s Turn!') {
					playerList.push(i);
		} else {

		}
	}// end of for loop
	checkForWin(playerList);
}

function checkForWin(playerList) {
	var counter = 0;
	var possibleWinningCombos = [
				[0, 1, 2],
				[0, 3, 6],
				[0, 4, 8],
				[1, 4, 7],
				[2, 5, 8],
				[2, 4, 6],
				[3, 4, 5],
				[6, 7, 8]
			];
			
	for (var i = 0; i < possibleWinningCombos.length; i++) {
		for (var j in possibleWinningCombos[i]) {
			
			if (playerList.indexOf(possibleWinningCombos[i][j]) === -1) {
				counter = 0;
			} else {
				counter = counter + 1;
					if (counter === 3) {
						winner();
					}
			}
		} // 2nd for loop
		counter = 0;
	} // 1st for loop 
	changePlayer();
}


function winner() {
	var popup = document.getElementById('popup');
	var currentBackgroundColor = document.getElementById('background');
	var counter = 0;
	
	popup.style.display = 'block';
	
	var backgroundColorChange = setInterval(function() {
  		if (counter == 51) {
  			resetGame();
  		} else if (currentBackgroundColor.className === 'color1') {
  			currentBackgroundColor.className = 'color2';
  		} else if (currentBackgroundColor.className === 'color2') {
  			currentBackgroundColor.className = 'color3';
		} else {
  			currentBackgroundColor.className = 'color1';
  		}
  		counter++;

 	}, 50);
 }

function resetGame() {
	location.reload();
}






