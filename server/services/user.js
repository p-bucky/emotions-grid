const { v4: uuidv4 } = require("uuid");
const { knex } = require("../database/query-builder");
const { pgClient } = require("../database");

const createUser = async (personId, firstName, lastName) => {
    const query = knex("users")
        .insert({
            person_id: personId,
            first_name: firstName,
            last_name: lastName,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }).onConflict("person_id").ignore()
        .returning("*")
        .toString();

    const result = await pgClient.query(query);
    return result;
};
module.exports = { createUser };
