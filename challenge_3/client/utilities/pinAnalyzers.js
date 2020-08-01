export const getMaxPins = (pins) => {
  let maxConsecutive = 0;
  let currentConsecutive = 0;
  pins.forEach((pin) => {
    if (pin === 1) {
      currentConsecutive += 1;
      if (currentConsecutive > maxConsecutive) {
        maxConsecutive = currentConsecutive;
      }
    } else {
      currentConsecutive = 0;
    }
  });
  return maxConsecutive;
};

export const getPinRanges = (pins) => {
  const pinRanges = [];
  let currentRange = [];
  pins.forEach((pin, i) => {
    if (pin === 1) {
      currentRange.push(i);
      if (i === 9) {
        pinRanges.push(currentRange);
      }
    } else if (currentRange.length > 0) {
      pinRanges.push(currentRange);
      currentRange = [];
    }
  });
  return pinRanges;
};
