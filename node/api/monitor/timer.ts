const timersIndex = {};

export const runTimer = (monitorInterval: number, id: number, cb: Function) => {
  timersIndex[id] = setInterval(() => cb(), monitorInterval * 1000);
};

export const stopTimer = (id: number) => {
  clearInterval(timersIndex[id]);
  delete timersIndex[id];
};
