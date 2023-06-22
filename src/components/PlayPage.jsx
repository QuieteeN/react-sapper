import React, { createContext, useState } from "react";
import GameHeader from "./GameHeader";
import Board from "./Board";
import settings from '../apps-outline.svg';
import PlaySettings from "./PlaySettings";
import FinishGame from "./FinishGame";

export const PlayPageContext = createContext();

export default function PlayPage({ handleClickPlay, complexity }) {

    const [isActiveSettings, setIsActiveSettings] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [gameResult, setGameResult] = useState(false); 

    function handleClickMenuSettings() {
        setIsActiveSettings(true);
    }

    function handleFinishedGame(gameResult) {
        setIsFinished(true);
        setGameResult(gameResult);
    }


    return(
        <PlayPageContext.Provider
            value={{
                isActiveSettings,
                handleClickContinue: setIsActiveSettings,
                handleClickNewPlay: handleClickPlay,
                complexity,
                handleFinishedGame, 
                gameResult,
            }}>
            <GameHeader />
            <div className="content row">
                <nav className="game_time_menu">
                    <ul>
                        <li className="" onClick={handleClickMenuSettings}><img className="settings_svg" src={settings} alt="" /></li>
                    </ul>
                </nav>
                <div className="game_board">
                    <Board />
                </div>
            </div>
            {(isActiveSettings) ? <PlaySettings /> : 
            (isFinished) ? <FinishGame /> : <></> }
        </PlayPageContext.Provider>
    )

}