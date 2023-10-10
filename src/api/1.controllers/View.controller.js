import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const pathPublic = '../../../public'

class ViewController {

  home = async (req , res) => {
    return res.sendFile('finance.html', { root: 'public' });
  };
  stages = async (req , res) => {
    console.log('PATH',path.join(__filename,pathPublic,'stages.html'))
    return res.sendFile('stages.html', { root: 'public',});
  };

};
  
export default new ViewController();