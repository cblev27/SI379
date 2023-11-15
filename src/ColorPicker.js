// App.js
import './ColorPicker.css'; // Import your CSS file if needed
import Slider from './Slider';
import React, { useState } from 'react';

const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed] = useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue] = useState(getRandomIntegerBetween(MIN, MAX));
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSliderChange = (color, value) => {
    switch (color) {
      case 'red':
        setRed(value);
        break;
      case 'green':
        setGreen(value);
        break;
      case 'blue':
        setBlue(value);
        break;
      default:
        break;
    }
  };

  const handleFeedbackClick = () => {
    setShowFeedback(true);
  };

  return (
    <div className="App">
      <div id="color-preview" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{ backgroundColor: `rgb(255, 0, 0, ${red / MAX})` }}>
            Red:
          </span>
          <Slider min={MIN} max={MAX} startingValue={red} onChange={(r) => handleSliderChange('red', r)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{ backgroundColor: `rgb(0, 255, 0, ${green / MAX})` }}>
            Green:
          </span>
          <Slider min={MIN} max={MAX} startingValue={green} onChange={(g) => handleSliderChange('green', g)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{ backgroundColor: `rgb(0, 0, 255, ${blue / MAX})` }}>
            Blue:
          </span>
          <Slider min={MIN} max={MAX} startingValue={blue} onChange={(b) => handleSliderChange('blue', b)} />
        </div>
        <button onClick={handleFeedbackClick}>Check Your Guess</button>
        {showFeedback && (
          <div>
            <p>Your Guess:</p>
            <div
              style={{
                backgroundColor: `rgb(${red}, ${green}, ${blue})`,
                width: '50px',
                height: '50px',
                border: '1px solid #000',
                marginTop: '10px',
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

