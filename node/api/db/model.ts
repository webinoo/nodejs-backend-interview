import config from "./knexfile";
import { isEmpty, isInt, isURL } from "validator";
import { isEqual } from "lodash";
import { events } from "../common/events";
import { ValidationError } from "../common/errors";

const knex = require("knex");
const Bookshelf = require("bookshelf");

const environment = process.env.NODE_ENV || "development";
const bookshelf = Bookshelf(knex(config[environment]));

export const User = bookshelf.model("User", {
  tableName: "User",
  hasTimestamps: ["createdAt", "updatedAt"],
});

const isManuallyChanged = (currentModel, previousModel): boolean => {
  const removeAttr = ["id", "createdAt", "updatedAt", "checkedAt", "userId"];
  const compared = [{ ...currentModel }, { ...previousModel }];
  for (let c of compared) {
    for (let r of removeAttr) {
      delete c[r];
    }
  }
  return !isEqual(compared[0], compared[1]);
};

export const MonitorEndpoint = bookshelf.model("MonitorEndpoint", {
  tableName: "MonitorEndpoint",
  results() {
    return this.hasMany(MonitorResult, "monitorEndpointId");
  },
  user() {
    return this.belongsTo(User, "userId");
  },
  hasTimestamps: ["createdAt", "updatedAt"],

  initialize() {
    this.constructor.__super__.initialize.apply(this, arguments);
    this.on("saving", (model, attrs, options) => {
      if (isEmpty(attrs.name, { ignore_whitespace: true })) {
        throw new ValidationError("Parameter name: is required");
      }
      if (!isInt(attrs.monitorInterval.toString(), { min: 3, max: 3600 })) {
        throw new ValidationError(
          "Parameter monitorInterval: must be integer in range of 3 to 3600 seconds"
        );
      }
      if (
        !isURL(attrs.url, {
          protocols: ["http", "https"],
          require_tld: false,
          require_protocol: true,
          require_host: true,
          require_valid_protocol: true,
        })
      ) {
        throw new ValidationError(
          "Parameter url: must be valid and include protocol (http or https)"
        );
      }
    });
    this.on("created", (model, options) => {
      events.emit("startMonitor", model.toJSON());
    });
    this.on("updated", (model, options) => {
      // restart monitor only if there was a manual change
      const currentModel = model.toJSON();
      if (isManuallyChanged(currentModel, model.previousAttributes())) {
        events.emit("restartMonitor", currentModel);
      }
    });
    this.on("destroying", (model, options) => {
      events.emit("stopMonitor", model.toJSON());
    });
  },
});

export const MonitorResult = bookshelf.model("MonitorResult", {
  tableName: "MonitorResult",
  endpoint() {
    return this.belongsTo(MonitorEndpoint);
  },
  user() {
    return this.belongsTo(User, "userId").through(
      MonitorEndpoint,
      "monitorEndpointId"
    );
  },
  hasTimestamps: ["createdAt"],
});
