class BoardSquare {
	constructor(element, color) {
		this.element = element;
		this.color = color;
	}

	setColor(color) {
		const faceUpElement = this.element.getElementByClassName("face-up")[0];
		this.color = color;
		faceUpElement.classList.add(color);
	}
}

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

generateBoardSquares();