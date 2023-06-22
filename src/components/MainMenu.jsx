import React from "react";
import GameHeader from "./GameHeader";
import Button from "./Button";

export default function MainMenu({ handleClickPlay }) {

    return (
        <main className="menu">
            <GameHeader />
            <div className="content">
                <Button handleClick={handleClickPlay} name={"Play"} />
                <Button handleClick={() => {}} name={"About Game"} />
            </div>
        </main>
    )

}