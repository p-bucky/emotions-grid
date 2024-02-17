let pgClient = null;

const { Client } = require("pg");

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_DB,
} = process.env;

const connectDatabase = async () => {
  try {
    pgClient = new Client({
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASS,
      database: POSTGRES_DB,
      port: 5432,
      ssl: false
    });
    await pgClient.connect();
    console.log("Connected to PostgresSql");
    return pgClient;
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
    return pgClient;
  }
};

(async () => {
  await connectDatabase();
})();

module.exports = { pgClient };
