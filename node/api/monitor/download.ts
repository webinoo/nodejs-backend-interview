import axios from "axios";
import { DownloadResultType } from "../common/types";

export const download = async (url: string): Promise<DownloadResultType> =>
  new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(url);
      resolve({ payload: data, statusCode: status });
    } catch (e) {
      if (e.response && e.response.data && e.response.status) {
        resolve({
          payload: e.response.data,
          statusCode: e.response.status,
        });
      } else {
        console.log("AXIOS ERROR: " + e.message);
        resolve({
          payload: e.message,
          statusCode: 0,
        });
      }
    }
  });
