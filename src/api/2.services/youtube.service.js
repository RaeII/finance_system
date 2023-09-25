import colors from 'colors/safe.js';
import youtubedl from 'youtube-dl-exec';
import axios from 'axios'
import {vttToPlainText} from 'vtt-to-text'

class YoutubeService {

  constructor(){
    this.functionsCaption = new Map();
    this.functionsCaption.set('vtt',this.getCaptionFormatVtt)
  }

  getCaptionFormatVtt = async (captionUrl) => {
    const captionVtt = await axios.get(captionUrl)

    const captionText = vttToPlainText(captionVtt.data)

    return captionText

  }

  getCaption = async (captions) => {
    
    if(!captions) throw new Error('O video não possui transcrição para minha análise!')

    const captionPt = {pt : false}

    if(captions.hasOwnProperty('pt-orig')){
      captionPt.pt = captions['pt-orig']

    }else
    if(captions.hasOwnProperty('pt')){
      captionPt.pt = captions.pt
    }

    if(!captionPt.pt) throw new Error('O video não possui transcrição em português!\n'
    +'O programador implementou me mim o inglezão ainda... aguade, tal ok?👉')

    const captionFormat = ['vtt']
    
    const caption = await new Promise((resolve, reject) => {
      try {

        captionFormat.forEach( async format => {
      
          const filterCaption = captionPt.pt.filter(captionUrl => captionUrl.ext == format)
  
          if(filterCaption){
            // console.log(
            //   colors.bold.red('\n===== filterCaption ====\n'),
            //   filterCaption ,
            //   colors.bold.red('\n===== filterCaption ====\n')
            // )
            // console.log(
            //   colors.bold.red('\n===== this.functionsCaption.get(filterCaption.ext) ====\n'),
            //   this.functionsCaption.get(filterCaption[0].ext),
            //   colors.bold.red('\n===== this.functionsCaption.get(filterCaption[0].ext)====\n')
            // )
            const functionCaption = this.functionsCaption.get(filterCaption[0].ext)
            
            const responseCaption = await functionCaption(filterCaption[0].url)
            resolve(responseCaption)
          }
        })
        
      } catch (e) {
        reject(e)
      }
     
    })
    // console.log(
		// 	colors.bold.magenta('\n=====caption (getCaptionFormatVtt) ====\n'),
		// 	caption,
		// 	colors.bold.magenta('\n=====caption (getCaptionFormatVtt)====\n')
		// )

    if(!caption) throw new Error('O video não possui transcrição no formato adequado para minha análise!')
 
    return caption
  }

  transcription = async (data) => {

    const isValidYoutubeLink = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=.+/.test(data.link);

    if(!isValidYoutubeLink) throw new Error('Url invalida!\nUrl não condiz com padrão do YouTube')

    const transcription = {
      title:null,
      tags:null,
      description:null, 
      uploader: null,
      caption:null
    } 
    
    
      const caption = await youtubedl(data.link, {
        dumpSingleJson: true,
        subLang: 'pt',
        writeSub:true,
      }).catch(e => {
        console.log(colors.bold.red('ERROR')+e)
        throw new Error('Não foi possível obter informações da url fornecido!')
      })


    
    if(caption){

      transcription.caption = await this.getCaption(caption?.automatic_captions || '')
      if(!transcription.caption) throw new Error('Não possivel obter informação sobre o video!')

      //transcription.description = caption?.description.replace(/[\n]/g, "") || null;
      transcription.tags = caption?.tags.length > 0 ? caption.tags.join(', ') : '' || '';
      transcription.uploader = caption?.uploader || ''
      transcription.title = caption?.fulltitle || ''
      

    }else{
      throw new Error('Não foi possível obter informações do video para análise')
    }
    // console.log(
    //   colors.bold.red('\n===== transcription ====\n'),
    //   transcription ,
    //   colors.bold.red('\n===== transcription ====\n')
    // )
    return transcription
  }

}

export default new YoutubeService();