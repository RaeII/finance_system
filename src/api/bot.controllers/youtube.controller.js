import youtubeService from "../2.services/youtube.service.js";
import {error} from "../../helpers/error.js";
import colors from 'colors/safe.js';

class YoutubeController {

  transcription = async (data) => {

    const response = await youtubeService.transcription(data)
    return response
  };

}
  
export default new YoutubeController();