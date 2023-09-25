import userService from "../2.services/user.service.js";
import {error} from "../../helpers/error.js";
import colors from 'colors/safe.js';
import db from '../3.model/db.js'

class UserController {

  create = async (req , res) => {

    db.beginTransaction(async function(err){
      try { 
        if (err) throw err

        const response = await userService.create(req.body)

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
          data:[response]
        });
        
      } catch (e) {
            db.rollback();
            error(res,e)
      }
    })
  };

  getUserById = async (req , res) => { 
    try {
      const response = await serviceUser.getUserById(req.params)

      return res.status(200).json({
        status:'success',
        data:[response]
      });

    } catch (e) {
      error(res,e)
    }
  };

  getUsers = async (req , res) => {
    try {
      const response = await serviceUser.getUsers()

      return res.status(200).json({
        status:'success',
        data:[response]
      });

    } catch (e) {
      error(res,e)
    }
  };

  getUsersFilter = async (req , res) => {
    try {
      const response = await serviceUser.getUsersFilter(req.body)

      return res.status(200).json({
        status:'success',
        data:[response]
      });

    } catch (e) {
      error(res,e)
    }
  };

  updateUserbyId = async (req , res) => {
    db.beginTransaction(async function(err){
      try { 
        if (err) throw err

        const response = await serviceUser.updateUserbyId(req.body)

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
          data:[response]
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
          data:[response]
        });
        
      } catch (e) {
            db.rollback();
            error(res,e)
      }
    })
      
  };

  addManager = async (req , res) => {
    db.beginTransaction(async function(err){
      try { 
        if (err) throw err

        const response = await serviceUser.addManager(req.body)

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
          data:[response]
        });
        
      } catch (e) {
            db.rollback();
            error(res,e)
      }
    })
    
  };

};
  
export default new UserController();