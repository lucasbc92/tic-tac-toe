import React, {useState, useMemo} from 'react';
import Square from '../Square';
import './styles.css';

const Board: React.FC = () => {

    const [grid, setGrid] = useState(3);
    const [squares, setSquares] = useState<string[]>(Array(grid*grid).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winningLines: number[][]  = useMemo(() => calculateWinningLines(grid), [grid]);

    function handleClick(i: number) {
        const newSquares = [...squares];

        if(calculateWinner(squares, winningLines) || squares[i]) {
            return;
        }
        
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    function renderSquare(i: number) {
      return (
       <Square
        key={i}
        value={squares[i]}
        handleClick={() => handleClick(i)} 
       />
      );
    }

    function calculateWinningLines(grid: number) {
        const winningLines = [];        
        let nGrid = grid*grid;

        for (let i = 0; i < nGrid; i+=grid) {//checa linhas
          let wLine = [];
            let iGrid = i+grid;
            for (let j = i; j < iGrid; j++) {
                wLine.push(j);
            }
            winningLines.push(wLine);
        }        

        for (let i = 0; i < grid; i++) {//checa colunas
          let wLine = [];
          for (let j = i; j < nGrid; j+=grid) {
            wLine.push(j);
          }
          winningLines.push(wLine);
        }

        let primDiag = [0];      
        for (let i = grid+1; i < nGrid; i+=grid+1) {
            primDiag.push(i);
        }
        winningLines.push(primDiag);

        let secDiag = [grid-1];      
        for (let i = grid-1+grid-1; i < nGrid-grid+1; i+=grid-1) {
            secDiag.push(i);
        }
        winningLines.push(secDiag);

        return winningLines;
    }

    function calculateWinner(squares: string[], winningLines: number[][]) {     
        loop_calcwin:
        for (let i = 0; i < winningLines.length; i++) {
            let wLine = winningLines[i];
            let initialSquare = squares[wLine[0]];
            //console.log('começou: ' + initialSquare);
            if (initialSquare !== null) {
                for (let j = 1; j < grid; j++) {
                    if (initialSquare !== squares[wLine[j]]) {
                        //console.log(initialSquare + ' diff ' + squares[wLine[j]])
                        continue loop_calcwin;
                    } // else console.log(initialSquare + ' === ' + squares[wLine[j]])
                }
                console.log(wLine);
                return squares[wLine[0]];
            }            
        }
        //console.log('ainda nao');        
        return null;
      }

    const winner = calculateWinner(squares, winningLines);
    let status;
    if (winner) {
        status = 'Winner is:' + winner;
    } else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

    const boardRows = [];

    for(let i = 0; i < grid*grid; i+=grid) {
        let currentRow = [];        
        for (let j = i; j < i+grid; j++) {
            currentRow.push(renderSquare(j))
        }
        boardRows.push(<div key={i} className="board-row">{currentRow}</div>);
    }
  
    return (
      <div>
        <div className="status">{status}</div>
        {boardRows}
      </div>
    );
}

export default Board;