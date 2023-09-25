import channelService from "../2.services/channel.service.js";
import {errorDiscordBot} from "../../helpers/error.js";
import colors from 'colors/safe.js';
import db from '../3.model/db.js'

class botController {

  create = async (data) => {

   return await new Promise((resolve, reject) => {
      db.beginTransaction(async function(err){
         
        if (err) reject(err)

        try {
          
          const response = await channelService.create(data)

          await (async () =>{
            db.commit(function(err) {
              if (err) {
                db.rollback(function() {
                  reject(err);
                });
              }
            })
          })()

          resolve(response);

        } catch (error) {
          db.rollback();
          reject(error)
        }   
       
      })
    })

  };

  getChannelByDiscordId = async (data) => { 
   
    const response = await channelService.getChannelByDiscordId(data)
    return response
    
  };

  updateChannelbyDiscordId = async (data) => {

    return await new Promise((resolve, reject) => {
      db.beginTransaction(async function(err){
         
        if (err) reject(err)

        try {
          
          const response = await channelService.updateChannelbyDiscordId(data)

          await (async () =>{
            db.commit(function(err) {
              if (err) {
                db.rollback(function() {
                  reject(err);
                });
              }
            })
          })()

          resolve(response);

        } catch (error) {
          db.rollback();
          reject(error)
        }   
       
      })
    })
    

  };

  deleteUserById = async (data) => { 
   
    return await new Promise((resolve, reject) => {
      db.beginTransaction(async function(err){
         
        if (err) reject(err)

        try {
          
          const response = await channelService.updateChannelbyDiscordId(data)

          await (async () =>{
            db.commit(function(err) {
              if (err) {
                db.rollback(function() {
                  reject(err);
                });
              }
            })
          })()

          resolve(response);

        } catch (error) {
          db.rollback();
          reject(error)
        }   
       
      })
    })
      
  };

  

};
  
export default new botController();