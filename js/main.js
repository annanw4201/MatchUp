class BoardSquare {
	constructor(element, color) {
		this.element = element;
		this.setColor(color);
		this.isFaceUp = false;
		this.isMatched = false;
	}

	setColor(color) {
		const faceUpElement = this.element.getElementsByClassName("face-up")[0];
		this.color = color;
		faceUpElement.classList.add(color);
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

// randomly shuffle the array
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