import { MonitorEndpointType } from "../common/types";
import { download } from "./download";
import { saveResult, updateEndpointById } from "../db/controller";

const log = (row: MonitorEndpointType) => {
  console.log(`Monitor ${row.id} - ${row.name}`);
};

export const run = async (row: MonitorEndpointType) => {
  log(row);
  const { statusCode, payload } = await download(row.url);
  console.log("Status", statusCode);

  const resultJson = await saveResult(statusCode, payload, row.id);
  updateEndpointById(row.id, { checkedAt: resultJson.createdAt });
};
