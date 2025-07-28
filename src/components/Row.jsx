import Block from "./Block";

export default function Row({ r, length, isRed, playerClick, isGame }) {
    const row = []

    for (let i = 0; i < length; i++) {
        row.push(<Block key={i} isLast={i === length - 1} isRed={isRed} playerClick={playerClick} row={r} column={i} isGame={isGame}/>);
    }

    return (
        <div className="row">{row}</div>
    );
}