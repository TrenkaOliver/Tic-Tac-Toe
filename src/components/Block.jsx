import { useState } from 'react';
import XO from './XO.jsx'

export default function Block({row, column, isRed, playerClick, isGame}) {
    
    const [isClicked, changeIsClicked] = useState(false);
    const [iR, cIR] = useState(true)

    function onClick() {
        if(!isClicked) {
            changeIsClicked(true);
            cIR(isRed);
            playerClick(row, column);
        }
    }

    return (
        <button className="block" onClick={onClick} disabled={!isGame}>
            {isClicked && (iR ? <XO isRed={true}/> : <XO isRed={false}/>)}
        </button>
    );
}