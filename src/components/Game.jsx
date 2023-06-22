import React, { useState } from "react";
import Board from "./Board";
import MainMenu from "./MainMenu";
import GameHeader from "./GameHeader";
import PlayPage from "./PlayPage";
import GameSettings from "./GameSettings";

export default function Game() {

    const [isBeginPlay, setIsBeginPlay] = useState(false);
    const [isOpenPlay, setIsOpenPlay] = useState(false);
    const [complexity, setComplexity] = useState(0);

    let arena = (isOpenPlay) ? <GameSettings handleClickBeginGame={handleClickBeginGame} handleClickCancel={handleClickCancel} /> : 
                (isBeginPlay) ? <PlayPage handleClickPlay={handleClickPlay} complexity={complexity} /> : <MainMenu handleClickPlay={handleClickPlay} />;

    function handleClickPlay() {
        setIsOpenPlay(true);
    }

    function handleClickBeginGame(checkedComplexity) {
        setIsBeginPlay(true);
        setIsOpenPlay(false);
        
        let complexity;
        switch (checkedComplexity) {
            case "infant":
                complexity = 20;
                break;
            case "easy":
                complexity = 40;
                break;
            case "normal":
                complexity = 50;
                break;
            case "hard":
                complexity = 70;
                break;
            case "super_hard":
                complexity = 99;
                break;
        }

        setComplexity(complexity);
    }

    function handleClickCancel() {
        setIsBeginPlay(false);
        setIsOpenPlay(false);
    }

    return (
        <div className="game_arena">
            {arena}
        </div>
    )

}