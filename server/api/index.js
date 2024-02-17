const express = require("express");
const authApi = require("./auth")

function configureApi() {
  const router = express.Router();

  router.get("/auth/google", authApi.initiateGoogleOauth);
  router.get("/auth/google/callback", authApi.googleOauthCallback);

  return router;
}

module.exports = { configureApi };
