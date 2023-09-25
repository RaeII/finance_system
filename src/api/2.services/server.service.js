import colors from 'colors/safe.js';
import serverModel from '../3.model/server.model.js';
//import ManagerService from './manager.service.js'
//import bcrypt from 'bcrypt'

class serverService {

  create = async (data) => {

    if(!data?.discord_id || false) throw new Error('Registration discord id not found')
 
    const serveCheck = await this.getServerByDiscordId(data.discord_id)
    console.log('serveCheck',serveCheck)
    if(serveCheck.length > 0)throw new Error('Server discord id already found')
 
    const serviceUser = {
      discord_id: data.discord_id,
      name: data?.name  || '',
      register_date: new Date,
    }
    
    const response = await serverModel.create(serviceUser)
     
    return response
  };

  getServerByDiscordId = async (discordId) => {

    const response = await serverModel.getServerByDiscordId(discordId)

    return response
  }

  serverCheckByDicordId = async (discordId) => {
    const serveCheck = await serverModel.getServerByDiscordId(discordId)
    return serveCheck.length > 0 ? true : false 
  }

  getUsers = async () => {

    const response = await serverModel.getUsers()

    return response
  };

  getUsersFilter = async (data) => {
    
    if((!data?.filter || false) || !Array.isArray(data.filter) || data.filter.length == 0) 
    throw new Error('index filter was not provided or no parameter was passed in the array')
    
    var params = []

    const fieldUser = [
     `id`,
     `user_name`,
     `email`,
     `phone`,
     `date_register`,
     `date_update`
    ]

    fieldUser.forEach(element => {
   
      data.filter.filter((param) =>{
        if(param == element) params.push(param);
      })

    });

    if(params.length === 0) throw new Error('Parameter(s) used for the filter, do not match the user')

    const response = await serverModel.getUsersFilter(params)

    return response
  };

  updateUserbyId = async (data) => {

    if(!data?.id || false) throw new Error('User id not provided')
    if(!/^[0-9]+$/.exec(Number(data.id))) throw new Error('id parameter must be a number type')

    const user = await this.getUserById(data)
    console.log('USER',user)

    if(user.length === 0)throw new Error(`No user found with id ${data.id} to update data`)
    
    const dataUpdate = {}
    
    dataUpdate.id = data.id 
    if(data?.user_name || false) dataUpdate.user_name = data.user_name 
    if(data?.email  || false) dataUpdate.email = data.email 
    if(data?.phone  || false) dataUpdate.phone = data.phone
    
    if(Object.keys(dataUpdate).length == 1)throw new Error(`No parameters were passed to update user data`)

    const response = await serverModel.updateUserbyId(dataUpdate)

    if(response.affectedRows === 0) throw new Error(`No user has been updated from the database`)
    const UpdatedUser = await this.getUserById(data)

    return UpdatedUser
  };

  deleteUserById = async (data) => {

    console.log('DELETE',data)

    const [user, manager] = await Promise.all([
      this.getUserById(data),
      ManagerService.isManager(data.id)
    ]) 
    console.log('USER',user)
    if(user.length === 0)throw new Error(`No user found with id ${data.id} to delete`)

    console.log(colors.bold.blue('IS MANAGER TO DELETE'), manager)
    if(manager)await ManagerService.deleteManagerByUserId(data.id)

    const response = await serverModel.deleteUserById(data.id)

    if(response.affectedRows === 0) throw new Error(`No user has been deleted from the database`)

    return {deleted_user_id:data.id}
  };

  addManager = async (data) => {
    console.log(data.user_id)
    const manager = await ManagerService.addManager(data.user_id)

    return manager
  } 


}

export default new serverService();