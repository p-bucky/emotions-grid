require("dotenv").config();
const express = require("express");
const { configureApi } = require("./api");
const setupSession = require("./session");
const compression = require("compression");
const serveStatic = require("serve-static");
const path = require("path");

const port = process.env.PORT;

const SOURCE_PATH = path.resolve(__dirname, "../client/");
const STATIC_BUILD_PATH_CLIENT = path.join(SOURCE_PATH, "out");

console.log(STATIC_BUILD_PATH_CLIENT);
(async () => {
  const app = express();

  app.use(compression());
  app.use(
    serveStatic(STATIC_BUILD_PATH_CLIENT)
  );

  await setupSession(app);
  app.use("/api", configureApi());

  app.get("/ping", async (req, res) => {
    res.json({ ok: "pong", env: process.env.NODE_ENV });
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();
