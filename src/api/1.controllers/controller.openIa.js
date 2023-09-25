import serviceBlock from "../2.services/service.openIa.js";
import colors from 'colors/safe.js';

class OpenIaController {

  models = async (req , res) => {
    
    await serviceBlock.models()
    .then((res) => {
      console.log(colors.yellow('RESPONSE'))
      console.log(res?.data)
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
      return res.status(400).json(false);  
    })


    return await res.status(200).json(true);
  };

  
}

export default new OpenIaController();
