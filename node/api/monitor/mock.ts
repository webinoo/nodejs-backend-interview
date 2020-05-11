import {
  MonitorEndpointType,
  DownloadResultType,
  MonitorResultType,
} from "../common/types";

export const endpointMock: MonitorEndpointType = {
  id: 1,
  name: "Test name 01",
  url: "http://testurl01",
  createdAt: new Date(),
  updatedAt: new Date(),
  checkedAt: null,
  monitorInterval: 60,
  userId: 1,
};

const incId = (endpointMock: MonitorEndpointType): MonitorEndpointType => ({
  ...endpointMock,
  id: endpointMock.id + 1,
});

const endpoints = [{ ...endpointMock }];
for (let i = 1; i < 10; i++) {
  endpoints.push(incId(endpoints[endpoints.length - 1]));
}
export const endpointsAllMock = endpoints;

export const resultMock: MonitorResultType = {
  id: 1,
  createdAt: new Date(),
  statusCode: 200,
  payload: "<h1>Hello World</h1>",
  monitorEndpointId: 1,
};

export const downloadMock: DownloadResultType = {
  statusCode: 200,
  payload: "<h1>Hello World</h1>",
};
