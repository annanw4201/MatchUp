class BoardSquare {
	constructor(element, color) {
		this.element = element;
		this.setColor(color);
		this.isFaceUp = false;
		this.isMatched = false;
		this.element.addEventListener("click", this, false);
	}

	setColor(color) {
		const faceUpElement = this.element.getElementsByClassName("face-up")[0];
		// remove the color if it exists
		faceUpElement.classList.remove(this.color);
		this.color = color;
		faceUpElement.classList.add(color);
	}

	handleEvent(event) {
		switch(event.type) {
			case "click":
			console.log(this.color + " square was clicked");
			if (this.isFaceUp || this.isMatched) {
				return;
			}
			else {
				this.isFaceUp = true;
				this.element.classList.add('flipped');
				flipSquare(this);
			}
		}
	}

	reset() {
		this.isFaceUp = false;
		this.isMatched = false;
		this.element.classList.remove("flipped");
	}

	matchFound() {
		this.isFaceUp = true;
		this.isMatched = true;
	}
}

// insert squares into the game board
function generateBoardSquares() {
	const numberOfSquares = 16;
	const gameBoard = document.getElementById("gameboard");
	const boardSquare = 
	`<div class="col-3 board-square">
	<div class="face-container">
	<div class="face-down"></div>
	<div class="face-up"></div>
	</div>
	</div>`;
	for (var i = 0; i < numberOfSquares; i++) {
		gameboard.innerHTML += boardSquare;
	}
}

// an array stores all the available color pairs for the squares
const colorPairs = [];

function generateColorPairs() {
	if (colorPairs.length > 0) {
		return colorPairs;
	}
	else {
		for (var i = 0; i < 8; i++) {
			colorPairs.push("color-" + i);
			colorPairs.push("color-" + i);
		}
		return colorPairs;
	}
}

// randomly shuffle the array using Fisher–Yates Shuffle
function shuffleArray(array) {
	var currentIndex = array.length;
	var tempValue, randomIndex;

	// while there are remaining elements to shuffle
	while (currentIndex != 0) {
		// pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// swap this random element with current index element
		tempValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempValue;
	}
	return array;
}

// shuffle the color pairs
function shuffleColors() {
	const colorPairs = generateColorPairs();
	return shuffleArray(colorPairs);
}

// flip the square
var firstFaceUpSquare = null;

function flipSquare(square) {
	if (firstFaceUpSquare == null) {
		firstFaceUpSquare = square;
		return;
	}

	if (firstFaceUpSquare.color === square.color) {
		firstFaceUpSquare.matchFound();
		square.matchFound();
		firstFaceUpSquare = null;
	}
	else {
		const a = firstFaceUpSquare;
		const b = square;
		firstFaceUpSquare = null;
		setTimeout(function() {
			a.reset();
			b.reset();
		}, 400);
	}
}

// reset the game state
function resetGame() {
	// reset the first face up square if not null
	firstFaceUpSquare = null;

	// reset state for each sqaure
	boardSquares.forEach(square => {
		square.reset();
	});

	// for each sqaure update new random colors
	setTimeout(function() {
		const randomColorPairs = shuffleColors();
		for (var i = 0; i < boardSquares.length; i++) {
			const newColor = randomColorPairs[i];
			const square = boardSquares[i];
			square.setColor(newColor);
		}
	}, 500);
}

// handling restart button
const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function() {
	console.log("restart button pressed");
	resetGame();
});

// set up the game
const boardSquares = [];

function gameSetup() {
	generateBoardSquares();
	const randomColorPairs = shuffleColors();
	const squareElements = document.getElementsByClassName("board-square");

	for (var i = 0; i < squareElements.length; i++) {
		const element = squareElements[i];
		const color = randomColorPairs[i];
		const square = new BoardSquare(element, color);
		boardSquares.push(square);
	}
}

gameSetup();