const axios = require("axios");
const userService = require("../services/user");

const OAUTH_GOOGLE_CALLBACK = process.env.OAUTH_CALLBACK_URL.replace(
  "{{REDIRECT_BASE_URL}}",
  process.env.REDIRECT_BASE_URL
);
const initiateGoogleOauth = (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.OAUTH_GOOGLE_CLIENT_ID}&redirect_uri=${OAUTH_GOOGLE_CALLBACK}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;

  res.redirect(authUrl);
};

const googleOauthCallback = async (req, res) => {
  const code = req.query.code;

  const tokenUrl = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", process.env.OAUTH_GOOGLE_CLIENT_ID);
  params.append("client_secret", process.env.OAUTH_GOOGLE_CLIENT_SECRET);
  params.append("redirect_uri", OAUTH_GOOGLE_CALLBACK);
  params.append("grant_type", "authorization_code");

  try {
    const tokenResponse = await axios.post(tokenUrl, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const tokenData = tokenResponse.data;

    const userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
    const userInfoResponse = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const userInfo = userInfoResponse.data;

    await userService.createUser(userInfo.sub, userInfo.given_name, userInfo.family_name)
    req.session.isLoggedIn = true
    req.session.user = userInfo
    // res.send("User authenticated: " + userInfo.name);
    res.redirect("http://localhost:3000/")
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).send("Error occurred");
  }
};

module.exports = { initiateGoogleOauth, googleOauthCallback };
