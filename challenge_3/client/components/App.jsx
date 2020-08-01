import React from 'react';
import PinSelector from './PinSelector';
import { getMaxPins, getPinRanges } from '../utilities/pinAnalyzers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      round: 1,
      newTurn: false,
      maxPins: 10,
      pinRanges: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
    };
    this.bowl = this.bowl.bind(this);
    this.resetPins = this.resetPins.bind(this);
  }

  bowl(e) {
    const { pins, round, pinRanges } = this.state;
    // number of pins to knock down
    const numPins = Number(e.target.id.slice(7));

    const rangeIndex = Math.floor(Math.random() * pinRanges.length);

    // which range of available indexes to target
    const targetRange = pinRanges[rangeIndex];

    // index of target pin index
    const targetPinIndex = Math.floor(Math.random() * targetRange.length);

    // target pin index
    const targetPin = targetRange[targetPinIndex];

    let pinsLeft = Math.min(Math.floor(Math.random() * (numPins - 1)), targetPin);
    const pinsRight = Math.min(numPins - 1 - pinsLeft, targetRange.length - 1 - targetPin);

    if (pinsLeft + pinsRight + 1 < numPins) {
      pinsLeft += numPins - pinsLeft - pinsRight - 1;
    }

    const startIndex = targetRange[targetPin - pinsLeft];
    const endIndex = targetRange[targetPin + pinsRight];

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
      return pin;
    });

    this.setState({
      pins: newPinState,
      round: round + incrementor,
      newTurn: changeTurn,
      maxPins: getMaxPins(newPinState),
      pinRanges: getPinRanges(newPinState),
    });
  }

  resetPins() {
    this.setState({
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      round: 1,
      newTurn: false,
      maxPins: 10,
      pinRanges: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
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
