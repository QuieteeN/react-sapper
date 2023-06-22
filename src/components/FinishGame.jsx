import React, { useContext } from "react";
import Button from "./Button";
import { PlayPageContext } from "./PlayPage";

export default function FinishGame() {
    const { handleClickNewPlay, gameResult } = useContext(PlayPageContext);

    const text = (gameResult) ? "You Win!!! Apologize!!!" : "You Lose :( Don't Worry" 

    return(
        <div className="modal">
            <div className="modal_content">
                <p>{text}</p>
                <Button handleClick={() => {handleClickNewPlay()}} name={"New Game"} />
            </div>
        </div>
    )


}