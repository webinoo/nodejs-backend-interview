import { Request, Response, Next } from "restify";
import { AuthorizationError } from "../common/errors";
import { getUser } from "../db/controller";

export const authorize = (sessionUserId: Number, recordUserId: Number) => {
  if (sessionUserId !== recordUserId) {
    throw new AuthorizationError("Unauthorized");
  }
};

export const authenticate = async (req: Request, res: Response, next: Next) => {
  try {
    const auth = req.header("Authorization");
    const accessToken = auth.match(/Bearer (.+)/)[1];
    const json = await getUser(accessToken);

    console.log("Authenticated user: " + json.name);
    req.params.user = json;
    return next();
  } catch (e) {
    console.log("Unauthorized");
    res.send(401, "Unauthorized");
    return next(false);
  }
};
