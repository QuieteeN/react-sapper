import React, { useContext } from "react";
import Button from "./Button";
import { PlayPageContext } from "./PlayPage";

export default function PlaySettings() {
    const { handleClickContinue, handleClickNewPlay } = useContext(PlayPageContext);

    return(
        <div className="modal">
           <div className="modal_content">
                <Button handleClick={() => {handleClickNewPlay()}} name={"New Game"} />
                <Button handleClick={() => {handleClickContinue(false)}} name={"Continue"} />
           </div>
        </div>
    )

}