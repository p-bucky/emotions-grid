const { pgClient } = require("../database");
const { knex } = require("../database/query-builder");

const createStory = async (personId, story, city, country, creatorEmotion) => {
  const query = knex("stories")
    .insert({
      person_id: personId,
      story,
      city,
      country,
      creator_emotion: creatorEmotion,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .returning("*")
    .toString();

  const result = await pgClient.query(query);
  console.log(result);
  return result.rows[0];
};

module.exports = {
  createStory,
};
