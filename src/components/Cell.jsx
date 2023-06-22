import React, { useEffect } from "react";
import Bomb from "./Bomb";

export default function Cell({ cellInfo, indexes, handleClick, cellIsActive, isLose, bombs }) {

    const isBomb = setIsBomb();

    let classes;

    if (cellIsActive[indexes.row][indexes.column]) {
        classes = "active_cell";
    } else {
        classes = "cell";

        let top,
            right,
            bottom,
            left;

        if (indexes.row !== 0) {
            top = cellIsActive[indexes.row - 1][indexes.column];
        }

        if (indexes.row !== cellIsActive.length - 1) {
            bottom = cellIsActive[indexes.row + 1][indexes.column]
        }

        if (indexes.column !== 0) {
            left = cellIsActive[indexes.row][indexes.column - 1];
        }

        if (indexes.column !== cellIsActive[indexes.row].length - 1) {
            right = cellIsActive[indexes.row][indexes.column + 1]
        }

        if (top) {
            classes += " top_border";
        }
        if (right) {
            classes += " right_border";
        }
        if (bottom) {
            classes += " bottom_border";
        }
        if (left) {
            classes += " left_border";
        }

    }

    switch (cellInfo.info) {

        case 1:
            classes += " one";
            break;
        
        case 2:
            classes += " two";
            break;
        
        case 3:
            classes += " three";
            break;
        
        case 4:
            classes += " four";
            break;
        
        case 5:
            classes += " five";
            break;
        
        case 6:
            classes += " six";
            break;

        case 7:
            classes += " seven";
            break;
            
        case 8:
            classes += " eight";
            break;

    }
        

    classes = ((indexes.column + indexes.row) % 2 === 1) ? classes + " blacked" : classes; 
    classes = (isLose && isBomb) ? classes + " lose" : classes;

    function setIsBomb() {
        for (let i = 0; i < bombs.length; i++) {
            if (bombs[i].row === indexes.row && bombs[i].column === indexes.column) {
                return true;
            }
        }
        return false;
    }

    return(
        <div 
            className={classes} 
            onClick={() => {
                handleClick(indexes.row, indexes.column);
        }}>
            <span className="info">{(cellInfo.info === 0) ? '' : (cellInfo.info === -1) ? <Bomb /> : cellInfo.info}</span>
        </div>
    )

}