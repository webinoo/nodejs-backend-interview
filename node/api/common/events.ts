import { EventEmitter } from "events";
import { MonitorEndpointType } from "./types";
import { startOne, restartOne, stopOne } from "../monitor/monitor";

export const events = new EventEmitter();

events.on("startMonitor", (row: MonitorEndpointType) => {
  console.log(`startMonitor ${row.id}`);
  startOne(row);
});
events.on("restartMonitor", (row: MonitorEndpointType) => {
  console.log(`restartMonitor ${row.id}`);
  restartOne(row);
});
events.on("stopMonitor", (row: MonitorEndpointType) => {
  console.log(`stopMonitor ${row.id}`);
  stopOne(row);
});
