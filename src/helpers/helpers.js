import axios from "axios";

class Helpers {
    
  async getTextSignature(bytesSignature){
    const type = new Map()
    type.set("0x1249c58b","mint")
    type.set("0xfa2b068f","mint")//mint com id hex
    type.set("0x002398de","mint")
    type.set("0xa0712d68","mint")

    if(!type.get(bytesSignature)) return false

    return type.get(bytesSignature)
  }

  round = (num, places) => {
    if (!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + places)  + "e-" + places);
    } else {
      let arr = ("" + num).split("e");
      let sig = ""
      if (+arr[1] + places > 0) {
        sig = "+";
      }
  
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
    }
  }

  async getAbi(address,network = 1) {
      
    const tokenEth = 'ATVP61HIQ4YUNTBUUES65K1RH1VB94ZJ8Z'
    const url = network == 1 ?
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${tokenEth}` :
      `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${tokenEth}`
    console.log(url)
    const response = await axios.get(url)
    .then(res => res?.data?.result)
    .catch( error => {
    if (error.response) {
         // Request made and server responded
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
      } else if (error.request) {
         // The request was made but no response was received
         console.log(error.request);
        } else {
         // Something happened in setting up the request that triggered an Error
         console.log('Error', error.message);
        }
    })

    console.log('Busca de abi')

    return response
 }
  
}
export default new Helpers();