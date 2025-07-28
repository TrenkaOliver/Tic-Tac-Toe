import { useState } from "react";
import Table from "./components/Table";
import Option from "./components/Option";
import XO from "./components/XO";

export default function App() {
    const [rows, changeRows] = useState(3);
    const [columns, changeColumns] = useState(3);
    const [countToWin, changeCountToWin] = useState(3);
    const [isRed, changeIsRed] = useState(Math.random() < 0.5);
    const [redPoints, changeRedPoints] = useState(0);
    const [bluePoints, changeBluePoints] = useState(0);
    const [tableKey, changeTableKey] = useState(0);
    const [isGame, changeIsGame] = useState(true);
    const [isOptions, changeIsOptions] = useState(true);
    const [map, changeMap] = useState(createMap(3, 3));
    const [isDraw, changeIsDraw] = useState(false);


    function createMap(Rows = rows, Columns = columns) {
        let b = [];

        for (let r = 0; r < Rows; r++) {
            for (let c = 0; c < Columns; c++) {
                b.push({'row': r, 'column': c, 'state': '-'});
            }
        }

        return b;
    }

    function update(updated) {
        const newRows = updated.Rows ?? rows;
        const newColumns = updated.Columns ?? columns;
        const newCountToWin = updated.Strikes ?? countToWin;

        changeRows(newRows);
        changeColumns(newColumns);
        changeCountToWin(newCountToWin);

        changeMap(createMap(newRows, newColumns));
    }

    
    function reset() {
        changeMap(createMap(rows, columns))
        changeTableKey(prev => prev + 1);
        changeIsRed(Math.random() < 0.5);
        changeIsGame(true);
        changeIsOptions(true);
        changeIsDraw(false);
    }

    function playerClick(row, column) {
        if(isOptions)
            changeIsOptions(false);

        const state = isRed ? 'X' : 'O';

        const newMap = map.map(block =>
                (block.row === row && block.column === column) ? 
                {...block, 'state': state} : block
        )

        changeMap(newMap);
        changeIsRed(!isRed);

        let r = 0;
        let c = 0;
        let v1 = 0;
        let v2 = 0;
        let empty = 0

        for (const block of newMap) {
            if(block.state === state) {
                if(block.row === row)
                    r++;
                if(block.column === column)
                    c++;
                if(block.row - block.column === row - column)
                    v1++;
                if(block.row + block.column === row + column)
                    v2++;
            }
            else if(block.state === '-') {
                empty++;
            }
        }

        if(r >= countToWin || c >= countToWin || v1 >= countToWin || v2 >= countToWin) {
            changeIsGame(false);
            changeIsOptions(true);

            if(state === 'X')
                changeRedPoints(prev => prev + 1);
            else
                changeBluePoints(prev => prev + 1);
        }
        else if(empty === 0) {
            changeIsGame(false)
            changeIsOptions(true);
            changeIsDraw(true);
        }
    }

    return (
        <div className="app-container">
            <div className="table-container">
                <div className="turn-container"><p>Next player:</p><XO isRed={isRed}/></div>
                <Table key={tableKey} xSize={rows} ySize={columns} isRed={isRed} playerClick={playerClick} isGame={isGame} isDraw={isDraw}/>
                <div className="score-container">
                    <div className="score">
                        <p className="red">X:</p><p>{redPoints}</p>
                    </div>
                    <div className="score">
                        <p className="blue">O:</p><p>{bluePoints}</p>
                    </div>
                </div>
            </div>
            <div className="options-container">
                <h2>Options</h2>
                <Option variable={rows} variableName={'Rows'} updateFunction={update} isOptions={isOptions}/>
                <Option variable={columns} variableName={'Columns'} updateFunction={update} isOptions={isOptions}/>
                <Option variable={countToWin} variableName={'Strikes'} updateFunction={update} isOptions={isOptions}/>
                
                <button onClick={reset}>New Game</button>
            </div>
        </div>
    );
}