import React from 'react';
import PinSelector from './PinSelector';
import { getMaxPins } from '../utilities/pinAnalyzers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      round: 1,
      newTurn: false,
      maxPins: 10,
    };
    this.bowl = this.bowl.bind(this);
    this.resetPins = this.resetPins.bind(this);
  }

  bowl(e) {
    const { pins, round } = this.state;
    const numPins = Number(e.target.id.slice(7));
    const targetPin = Math.floor(Math.random() * 10);

    let pinsLeft = Math.min(Math.floor(Math.random() * (numPins - 1)), targetPin);
    const pinsRight = Math.min(numPins - 1 - pinsLeft, 9 - targetPin);

    if (pinsLeft + pinsRight + 1 < numPins) {
      pinsLeft += numPins - pinsLeft - pinsRight - 1;
    }

    const startIndex = targetPin - pinsLeft;
    const endIndex = targetPin + pinsRight;

    let changeTurn = false;
    let incrementor = 1;
    if (round === 2) {
      changeTurn = true;
      incrementor = -1;
    }

    const newPinState = pins.map((pin, i) => {
      if (i >= startIndex && i <= endIndex) {
        return 0;
      }
      return 1;
    });

    this.setState({
      pins: newPinState,
      round: round + incrementor,
      newTurn: changeTurn,
      maxPins: getMaxPins(newPinState),
    });
  }

  resetPins() {
    this.setState({
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      round: 1,
      newTurn: false,
      maxPins: 10,
    });
  }

  render() {
    const { pins, newTurn, maxPins } = this.state;
    return (
      <div>
        <div id="pin-area">
          {pins.map((pin, i) => {
            if (pin === 1) {
              return <div className="up-pin" key={`${i}-pin`} />;
            }
            return <div className="down-pin" key={`${i}-pin`} />;
          })}
        </div>
        <button type="button" hidden={!newTurn} onClick={this.resetPins}>Reset Pins</button>
        <PinSelector bowl={this.bowl} newTurn={newTurn} maxPins={maxPins} />
      </div>
    );
  }
}
