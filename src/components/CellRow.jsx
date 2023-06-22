import React from "react";
import Cell from "./Cell";

export default function CellRow({ rowInfo, handleClick, row, cellIsActive, isLose, bombs }) {

    return(
        <div className="cell_row">
            {rowInfo.map((obj, index) => (
                <Cell 
                    key={index} 
                    cellInfo={obj} 
                    indexes={ { 
                        row: row, 
                        column: index
                    } } 
                    handleClick={handleClick} 
                    cellIsActive={cellIsActive}
                    isLose={isLose}
                    bombs={bombs}
                />) 
            )}
        </div>
    )

}