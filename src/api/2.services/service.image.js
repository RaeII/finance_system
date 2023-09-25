import openai from "../../loaders/openIA.js";
import path from 'path'
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathImage = path.join(__dirname, '../../images/')


class ImageService {

  createImage = async (prompt) => {

    const responseBase64 = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format:'b64_json',
      user:'Rael'
    });

    //await fs.writeFile(`${pathImage}image_${Date.now()+short()}.png`, responseBase64.data.data[0].b64_json, { encoding: 'base64' }).then(res => true) 
    return responseBase64.data.data[0].b64_json
     
  };

}

export default new ImageService();





