export type MonitorEndpointType = {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  checkedAt: Date;
  monitorInterval: number;
  userId: number;
};

export type MonitorResultType = {
  id: number;
  createdAt: Date;
  statusCode: number;
  payload: string;
  monitorEndpointId: number;
  user?: UserType;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
};

export type DownloadResultType = {
  statusCode: number;
  payload: string;
};
