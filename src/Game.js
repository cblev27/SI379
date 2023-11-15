// Game.js
import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

const generateRandomColor = () => {
  return {
    red: Math.floor(Math.random() * 256),
    green: Math.floor(Math.random() * 256),
    blue: Math.floor(Math.random() * 256),
  };
};

const Game = () => {
  const [targetColor, setTargetColor] = useState(generateRandomColor());

  const handleColorGuess = (guess) => {
    // Implement your logic for handling the color guess here
    console.log('User guessed:', guess);
  };

  const changeTargetColor = () => {
    setTargetColor(generateRandomColor());
  };

  return (
    <div>
      <h1>Color Guesser Game</h1>
      <div
        style={{
          backgroundColor: `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`,
          width: '100px',
          height: '100px',
        }}
      ></div>
      <ColorPicker handleGuess={handleColorGuess} />
      <button onClick={changeTargetColor}>Change Target Color</button>
    </div>
  );
};

export default Game;



