import expensesService from "../2.services/expenses.service.js";
import {error} from "../../helpers/error.js";
import colors from 'colors/safe.js';
import db from '../3.model/db.js'

class ExpensesController {

  expensesAdd = async (req , res) => {

    db.beginTransaction(async function(err){
      try { 
        if (err) throw err

        const response = await expensesService.expensesAdd(req.body)

        await (async () =>{
          db.commit(function(err) {
            if (err) {
              db.rollback(function() {
                throw err;
              });
            }
          })
        })()

        return res.status(200).json({
          status:'success',
          data:response
        });
        
      } catch (e) {
            db.rollback();
            error(res,e)
      }
    })
  };

  getExpensesByUserId = async (req , res) => { 
    try {
      const response = await expensesService.getExpensesByUserId(req.body)

      return res.status(200).json({
        status:'success',
        data:response
      });

    } catch (e) {
      error(res,e)
    }
  };

  updateChannelbyDiscordId = async (req , res) => {
    db.beginTransaction(async function(err){
      try { 
        if (err) throw err

        const response = await expensesService.updateChannelbyDiscordId(req.body)

        await (async () =>{
          db.commit(function(err) {
            if (err) {
              db.rollback(function() {
                throw err;
              });
            }
          })
        })()

        return res.status(200).json({
          status:'success',
          data:response
        });
        
      } catch (e) {
            db.rollback();
            error(res,e)
      }
    })

  };

  deleteUserById = async (req , res) => { 
   
    db.beginTransaction(async function(err){
      try { 
        if (err) throw err

        const response = await serviceUser.deleteUserById(req.params)

        await (async () =>{
          db.commit(function(err) {
            if (err) {
              db.rollback(function() {
                throw err;
              });
            }
          })
        })()

        return res.status(200).json({
          status:'success',
          data:response
        });
        
      } catch (e) {
            db.rollback();
            error(res,e)
      }
    })
      
  };

};
  
export default new ExpensesController();