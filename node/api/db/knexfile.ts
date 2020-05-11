import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      user: "myuser",
      password: "123",
      database: "interview",
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      user: "myuser",
      password: "123",
      database: "interview",
    },
  },
};
