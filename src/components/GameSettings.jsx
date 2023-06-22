import React, { useEffect, useState } from "react";
import Button from "./Button";
import GameHeader from "./GameHeader";

export default function GameSettings({ handleClickBeginGame, handleClickCancel }) {

    const [complexity, setComplexity] = useState("");

    function handleRadioChange(checkedRadioButton) {
        setComplexity(checkedRadioButton.target.value);
    }

    useEffect(() => {
        setComplexity("infant");
    }, [])

    return(
        <>  
            <GameHeader />
            <div className="content">
                <div className="complexity">
                    <fieldset>
                        <legend>Select a game's complexity</legend>

                        <div>
                            <input type="radio" id="infant" name="complexity" value="infant" defaultChecked onChange={handleRadioChange} />
                            <label htmlFor="infant">Infant</label>
                        </div>

                        <div>
                            <input type="radio" id="easy" name="complexity" value="easy" onChange={handleRadioChange} />
                            <label htmlFor="easy">Easy</label>
                        </div>

                        <div>
                            <input type="radio" id="normal" name="complexity" value="normal" onChange={handleRadioChange} />
                            <label htmlFor="normal">Normal</label>
                        </div>

                        <div>
                            <input type="radio" id="hard" name="complexity" value="hard" onChange={handleRadioChange} />
                            <label htmlFor="hard">Hard</label>
                        </div>

                        <div>
                            <input type="radio" id="super_hard" name="complexity" value="super_hard" onChange={handleRadioChange} />
                            <label htmlFor="super_hard">Super hard</label>
                        </div>
                    </fieldset>
                </div>
                <div className="footer_btns">
                    <Button handleClick={handleClickCancel} name={"Cancel"} />
                    <Button handleClick={() => (handleClickBeginGame(complexity))} name={"Begin Game"} />
                </div>
            </div>
        </>
    )

}