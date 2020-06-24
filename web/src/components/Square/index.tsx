import React from 'react';
import './styles.css'

interface Props {
    key: number;
    value: string;
    handleClick: () => void;
}

const Square: React.FC<Props> = (props) => {

    return (
      <button
        className="square"
        onClick={props.handleClick}
      >
        {props.value}
      </button>
    );
}

export default Square;