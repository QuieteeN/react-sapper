import React, { useContext, useEffect, useState } from "react";
import CellRow from "./CellRow";
import { PlayPageContext } from "./PlayPage";

export default function Board() {
    const { rowCount, columnCount } = { rowCount: 15, columnCount: 20 };

    const { complexity, handleFinishedGame } = useContext(PlayPageContext);

    const [cells, setCells] = useState( createCell(rowCount, columnCount) );
    const [cellIsActive, setCellIsActive] = useState( createCellsActiveArray(rowCount, columnCount) );
    const [gBombs, setGBombs] = useState([]);
    const [isLose, setIsLose] = useState(false);

    
    function createCellObject(row, column, maxes){
        const top      = row > 0,
              bottom   = row < maxes.row - 1,
              left     = column > 0,
              right    = column < maxes.column - 1;

        let   sibling  = [];


        if (top) {
            sibling = [...sibling, [row - 1, column]];

            if (left) {
                sibling = [...sibling, [row - 1, column - 1]];
            }

            if (right) {
                sibling = [...sibling, [row - 1, column + 1]];
            }
        }

        if (bottom) {
            sibling = [...sibling, [row + 1, column]];

            if (left) {
                sibling = [...sibling, [row + 1, column - 1]];
            }

            if (right) {
                sibling = [...sibling, [row + 1, column + 1]];
            }
        }

        if (left) {
            sibling = [...sibling, [row, column - 1]];
        }

        if (right) {
            sibling = [...sibling, [row, column + 1]];
        }


        return {
            info: 0,
            sibling: sibling,
        }
    }

    // start generating functions
    function createCell(rowsNumber, columnsNumber) {
        let board = [];

        for (let row = 0; row < rowsNumber; row++) {
            let rowCells = [];

            for (let column = 0; column < columnsNumber; column++) {
                const maxes = {
                    row: rowsNumber,
                    column: columnsNumber,
                },
                cell = createCellObject(row, column, maxes);

                rowCells.push(cell);
            }

            board.push(rowCells);
        }

        return board;
    }

    function createCellsActiveArray(rowsNumber, columnsNumber) {
        const row = Array(columnsNumber).fill(false);

        return Array(rowsNumber).fill(row);
    }

    function copyCellIsActive(){
        let board = [],
            row   = [];

        for (let i = 0; i < cellIsActive.length; i++) {
            row = cellIsActive[i].slice();
            board.push(row);
        }

        return board;
    }

    function copyCells() {
        let board = [];

        for (let i = 0; i < cells.length; i++) {
            let row = [];

            for (let j = 0; j < cells[i].length; j++) {
                const cell = Object.assign({}, cells[i][j]);

                row.push(cell);
            }

            board.push(row);
        }

        return board;
    }


    function handleClick(rowIndex, columnIndex) {
        let board = copyCellIsActive();

        board[rowIndex][columnIndex] = true;
        let queue = [ [rowIndex, columnIndex] ];

        updateCellsActive(board, queue);
        
    }

    function updateCellsActive(board, queue) {

        while (queue.length > 0 ) {
            const output   = queue.shift(),
                  row      = output[0],
                  column   = output[1],
                  cellInfo = cells[row][column];


            if (cellInfo.info === 0) {
                const siblings = cellInfo.sibling;

                for (let i = 0; i < siblings.length; i++) {
                    const siblingRow    = siblings[i][0],
                          siblingColumn = siblings[i][1],
                          isActive      = board[siblingRow][siblingColumn];

                    if (!isActive && queue.indexOf(siblings[i]) === -1) {
                        queue.push(siblings[i]);
                    }

                }
            }

            board[row][column] = true;
        }

        setCellIsActive(board);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomCell(rowsCount, columnsCount, bombs) {
        newNums: while (true) {
            const row = getRandomInt(rowsCount),
                  column = getRandomInt(columnsCount);

            for (let i = 0; i < bombs.length; i++) {
                const noValid = bombs[i].row === row && bombs[i].column === column;

                if (noValid) {
                    continue newNums;
                }
            }

            return {
                row,
                column
            }
        }
    }

    function setBombs(bombs) {
        let board = copyCells();

        for (let i = 0; i < bombs.length; i++) {
            const row    = bombs[i].row,
                  column = bombs[i].column;
            let cell   = board[row][column];

            cell.info = -1;
            
            setNumbers(board, cell.sibling);
        }

        setCells(board);
        setGBombs(bombs);
    }

    function setNumbers(board, siblings) {

        for (let i = 0; i < siblings.length; i++) {
            const row    = siblings[i][0],
                  column = siblings[i][1],
                  cell   = board[row][column];

            if (cell.info !== -1 ){
                cell.info += 1;
            }
        }

    }

    function startGame(bombsCount) {
        let bombs = [];

        const rowsCount = cells.length,
              columnsCount = cells[0].length;

        for (let i = 0; i < bombsCount; i++) {
            const bomb = getRandomCell(rowsCount, columnsCount, bombs);
            
            bombs.push(bomb);
        }

        setBombs(bombs);
    }

    function checkFinishGame() {
        let isFinish = true;

        for (let row = 0; row < rowCount; row++) {
            for (let column = 0; column < columnCount; column++) {

                if (cells[row][column].info === -1) {
                    continue;
                }

                if (!cellIsActive[row][column]) {
                    isFinish = false;
                    break;
                }
            }
        }

        return isFinish;
    }

    function checkLoseGame(){

        for (let i = 0; i < gBombs.length; i++) {
            const row = gBombs[i].row;
            const column = gBombs[i].column;

            if (cellIsActive[row][column]) {
                return true;
            }
        }
        return false;
    }

    function loseGame() {
        setIsLose(true);
        handleFinishedGame(false);
    }


    useEffect(() => {
        let bombs;
        switch (complexity) {
            case 20:
                bombs = 1;
                break;
            case 99:
                bombs = rowCount * columnCount - 1;
                break;
            default:
                bombs = Math.ceil((rowCount * columnCount * complexity) / 100) - 100;
                break;
        }
        startGame(bombs);
    }, [])

    useEffect(() => {
        if (checkLoseGame()) {
            loseGame();
        } else if (checkFinishGame()) {
            handleFinishedGame(true);
        } 
    }, [cellIsActive])

    

    return(
        <div className="board">
            {cells.map((rowInfo, index) => (
                <CellRow 
                    rowInfo={rowInfo} 
                    key={index} 
                    handleClick={handleClick} 
                    row={index} 
                    cellIsActive={cellIsActive} 
                    isLose={isLose}
                    bombs={gBombs}
                />
            ) )}
        </div>
    )

}