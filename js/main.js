//variables
const theButtons = document.querySelectorAll("#buttonHolder img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    dropZones = document.querySelectorAll(".drop-zone"),
    resetButton = document.querySelector('#resetBut'); //Fix bug#2: reset Button was created
//store the dragged piece in a global variable
//we will need it in the handleDrop function    
let draggedPiece;

function changeBGImage(e) {
    console.log("Change BGImage called");
    //Method 1
    // console.log(this.id);
    // background-image: url('../images/backGround0.jpg');
    // puzzleBoard.style.backgroundImage = `url('./images/backGround${this.id}.jpg')`;

    //Method 2
    console.log("Changing background image to", e.currentTarget.id);
    puzzleBoard.style.backgroundImage = `url('./images/backGround${e.currentTarget.id}.jpg')`;
    
    //Bug#2
    const puzzleId = e.currentTarget.id;
    const pieceNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    
    puzzlePieces.forEach((piece, index) => {
        piece.src = `./images/${pieceNames[index]}${puzzleId}.jpg`;
    });

    resetPieces();
}

function handleStartDrag() {
    //console.log("Started dragging this piece:", this)
    draggedPiece = this;
}

function handleDragOver(e) {
    e.preventDefault();
    //this will prevent the default dragover behaviour
    //e is short for event, could be e, evt a well
    console.log("dragged over me");
}

function handleDrop(e) {
    e.preventDefault();
    console.log("dropped something on me");
    //this line moves the dragged piece from the left side of the board
    //into whatever dropzone we choose.
    this.appendChild(draggedPiece);
}

function resetPieces() {
    console.log("Resetting pieces to their original positions");
    puzzlePieces.forEach(piece => document.querySelector('.puzzle-pieces').appendChild(piece));
}

//event Listeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage)); 

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

//Add eventListener for bug#2
resetButton.addEventListener('click', resetPieces);