import express from "express";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import queryString from "node:querystring";
import axios from "axios";

(() => {
  const app = express();
  const port = 3000;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const VIEWS_DIR = resolve(__dirname, "./views");

  app.set("view engine", "pug");
  app.set("views", VIEWS_DIR);

  app.get("/login", (req, resp) => {
    const stringifiedParams = queryString.stringify({
      client_id:
        "926020480348-kck92t4bla7pivjt88j800nm72rt33pl.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/api/auth/google",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });

    resp.render("login", {
      googleLoginUrl: `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
    });
  });

  const getAccessTokenFromCode = async (code) => {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id:
          "926020480348-kck92t4bla7pivjt88j800nm72rt33pl.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: "http://localhost:3000/api/auth/google",
        grant_type: "authorization_code",
        code,
      },
    });
    return data.access_token;
  };

  const getGoogleUserInfo = async (access_token) => {
    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  };

  app.get("/api/auth/google", async (req, res) => {
    const token = await getAccessTokenFromCode(req.query.code);
    const user = await getGoogleUserInfo(token);
    res.send(user);
  });

  app.get("/ping", (req, res) => {
    res.send("PONG");
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
})();
