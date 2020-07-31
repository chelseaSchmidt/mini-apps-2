import React from 'react';
import { func, bool } from 'prop-types';

const PinSelector = ({ bowl, newTurn }) => {
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
              return <button type="button" key={`button-${num}`} id={`button-${num}`} onClick={bowl}>{num}</button>;
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
};
