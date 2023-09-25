import colors from 'colors/safe.js';
import expensesModel from '../3.model/expenses.model.js';

class ExpensesService {

  expensesAdd = async (data) => {

    if(!data?.value_expenses || false) throw new Error('Valor da despesa não foi fornecido')
    if(!data?.type_expenses  || false) throw new Error('Destino da despesa não foi fornecido')
    if(!data?.date_expenses  || false) throw new Error('Data da despesa não foi fornecido')
    if(!data?.user_id  || false) throw new Error('Id do usuário não foi fornecido')

    const expenses = {
      value_expenses: parseFloat(data.value_expenses).toFixed(2),
      type_expenses: data.type_expenses,
      description_expenses: data?.description_expenses || '',
      date_expenses: data.date_expenses,
      user_id: data.user_id, 
      date_register: new Date,
    }

    console.log(colors.bold(colors.bold.green('EXPENSES DATA'),expenses))
     
    const response = await expensesModel.expensesAdd(expenses)
     
    return response
  };

  getExpensesByUserId = async (data) => {

    if(!data?.user_id || false) throw new Error('Id do usário não foi fornecido')
    if(!data?.date_expenses || false) throw new Error('Data da despesa não foi forncecido')
    
    console.log(colors.bold(colors.bold.green('USER GET EXPENSES'),data))

    const [expensesUser,totalExpensesByUser] = await Promise.all([
      expensesModel.getExpensesByUserId(data),
      expensesModel.getTotalExpensesByUserId(data)
    ])

    return {totalExpensesByUser:totalExpensesByUser[0].expenses_month_total,expensesUser:expensesUser}
  }

  expensesCheckByDicordId = async (discordId) => {
    const expensesCheck = await expensesModel.getChannelIdByDiscordId(discordId)
    return expensesCheck.length > 0 ? true : false 
  }

  updateChannelbyDiscordId = async (data) => {

    if(!data?.expenses_discord_id || false) throw new Error('Id discord do canal não encontrado')

    const expenses = await this.expensesCheckByDicordId(data.expenses_discord_id)
    console.log('expenses',expenses)

    if(!expenses)throw new Error(`Canal não encontrado com id dicord ${data.expenses_discord_id} para atualização`)
    
    const dataUpdate = {}
    
    dataUpdate.expenses_discord_id = data.expenses_discord_id
    dataUpdate.update_date = new Date()
    if(data?.expenses_name || false) dataUpdate.expenses_name  = data.expenses_name  
    if(data?.system_description  || false) dataUpdate.system_description = data.system_description 
    if(data?.temperature  || false) dataUpdate.temperature = data.temperature
    
    if(Object.keys(dataUpdate).length == 2)throw new Error(`Nenhum parametro encontrado para atualização`)

    const response = await expensesModel.updateChannelbyDiscordId(dataUpdate)

    if(response.affectedRows === 0) throw new Error(`Nenhum canal foi atualizado`)

    return true
  };

  deleteExpensesById = async (data) => {

    console.log('DELETE',data)

    const [user, manager] = await Promise.all([
      this.getExpensesById(data),
      ManagerService.isManager(data.id)
    ]) 
    console.log('USER',user)
    if(user.length === 0)throw new Error(`No user found with id ${data.id} to delete`)

    console.log(colors.bold.blue('IS MANAGER TO DELETE'), manager)
    if(manager)await ManagerService.deleteManagerByExpensesId(data.id)

    const response = await expensesModel.deleteExpensesById(data.id)

    if(response.affectedRows === 0) throw new Error(`No user has been deleted from the database`)

    return {deleted_user_id:data.id}
  };


}

export default new ExpensesService();