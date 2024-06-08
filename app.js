document.addEventListener("DOMContentLoaded", function() {
    var currentColor = "white";
    var currentBoardCells = ["board40", "board41", "board42", "board43"];
    var currentPegCells = ["peg40", "peg41", "peg42", "peg43"]
    var currentRow = 11;
    var possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
    var hasWon = false;

    var cell1Color, cell2Color, cell3Color, cell4Color;

    //dictionary of colors
    var colors = {
        "rgb(0, 128, 0)": "green",
        "rgb(255, 255, 0)": "yellow",
        "rgb(255, 0, 0)": "red",
        "rgb(0, 0, 255)": "blue",
        "rgb(255, 192, 203)": "pink",
        "rgb(255, 165, 0)": "orange"
    }

    //create the random color code
    var code = [
        possibleColors[Math.floor(Math.random()*6)], 
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)]
    ];
    
    console.log(code);

    //create the cells and add them to the board
    let board = document.querySelector('.board');
    for (let i = 0; i < 44; i++) {
        let cell = document.createElement('div');
        cell.className = 'boardCell';
        cell.id = 'board' + i;
        board.appendChild(cell);
    }


    //create cells for the pegs
    let pegs = document.querySelector('.pegs');
    for (let i = 0; i < 44; i++) {
        let cell = document.createElement('div');
        cell.className = 'pegCell';
        cell.id = 'peg' + i;
        pegs.appendChild(cell);
    }


    // Change the style of the board so you can view the rows
    board = document.querySelector('.board');
    board.style.gridTemplateRows = 'repeat(11, 40px)';
    board.style.gridTemplateColumns = 'repeat(4, 45px)';

    let boardCells = document.querySelectorAll('.boardCell');
    boardCells.forEach(cell => {
        cell.style.border = '0.2vw solid black';
        cell.style.margin = '0.2vw 0.5vw';
        cell.style.borderRadius = '50%';
        cell.style.backgroundColor = 'white';
    });

    // Change the style of the pegs
    pegs = document.querySelector('.pegs');
    pegs.style.gridTemplateRows = 'repeat(22, 20px)';
    pegs.style.gridTemplateColumns = 'repeat(2, 20px)';

    let pegCells = document.querySelectorAll('.pegCell');
    pegCells.forEach(cell => {
        cell.style.border = '1px solid black';
        cell.style.borderRadius = '50%';
        cell.style.backgroundColor = 'gray';
    });


        // Add colors to the color board
    let colorCells = document.querySelectorAll('.color');
    colorCells.forEach(cell => {
        let color = cell.id;
        cell.style.backgroundColor = color;
    });

    // Change the current color when the user clicks on the color board
    colorCells.forEach(cell => {
        cell.addEventListener('click', function() {
            let color = this.id;
            currentColor = color;
            document.querySelector('.currentColor').style.backgroundColor = color;
        });
    });

    // Change the color of a board cell on click
    boardCells = document.querySelectorAll('.boardCell');
    boardCells.forEach(cell => {
        cell.addEventListener('click', function() {
            let id = this.id;

            if (isValid(id)) {
                this.style.backgroundColor = currentColor;
            }
        });
    });

    // Do actions when the submit button is clicked
    let submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', function() {
        updatePegs();
        checkWin();
        changeCurrentRow();
    });


    //change the valid board cells to click on
    function changeCurrentRow(){
        currentRow -= 1;
        var mult = 4;

        currentBoardCells = [
            "board" + (currentRow*mult-4), 
            "board" + (currentRow*mult-3), 
            "board" + (currentRow*mult-2), 
            "board" + (currentRow*mult-1)];
        currentPegCells = [
            "peg" + (currentRow*mult-4), 
            "peg" + (currentRow*mult-3), 
            "peg" + (currentRow*mult-2), 
            "peg" + (currentRow*mult-1)];
    }

    //check whether the cell clicked on is valid
    function isValid(id){
        if(currentBoardCells.includes(id) && hasWon === false){
            return true;
        }
        return false;
    }

    //check if the player has won
    function checkWin() {
        if (code[0] === cell1Color &&
            code[1] === cell2Color &&
            code[2] === cell3Color &&
            code[3] === cell4Color) {
            hasWon = true;
            document.querySelector(".success").classList.remove("d-none");
            document.querySelector("body").style.overflowY = "hidden";
            setTimeout(() => {
                document.querySelector(".success").classList.add("d-none");
                document.querySelector("body").style.overflowY = "visible";
            }, 3000);
            // Set the colors of the code box
            document.getElementById("secretColor1").style.backgroundColor = code[0];
            document.getElementById("secretColor2").style.backgroundColor = code[1];
            document.getElementById("secretColor3").style.backgroundColor = code[2];
            document.getElementById("secretColor4").style.backgroundColor = code[3];
        }
        
        return hasWon;
    }
    

    //change the pegs depending on the cell colors
    function updatePegs() {
        let cell1 = document.getElementById(currentBoardCells[0]);
        let cell2 = document.getElementById(currentBoardCells[1]);
        let cell3 = document.getElementById(currentBoardCells[2]);
        let cell4 = document.getElementById(currentBoardCells[3]);
    
        cell1Color = colors[getComputedStyle(cell1).backgroundColor];
        cell2Color = colors[getComputedStyle(cell2).backgroundColor];
        cell3Color = colors[getComputedStyle(cell3).backgroundColor];
        cell4Color = colors[getComputedStyle(cell4).backgroundColor];
    
        let peg1 = document.getElementById(currentPegCells[0]);
        let peg2 = document.getElementById(currentPegCells[1]);
        let peg3 = document.getElementById(currentPegCells[2]);
        let peg4 = document.getElementById(currentPegCells[3]);
    
        let pegs = [peg1, peg2, peg3, peg4];
    
        let filledPegs = [];
        let chosenCells = [];
        let codeCopy = [...code];
    
        function setPegColor(pegIndex, color) {
            pegs[pegIndex - 1].style.backgroundColor = color;
        }
    
        function removeColorFromCodeCopy(color) {
            let index = codeCopy.indexOf(color);
            if (index > -1) {
                codeCopy.splice(index, 1);
            }
        }
    
        function handleCorrectColor(cellColor, cellIndex) {
            if (code[cellIndex] === cellColor) {
                let num = randomNum14(filledPegs);
                filledPegs.push(num);
                removeColorFromCodeCopy(cellColor);
                chosenCells.push(cellIndex + 1);
                setPegColor(num, "red");
            }
        }
    
        handleCorrectColor(cell1Color, 0);
        handleCorrectColor(cell2Color, 1);
        handleCorrectColor(cell3Color, 2);
        handleCorrectColor(cell4Color, 3);
    
        function handleIncludedColor(cellColor, cellIndex) {
            if (codeCopy.includes(cellColor) && !chosenCells.includes(cellIndex + 1)) {
                let num = randomNum14(filledPegs);
                filledPegs.push(num);
                setPegColor(num, "white");
            }
        }
    
        handleIncludedColor(cell1Color, 0);
        handleIncludedColor(cell2Color, 1);
        handleIncludedColor(cell3Color, 2);
        handleIncludedColor(cell4Color, 3);
    }
    
    function randomNum14(nums) {
        let num = Math.floor(Math.random() * 4) + 1;
        while (nums.includes(num)) {
            num = Math.floor(Math.random() * 4) + 1;
        }
        return num;
    }
    

    //choose a random number from 1-4 that is not in the given array
    function randomNum14(nums){
        //generate a number from 1-4
        let num = Math.floor(Math.random()*4) + 1;
        //while that number has already been chosen
        //  choose another one
        while(nums.includes(num)){
            num = Math.floor(Math.random()*4) + 1;
        }
        return num;
    }
});

//Start Game functionality


var playerName;
document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".startgame").addEventListener("click", function(){
        document.querySelector(".starting").style.display = "none";
        document.querySelector(".playInfo").classList.remove("d-none");
        document.querySelector(".playInfo").classList.add("d-block");
        
    });
})

function go_game(){
    document.querySelector(".playInfo").classList.remove("d-block");
    document.querySelector(".playInfo").classList.add("d-none");
    document.querySelector(".content").classList.remove("d-none");
    document.querySelector(".content").classList.add("d-block");

}






//Go Button functionality
var playInfo = document.querySelector(".playInfo");


document.addEventListener("DOMContentLoaded", ()=>{
    let playerNameField = document.querySelector("#playerName");
    let goButton = document.querySelector(".go");
    goButton.addEventListener("click", function(){

        let length = playerNameField.value.length;
        if(length === 0){
            let errordisplay = document.querySelector(".danger");
            errordisplay.style.display = "block";
            setTimeout(() => {
                errordisplay.style.display = "none";
            }, 5000);
        }

        else{
            document.querySelector(".playInfo").style.display = "none";
            playerName = playerNameField.value;
            document.querySelector("#player").innerHTML = playerName;
            document.querySelector(".masterMindImage").style.display = "none";
            document.querySelector(".content").style.display = "block";
        }
    })
})



//Exit Button
document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".exit_button").addEventListener("click", ()=>{
        location.reload();
    })
})




function closeRules(){
    document.querySelector(".Rules").classList.add("animate__animated", "animate__fadeOutBottomLeft", "animate__faster");
    setTimeout(() => {
    document.querySelector("body").style.overflowY = "visible";
        document.querySelector(".Rules").style.display = "none";
        
    }, 1500);
}
function openRule(){
    document.querySelector(".Rules").style.display = "block";
    document.querySelector(".Rules").classList.add("animate__animated", "animate__fadeInBottomRight", "animate__faster");
    document.querySelector("body").style.overflowY = "hidden";
    setTimeout(() => {
        document.querySelector(".Rules").classList.remove("animate__animated", "animate__fadeIn", "animate__faster");
        
    }, 1500);
}
