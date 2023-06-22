import React from "react";

export default function Button({ handleClick, name }) {
    
    return(
        <button className="game_btn" onClick={handleClick}>{name}</button>
    )

}