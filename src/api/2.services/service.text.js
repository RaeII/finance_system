import openai from "../../loaders/openIA.js";
import axios from 'axios';


class textService {

 davinci = async (data) => {
   
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: data.prompt,
        max_tokens: data.max_tokens,
        temperature: data.temperature,
    });

    return response
 }

 GPT3_5 = async (data) => {
   
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: data.max_tokens,
        temperature: data.temperature,
        messages: data.messages,
        n: 1,
        stop: null,
    });

    return response
 }

}

export default new textService();





