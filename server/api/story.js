const storyService = require("../services/story");
const locationService = require("../services/location");
const { isSecureHost } = require("../utils/request");

const createStory = async (req, resp) => {
  try {
    console.log(req.body)

    const personId = req.user.userId;
    const ip = isSecureHost(req.get("host"))
      ? req?.header("x-forwarded-for")
      : "122.162.145.11";

    const story = req.body.story;
    const emotion = req.body.emotion;

    const location = await locationService.getCountryAndCity(ip);
    const newStory = await storyService.createStory(
      personId,
      story,
      location.city,
      location.country,
      emotion
    );
  } catch (err) {
    console.log(err);
    resp.json({ message: "Something went wrong" }).status(500);
  }
};

const getAllStory = () => {
  // read all story
};

module.exports = { createStory, getAllStory };
