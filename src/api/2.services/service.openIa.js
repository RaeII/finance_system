// import provider from "../../config/ethers.provider.js";
import openai from "../../loaders/openIA.js";

class OpenIaService {

  models = async () => {
    
    return await openai.listModels();

  };



}

export default new OpenIaService();





