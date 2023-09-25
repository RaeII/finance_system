import youtubeService from "../2.services/youtube.service.js";
import {error} from "../../helpers/error.js";
import colors from 'colors/safe.js';

class YoutubeController {

  transcription = async (req , res) => {

    try { 
     
      const response = await youtubeService.transcription(req.body)
      return res.status(200).json({
        status:'success',
        data:response
      });
      
    } catch (e) {
        console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiii')
        error(res,e)
    }
   
  };

};
  
export default new YoutubeController();