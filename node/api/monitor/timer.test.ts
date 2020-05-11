import { runTimer, stopTimer } from "./timer";

jest.useFakeTimers();

describe("Monitor Timer tests", () => {
  afterAll(() => {
    jest.clearAllTimers();
  });

  it("Test runTimer and stopTimer", () => {
    const scheduledChecks = [
      { monitorInterval: 1, id: 1, cb: () => {} },
      { monitorInterval: 2, id: 2, cb: () => {} },
      { monitorInterval: 1, id: 3, cb: () => {} },
      { monitorInterval: 2, id: 4, cb: () => {} },
      { monitorInterval: 1, id: 5, cb: () => {} },
      { monitorInterval: 3, id: 6, cb: () => {} },
      { monitorInterval: 1, id: 7, cb: () => {} },
      { monitorInterval: 4, id: 8, cb: () => {} },
      { monitorInterval: 1, id: 9, cb: () => {} },
      { monitorInterval: 3, id: 10, cb: () => {} },
    ];

    for (let sc of scheduledChecks) {
      runTimer(sc.monitorInterval, sc.id, sc.cb);
    }
    expect(setInterval).toHaveBeenCalledTimes(10);

    for (let sc of scheduledChecks) {
      stopTimer(sc.id);
    }
    expect(clearInterval).toHaveBeenCalledTimes(10);
  });
});
