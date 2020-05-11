import * as timer from "./timer";
import * as run from "./run";
import * as monitor from "./monitor";
import * as dbcontroller from "../db/controller";
import { endpointMock, endpointsAllMock } from "./mock";

jest.useFakeTimers();

jest.mock("../db/model", () => ({}));

const spyRunTimer = jest.spyOn(timer, "runTimer");
const spyStopTimer = jest.spyOn(timer, "stopTimer");
const spyRun = jest.spyOn(run, "run").mockImplementation(jest.fn());
const spyGetAllEndpoints = jest
  .spyOn(dbcontroller, "getAllEndpoints")
  .mockImplementation(() => Promise.resolve(endpointsAllMock));

describe("Monitor tests", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Test startOne", () => {
    monitor.startOne(endpointMock);
    jest.runOnlyPendingTimers();
    expect(spyRunTimer).toHaveBeenCalledTimes(1);
    expect(spyRunTimer).toHaveBeenCalledWith(
      endpointMock.monitorInterval,
      endpointMock.id,
      expect.any(Function)
    );
    expect(spyRun).toHaveBeenCalledTimes(1);
    expect(spyRun).toHaveBeenCalledWith(endpointMock);
  });

  it("Test restartOne", () => {
    monitor.restartOne(endpointMock);
    jest.runOnlyPendingTimers();
    expect(spyStopTimer).toHaveBeenCalledTimes(1);
    expect(spyStopTimer).toHaveBeenCalledWith(endpointMock.id);
    expect(spyRunTimer).toHaveBeenCalledTimes(1);
    expect(spyRunTimer).toHaveBeenCalledWith(
      endpointMock.monitorInterval,
      endpointMock.id,
      expect.any(Function)
    );
    expect(spyRun).toHaveBeenCalledTimes(1);
    expect(spyRun).toHaveBeenCalledWith(endpointMock);
  });

  it("Test stopOne", () => {
    monitor.stopOne(endpointMock);
    jest.runOnlyPendingTimers();
    expect(spyStopTimer).toHaveBeenCalledTimes(1);
    expect(spyStopTimer).toHaveBeenCalledWith(endpointMock.id);
  });

  it("Test startAll", async () => {
    await monitor.startAll();
    jest.runOnlyPendingTimers();
    expect(spyGetAllEndpoints).toHaveBeenCalledTimes(1);
    expect(spyRunTimer).toHaveBeenCalledTimes(endpointsAllMock.length);
  });
});
