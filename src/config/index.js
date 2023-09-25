import dotenv from "dotenv";
import env from './env.js'

const envFound = dotenv.config({ path: `.env.${env}` });

if (envFound.error) {

  throw new Error("Couldn't find .env file.");
}

export default {

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ORGANIZATION: process.env.OPENAI_ORGANIZATION,

  MYSQL_HOSTNAME: process.env.MYSQL_HOSTNAME,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_NAME: process.env.MYSQL_NAME,
  MYSQL_PORT: process.env.MYSQL_PORT,

};
