"use strict";

/**
 * 現在のUNIXタイムスタンプを取得する
 *
 * @returns {number}
 */
const getTimeNow = (): number => Date.now();

/**
 * 日付が1日進んだ0時0分のUNIXタイムスタンプを取得する
 *
 * @returns {number}
 */
const getTomorrowTime = (): number => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0);
  tomorrow.setMilliseconds(0);
  return tomorrow.getTime();
};

export { getTimeNow, getTomorrowTime };
