import React from 'react';
import PinSelector from './PinSelector';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    };
    this.bowl = this.bowl.bind(this);
  }

  bowl(e) {
    const { pins } = this.state;
    const numPins = Number(e.target.id.slice(7));
    const targetPin = Math.floor(Math.random() * 10);

    let pinsLeft = Math.min(Math.floor(Math.random() * (numPins - 1)), targetPin);
    const pinsRight = Math.min(numPins - 1 - pinsLeft, 9 - targetPin);

    if (pinsLeft + pinsRight + 1 < numPins) {
      pinsLeft += numPins - pinsLeft - pinsRight - 1;
    }

    const startIndex = targetPin - pinsLeft;
    const endIndex = targetPin + pinsRight;

    this.setState({
      pins: pins.map((pin, i) => {
        if (i >= startIndex && i <= endIndex) {
          return 0;
        }
        return 1;
      }),
    });
  }

  render() {
    const { pins } = this.state;
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
        <PinSelector bowl={this.bowl} />
      </div>
    );
  }
}
