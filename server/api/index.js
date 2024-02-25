const express = require("express");
const authApi = require("./auth");
const storyApi = require("./story");
const authService = require("../services/auth");

function configureApi() {
  const router = express.Router();

  router.get("/auth/google", authApi.initiateGoogleOauth);
  router.get("/auth/google/callback", authApi.googleOauthCallback);

  router.post("/story", authService.authenticateToken, storyApi.createStory);
  router.get("/stories", storyApi.getAllStory);

  return router;
}

module.exports = { configureApi };
