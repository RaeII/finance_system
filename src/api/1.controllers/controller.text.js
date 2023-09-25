import serviceText from "../2.services/service.text.js";
import colors from 'colors/safe.js';

class textController {

  davinci = async (req , resp) => {

    await serviceText.davinci(req.body)
    .then((res) => {
      console.log(colors.yellow('RESPONSE'))
      console.log(res?.data)
      return resp.status(200).json(res?.data); 
    })
    .catch( error => {
      console.log(colors.red('ERROR'))
    if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
         
        console.log(error.request);
      } else {
      
        console.log('Error', error.message);
      }
      return resp.status(400).json(false); 
    })    

  };

  GPT3_5 = async (req , resp) => {

    await serviceText.GPT3_5(req.body)
    .then((res) => {
      console.log(colors.yellow('RESPONSE'))
      console.log(res?.data)
      return resp.status(200).json(res?.data); 
    })
    .catch( error => {
      console.log(colors.red('ERROR'))
    if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
         
        console.log(error.request);
      } else {
      
        console.log('Error', error.message);
      }
      return resp.status(400).json(false); 
    })    

  };


};
  
export default new textController();
