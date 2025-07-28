import Row from "./Row";
import Result from "./Result";

export default function Table({xSize, ySize, isRed, playerClick, isGame, isDraw}) {
    let table = [];

    for (let i = 0; i < ySize; i++) {
        table.push(<Row key={i} length={xSize} isRed={isRed} playerClick={playerClick} r={i} isGame={isGame}/>);
    }

    return (
        <div className="table">
            {table}
            <Result isGame={isGame} isRed={isRed} isDraw={isDraw}/>
        </div>
    )
}