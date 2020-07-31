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
