import { createServer, plugins } from "restify";
import {
  readEndpoint,
  createEndpoint,
  replaceEndpoint,
  updateEndpoint,
  deleteEndpoint,
  listEndpoints,
} from "./resolvers/endpoint";
import { readResult } from "./resolvers/result";
import { authenticate } from "./resolvers/middlewares";
import { startAll } from "./monitor/monitor";

startAll();

const server = createServer();
server.use(
  plugins.bodyParser({
    mapParams: true,
  }),
  plugins.queryParser({
    mapParams: true,
  }),
  authenticate
);

// REST = CRUD + replace + list
server.post("/endpoint", createEndpoint);
server.get("/endpoint/:id", readEndpoint);
server.patch("/endpoint/:id", updateEndpoint);
server.del("/endpoint/:id", deleteEndpoint);
server.put("/endpoint/:id", replaceEndpoint);
server.get("/endpoint", listEndpoints);

server.get("/result/:id", readResult);

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
