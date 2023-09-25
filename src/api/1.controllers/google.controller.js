import youtubeService from "../2.services/youtube.service.js";
import {error} from "../../helpers/error.js";
import colors from 'colors/safe.js';
import db from '../3.model/db.js'

class YoutubeController {

  auth = async (req , res) => {

    try { 
      
      console.log(colors.bold.red('===== GOOGLE ====='))
      console.log(res)
      console.log(colors.bold.red('===== GOOGLE ====='))

      return res.status(200).json({
        status:'success',
        data:['dale']
      });
      
    } catch (e) {
          db.rollback();
          error(res,e)
    }
   
  };

};
  
export default new YoutubeController();