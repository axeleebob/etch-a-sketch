//creates an ncol by nrow grid of blocks
const createGrid = function (ncol, nrow) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    for (i = 0; i < nrow; i++) {
        grid.appendChild(createGridRow(ncol));
    }
    return grid;
};

//do not use i instead of j. This interupts the for loop of createGrid()
const createGridRow = function (ncol) {
    const gridRow = document.createElement("div");
    gridRow.classList.add("grid-row");
    for (j = 0; j < ncol; j++) {
        gridRow.appendChild(createBlock());
    }
    return gridRow;
};

const createBlock = function () {
    const block = document.createElement("div");
    block.classList.add("block");
    return block;
};

const highlightBlock = function (mouseenter) {
    if (!mouseenter.target.classList.contains("selected")) {
        mouseenter.target.classList.add("selected");
    }
};

//add event listeners to blocks to listen for mouseenter
const addGridFunctionality = function () {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach(block => block.addEventListener("mouseenter", e => highlightBlock(e)));
}

//adds the grid to grid-container and adds event listeners
const addGrid = function (ncol, nrow) {
    if (ncol < 0 || nrow < 0) return;
    ncol = Math.min(ncol, 100);
    nrow = Math.min(nrow, 100);
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.appendChild(createGrid(ncol, nrow));
    addGridFunctionality();
}

//helper function for prompting the user for a grid size
const promptSize = function (again = false) {
    let gridSizeRaw = null;
    if (again) {
        gridSizeRaw = prompt("The number must be a positive integer. Please enter the grid size (n x n)");
    } else {
        gridSizeRaw = prompt("Please enter the grid size (n x n)");
    }
    //return escape "ESCAPE PROMPT" in case user cancelled the prompt
    if (gridSizeRaw === null) return "ESCAPE PROMPT";
    //parseInt from the option. test is performed in the calling function to test this is a number
    return parseInt(gridSizeRaw);
}

const resetGrid = function () {
    document.querySelector(".grid").remove();
    let gridSize = promptSize();    
    //loops through to ask for an positive number
    let keepGoing = true;
    while (keepGoing) {
        //checks if "cancel" was selected in the prompt. returns addGrid(0, 0) to ensure there is a
        //grid in place to remove if reset is hit again
        if (gridSize === "ESCAPE PROMPT") {
            return addGrid(0, 0);
        } else {
            if (Number.isInteger(gridSize)) {
                keepGoing = false;
            } else {
                gridSize = promptSize(again = true);
            }
        }
    }
    //add grid requires ncol and nrow so send gridSize twice
    addGrid(gridSize, gridSize);
};

//add event listener to reset button
const reset = document.querySelector(".reset-button");
reset.addEventListener("click", e => resetGrid())

//call to add the initial grid to the screen on load
addGrid(16, 16);