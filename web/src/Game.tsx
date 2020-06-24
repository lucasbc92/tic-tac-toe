import React from 'react';
import './Game.css';
// import Square from './components/Square';
import Board from './components/Board';

const Game: React.FC = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}

export default Game;