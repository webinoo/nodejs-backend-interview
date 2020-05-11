import { MonitorResult, MonitorEndpoint, User } from "./model";
import {
  MonitorEndpointType,
  MonitorResultType,
  UserType,
} from "../common/types";

export const getUser = async (accessToken: string): Promise<UserType> =>
  (
    await User.forge({ accessToken }).fetch({
      required: true,
    })
  ).toJSON();

export const saveResult = async (
  statusCode: number,
  payload: string,
  monitorEndpointId: number
): Promise<MonitorResultType> =>
  (
    await MonitorResult.forge({
      statusCode,
      payload,
      monitorEndpointId,
    }).save()
  ).toJSON();

export const getResult = async (id: number): Promise<MonitorResultType> =>
  (
    await MonitorResult.forge({
      id,
    }).fetch({
      required: true,
      withRelated: ["user"],
    })
  ).toJSON();

export const saveEndpoint = async (
  props: Partial<MonitorEndpointType>,
  userId: number
): Promise<MonitorEndpointType> =>
  (
    await MonitorEndpoint.forge({
      name: props.name,
      url: props.url,
      monitorInterval: props.monitorInterval,
      userId: userId,
    }).save()
  ).toJSON();

export const updateEndpointById = async (
  id: number,
  props: Partial<MonitorEndpointType>
): Promise<MonitorEndpointType> => {
  const endpointModel = await MonitorEndpoint.forge({ id }).fetch({
    required: true,
  });
  return (await endpointModel.set(props).save()).toJSON();
};

export const deleteEndpointById = async (
  id: number
): Promise<MonitorEndpointType> => {
  const endpointModel = await MonitorEndpoint.forge({ id }).fetch({
    required: true,
  });
  return endpointModel.destroy();
};

export const getEndpoint = async (id: number): Promise<MonitorEndpointType> =>
  (
    await MonitorEndpoint.forge({ id }).fetch({
      required: true,
    })
  ).toJSON();

export const getEndpointWithResults = async (
  id: number
): Promise<MonitorEndpointType> =>
  (
    await MonitorEndpoint.forge({ id }).fetch({
      required: true,
      withRelated: [
        {
          results: (qb) => {
            qb.limit(10);
            qb.orderBy("createdAt", "desc");
          },
        },
      ],
    })
  ).toJSON();

export const getAllEndpointsByUserId = async (
  userId: number
): Promise<MonitorEndpointType[]> =>
  (
    await MonitorEndpoint.query((q) => q.orderBy("updatedAt", "desc"))
      .where({ userId: userId }) // authorization
      .fetchAll()
  ).toJSON();

export const getAllEndpoints = async (): Promise<MonitorEndpointType[]> =>
  (await MonitorEndpoint.fetchAll()).toJSON();
