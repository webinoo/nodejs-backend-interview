import * as download from "./download";
import { run } from "./run";
import { endpointMock, downloadMock, resultMock } from "./mock";
import * as dbcontroller from "../db/controller";

const spyDownload = jest
  .spyOn(download, "download")
  .mockImplementation(() => Promise.resolve(downloadMock));
const spySaveResult = jest
  .spyOn(dbcontroller, "saveResult")
  .mockImplementation(() => Promise.resolve(resultMock));
const spyUpdateEndpoint = jest
  .spyOn(dbcontroller, "updateEndpointById")
  .mockImplementation(jest.fn());

jest.mock("../db/model", () => ({}));

console.log = jest.fn();

describe("Monitor Run tests", () => {
  it("Test run", async () => {
    await run(endpointMock);
    expect(spyDownload).toHaveBeenCalledTimes(1);
    expect(spySaveResult).toHaveBeenCalledTimes(1);
    expect(spyUpdateEndpoint).toHaveBeenCalledTimes(1);
  });
});
