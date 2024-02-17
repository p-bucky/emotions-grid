require("dotenv").config();
const express = require("express");
const { configureApi } = require("./api");
const setupSession = require("./session");

const port = process.env.PORT;

(async () => {
  const app = express();

  await setupSession(app);
  app.use("/api", configureApi());

  app.get("/ping",async (req, res) => {
    res.json({ ok: "pong", env: process.env.NODE_ENV });
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();
