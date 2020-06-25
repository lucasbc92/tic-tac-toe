import React from 'react';
import Square from '../Square';
import './styles.css';

interface Props {
    grid: number;
    squares: string[];
    handleClick: (i: number) => void;
}

const Board: React.FC<Props> = ({grid, squares, handleClick}) => {

    function renderSquare(i: number) {
        return (
         <Square
          key={i}
          value={squares[i]}
          handleClick={() => handleClick(i)} 
         />
        );
    }

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
        {boardRows}
      </div>
    );
}

export default Board;