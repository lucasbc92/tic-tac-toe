import React, { useState, useMemo } from 'react';
import './Game.css';
// import Square from './components/Square';
import Board from './components/Board';

const Game: React.FC = () => {

    const [grid, setGrid] = useState(3);
    const [history, setHistory] = useState([{
      squares: Array(grid*grid).fill(null)
    }]);
    const [xIsNext, setXIsNext] = useState(true);

    const winningLines: number[][]  = useMemo(() => calculateWinningLines(grid), [grid]);

    function handleClick(i: number) {
        const current = history[history.length-1];
      
        if(calculateWinner(current.squares) || current.squares[i]) {
            return;
        }

        const newSquares = [...current.squares];        
        newSquares[i] = xIsNext ? 'X' : 'O';
        setHistory(
          history.concat([{
            squares: newSquares,
          }])
        );
        setXIsNext(!xIsNext);
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

    function calculateWinner(squares: string[]) {     
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

    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner is:' + winner;
    } else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            grid = {grid}
            squares = {current.squares}
            handleClick = {(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
        <div className="status">{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
    
}

export default Game;