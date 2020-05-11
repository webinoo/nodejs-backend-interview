import axios from "axios";
import { download } from "./download";
import { endpointMock, downloadMock } from "./mock";

const urlError = "http/somerrorURL.com";
const url404 = "http://google.com/dlkfnlfdnqlfn";

const spyAxiosGet = jest
  .spyOn(axios, "get")
  .mockImplementation((url: string) => {
    if (url === urlError) {
      return Promise.reject({ message: "SOME ERROR" });
    }
    if (url === url404) {
      return Promise.reject({
        response: { data: "404 ERROR PAGE", status: 404 },
      });
    }
    return Promise.resolve(downloadMock);
  });

console.log = jest.fn();

describe("Monitor Download tests", () => {
  it("Test download", async () => {
    await download(endpointMock.url);
    await download(urlError);
    await download(url404);
    expect(spyAxiosGet).toHaveBeenCalledTimes(3);
  });
});
