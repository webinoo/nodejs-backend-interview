import { runTimer, stopTimer } from "./timer";
import { run } from "./run";
import { MonitorEndpointType } from "../common/types";
import { getAllEndpoints } from "../db/controller";

export const startOne = (row: MonitorEndpointType) => {
  runTimer(row.monitorInterval, row.id, () => run(row));
};

export const restartOne = (row: MonitorEndpointType) => {
  stopTimer(row.id);
  runTimer(row.monitorInterval, row.id, () => run(row));
};

export const stopOne = (row: MonitorEndpointType) => {
  stopTimer(row.id);
};

export const startAll = async () => {
  const monitors: MonitorEndpointType[] = await getAllEndpoints();
  for (let m of monitors) {
    startOne(m);
  }
};
