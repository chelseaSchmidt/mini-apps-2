import React from 'react';
import { func, bool, number } from 'prop-types';

const PinSelector = ({ bowl, newTurn, maxPins }) => {
  const rows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10],
  ];

  return (
    <div hidden={newTurn}>
      {rows.map((row, i) => {
        return (
          <div className="pin-selector-row" key={`row-${i}`}>
            {row.map((num) => {
              if (num <= maxPins) {
                return <button type="button" key={`button-${num}`} id={`button-${num}`} onClick={bowl}>{num}</button>;
              }
              return <div key={`button-${num}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
export default PinSelector;

PinSelector.propTypes = {
  bowl: func.isRequired,
  newTurn: bool.isRequired,
  maxPins: number.isRequired,
};
