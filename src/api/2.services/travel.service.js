import colors from 'colors/safe.js';
import UserModel from '../3.model/user.model.js';
//import ManagerService from './manager.service.js'
//import bcrypt from 'bcrypt'

class UserService {

  create = async (data) => {

    if(!data?.discord_id || false) throw new Error('Registration discord id not found')
    if(!data?.discord_name  || false) throw new Error('Registration discord name not found')
    
    // const userCheck = await UserModel.getUserByEmailOrUserName({email:data.email, user_name:data.user_name})
    // console.log('user',userCheck[0])
    // console.log(!!userCheck[0]?.email || false)
    // if((userCheck[0]?.email || false) && data.email == userCheck[0].email) throw new Error('Email already exists')
    // if((userCheck[0]?.user_name || false) && data.user_name == userCheck[0].user_name) throw new Error('User name already exists')

    // const hash = await bcrypt.hash(data.password,10)

    const user = {
      discord_id: data.discord_id,
      discord_name: data.discord_name,
      register_date: new Date,
    }

    console.log(colors.bold(colors.bold.red('USER CREATE:')+user))
     
    const response = await UserModel.create(user)
     
    return response
  };

  signin = async (data) => {

    if(!data?.login || false) throw new Error('User name or email not provided')
    if(!data?.password  || false) throw new Error('Login password not provided')

    const user = await UserModel.getUserByEmailOrUserName({email:data.login, user_name:data.login})

    if(user.length === 0) throw new Error('User name/email or password not found in database')

    const checkPassword = await bcrypt.compare(data.password,user[0].password)

    if(!checkPassword) throw new Error('Username/email or password not found in database')
    
    const isManager = await ManagerService.isManager(user[0].id)
    if(isManager)user[0].isManager = true

    console.log(colors.bold('USER:'+colors.red(checkPassword)))
    console.log(colors.bold('USER:'+colors.red(user)))
    console.log(colors.bold('SESSION ID:'+colors.blue(data.sessionID)))

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
      data: {id:user[0].id},
      test:''
    }, String(data.sessionID));

    user[0].token = token
    delete user[0].password;

    return user[0]

  }

  getUserById = async (data) => {

    if(!/^[0-9]+$/.exec(Number(data.id))) throw new Error('id parameter must be a number type')

    const response = await UserModel.getUserById(data.id)

    return response
  }

  getUsers = async () => {

    const response = await UserModel.getUsers()

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

    const response = await UserModel.getUsersFilter(params)

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

    const response = await UserModel.updateUserbyId(dataUpdate)

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

    const response = await UserModel.deleteUserById(data.id)

    if(response.affectedRows === 0) throw new Error(`No user has been deleted from the database`)

    return {deleted_user_id:data.id}
  };

  addManager = async (data) => {
    console.log(data.user_id)
    const manager = await ManagerService.addManager(data.user_id)

    return manager
  } 


}

export default new UserService();