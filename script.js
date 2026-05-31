const board=document.getElementById("sudoku-board");

for(let i=0;i<81;i++){
    let cell=document.createElement("input");
    cell.type="text";
    cell.maxLength=1;
    board.appendChild(cell);
}

function getBoard(){
    let cells=document.querySelectorAll("#sudoku-board input");

    let sudoku=[];

    for(let i=0;i<9;i++){
        sudoku.push([]);

        for(let j=0;j<9;j++){
            let value=cells[i*9+j].value;
            sudoku[i].push(value==="" ? 0 : parseInt(value));
        }
    }

    return sudoku;
}

function setBoard(sudoku){
    let cells=document.querySelectorAll("#sudoku-board input");

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            cells[i*9+j].value=sudoku[i][j];
        }
    }
}

function isSafe(board,row,col,digit){

    for(let i=0;i<9;i++)
        if(board[i][col]===digit)
            return false;

    for(let j=0;j<9;j++)
        if(board[row][j]===digit)
            return false;

    let sr=Math.floor(row/3)*3;
    let sc=Math.floor(col/3)*3;

    for(let i=sr;i<sr+3;i++){
        for(let j=sc;j<sc+3;j++){
            if(board[i][j]===digit)
                return false;
        }
    }

    return true;
}

function solver(board,row,col){

    if(row===9)
        return true;

    let nextRow=row;
    let nextCol=col+1;

    if(col+1===9){
        nextRow=row+1;
        nextCol=0;
    }

    if(board[row][col]!==0)
        return solver(board,nextRow,nextCol);

    for(let digit=1;digit<=9;digit++){

        if(isSafe(board,row,col,digit)){

            board[row][col]=digit;

            if(solver(board,nextRow,nextCol))
                return true;

            board[row][col]=0;
        }
    }

    return false;
}

function solveSudoku(){

    let sudoku=getBoard();

    let start=performance.now();

    if(solver(sudoku,0,0)){

        setBoard(sudoku);

        let end=performance.now();

        document.getElementById("status").innerHTML=
        `Solved in ${(end-start).toFixed(2)} ms ⚡`;
    }
    else{
        document.getElementById("status").innerHTML=
        "No solution exists";
    }
}

function clearBoard(){

    document
    .querySelectorAll("#sudoku-board input")
    .forEach(cell=>cell.value="");

    document.getElementById("status").innerHTML="";
}

function loadSample(){

    let sample=[
    [0,0,8,0,0,0,0,0,0],
    [4,9,0,1,5,7,0,0,2],
    [0,0,3,0,0,4,1,9,0],
    [1,8,5,0,6,0,0,2,0],
    [0,0,0,0,2,0,0,6,0],
    [9,6,0,4,0,5,3,0,0],
    [0,3,0,0,7,2,0,0,4],
    [0,4,9,0,3,0,0,5,7],
    [8,2,7,0,0,9,0,1,3]
    ];

    setBoard(sample);
}