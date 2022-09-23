"use strict";

const getTimeNow = () => Date.now();
const getTomorrowTime = () => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0);
  tomorrow.setMilliseconds(0);
  return tomorrow.getTime();
};

export { getTimeNow, getTomorrowTime };
