import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    };
    this.throw = this.throw.bind(this);
  }

  throw() {
    const { pins } = this.state;
    const pinIndex = Math.floor(Math.random() * 10);
    const spanLeft = pinIndex - Math.floor(Math.random() * (pinIndex + 1));
    const spanRight = Math.floor(Math.random() * (9 - pinIndex) + pinIndex);
    this.setState({
      pins: pins.map((pin, i) => {
        if (i >= spanLeft && i <= spanRight) {
          return 0;
        } else {
          return 1;
        }
      }),
    });
  }

  render() {
    const { pins } = this.state;
    return (
      <div id="pin-area">
        {pins.map((pin, i) => {
          if (pin === 1) {
            return <div className="up-pin" key={`${i}-pin`} />
          } else {
            return <div className="down-pin" key={`${i}-pin`} />
          }
        })}
        <button type="button" onClick={this.throw}>Throw</button>
      </div>
    );
  }
}
