import { Configuration, OpenAIApi } from "openai";
import env from "../config/index.js";

const configuration = new Configuration({
    organization: env.OPENAI_ORGANIZATION,
    apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default openai

