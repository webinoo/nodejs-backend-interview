import { Request, Response, Next } from "restify";
import { AuthorizationError, ValidationError } from "../common/errors";
import { authorize } from "./middlewares";
import {
  saveEndpoint,
  updateEndpointById,
  deleteEndpointById,
  getEndpoint,
  getEndpointWithResults,
  getAllEndpointsByUserId,
} from "../db/controller";

export const createEndpoint = async (
  req: Request,
  res: Response,
  next: Next
) => {
  try {
    console.log("createEndpoint");
    const json = await saveEndpoint(
      {
        name: req.params.name,
        url: req.params.url,
        monitorInterval: req.params.monitorInterval,
      },
      req.params.user.id
    );

    console.log(json);
    res.send(json);
  } catch (e) {
    if (e instanceof ValidationError) {
      res.send(400, e.message);
    } else {
      res.send(400, "Error");
    }
  }
  return next(false);
};

export const readEndpoint = async (req: Request, res: Response, next: Next) => {
  console.log("readEndpoint");
  try {
    const json = await getEndpointWithResults(req.params.id);

    authorize(req.params.user.id, json.userId);

    console.log(json);
    res.send(json);
  } catch (e) {
    if (e instanceof AuthorizationError) {
      res.send(401, e.message);
    } else {
      res.send(400, "Error");
    }
  }
  return next(false);
};

export const updateEndpoint = async (
  req: Request,
  res: Response,
  next: Next
) => {
  try {
    console.log("updateEndpoint");
    let json = await getEndpoint(req.params.id);

    authorize(req.params.user.id, json.userId);

    json = await updateEndpointById(json.id, {
      name: req.params.name,
      url: req.params.url,
      updatedAt: new Date(),
      monitorInterval: req.params.monitorInterval,
    });

    console.log(json);
    res.send(json);
  } catch (e) {
    if (e instanceof ValidationError) {
      res.send(400, e.message);
    } else if (e instanceof AuthorizationError) {
      res.send(401, e.message);
    } else {
      res.send(400, "Error");
    }
  }
  return next(false);
};

export const deleteEndpoint = async (
  req: Request,
  res: Response,
  next: Next
) => {
  try {
    console.log("deleteEndpoint");
    const json = await getEndpoint(req.params.id);

    authorize(req.params.user.id, json.userId);

    await deleteEndpointById(req.params.id);
    res.send(200);
  } catch (e) {
    if (e instanceof AuthorizationError) {
      res.send(401, e.message);
    } else {
      res.send(400, "Error");
    }
  }
  return next(false);
};

export const replaceEndpoint = async (
  req: Request,
  res: Response,
  next: Next
) => {
  try {
    console.log("replaceEndpoint");
    let json = await getEndpoint(req.params.id);

    authorize(req.params.user.id, json.userId);

    json = await updateEndpointById(req.params.id, {
      name: req.params.name,
      url: req.params.url,
      createdAt: new Date(),
      checkedAt: null,
      monitorInterval: req.params.monitorInterval,
    });

    console.log(json);
    res.send(json);
  } catch (e) {
    if (e instanceof ValidationError) {
      res.send(400, e.message);
    } else if (e instanceof AuthorizationError) {
      res.send(401, e.message);
    } else {
      res.send(400, "Error");
    }
  }
  return next(false);
};

export const listEndpoints = async (
  req: Request,
  res: Response,
  next: Next
) => {
  console.log("listEndpoints");
  try {
    const json = await getAllEndpointsByUserId(req.params.user.id);
    console.log(json);
    res.send(json);
  } catch (e) {
    res.send(400, "Error");
  }
  return next(false);
};
