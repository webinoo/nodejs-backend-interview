import { Request, Response, Next } from "restify";
import { authorize } from "./middlewares";
import { AuthorizationError } from "../common/errors";
import { getResult } from "../db/controller";

export const readResult = async (req: Request, res: Response, next: Next) => {
  console.log("readResult");
  try {
    const result = await getResult(req.params.id);

    authorize(req.params.user.id, result.user.id);

    console.log(result);
    res.send(result);
  } catch (e) {
    if (e instanceof AuthorizationError) {
      res.send(401, e.message);
    } else {
      res.send(400, "Error");
    }
  }
  return next(false);
};
