/**
 * Status 
 * 2 - Em atendimento (atribuido)
 * 7 - Aceito
 * 1 - Novo
 * 3 - Em atendimento (planejado)
 * 4 - pendente
 * 5 - solucionado 
 * 
 * Responsvel - tipo = 1
 * Observador - tipo = 3
 * Area de origem - tipo = 2 
*/

var table = null
var linhas = null
var regex = new RegExp(/;p&#62;(.*?)(?=&#60;)/)

const getSafeArrayIndex = (array, index, defaultValue = '') => {
  return array && index >= 0 && index < array.length ? array[index] : defaultValue;
}

const statusProblem = (status) =>{

  switch (Number(status)) {
    case 1:
      return 'Novo'
      
    case 2:
      return 'Em atendimento (atribuido)'
      
    case 3:
      return 'Em atendimento (planejado)'
      
    case 4:
      return 'Pendente'
      
    case 5:
      return 'Solucionado'
    
    case 6:
      return 'Fechado'
      
    case 7:
      return 'Aceito'
        
    default:
      return 'Status não identificado'
      
  }    
}

const maxLength = (str,length=0) => {
  if(length == 0) length = 60 

  if (str.length > length) {
    const shortenedStr = str.slice(0, length) + " ...";
    return shortenedStr
  } 

  return str
}

const dateFormat = (date,type) => {
  
  if(!date) return ''
  let newDate = false

  if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date)) newDate = true
  
  if(type == 1 && newDate) return date.split("T")[0].split("-").reverse().join("/") // 2023-04-02T03:00:00.000Z -> dd/mm/aaaa
  if(type == 2 && newDate) return date.split("T")[0].split("-").reverse().join("/") // 2023-04-02T03:00:00.000Z -> 2023-04-02
  if(type == 1) return date.split(" ")[0].split("-").reverse().join("/") // dd/mm/aaaa hh:mm:ss -> dd/mm/aaaa
  if(type == 2) return date.split(" ")[0] // dd/mm/aaaa hh:mm:ss -> aaaa-mm-dd
  if(type == 3) return date.split("-").reverse().join("/") //aaaa-mm-dd -> dd/mm/aaaa
  if(type == 4) return date.split("/").reverse().join("-") // dd/mm/aaaa -> aaaa-mm-dd
  return ''
}

const groupsIncluded = (groups) => {
  var names = ''
  const namesFound =[]
  var i = 1;
  for (const key in groups){
    if(!groups[key].group_name) continue

    if(names == ''){
      names = groups[key].group_name
    }else{
      names = names+', '+groups[key].group_name
    }
  }

  return names
}

const fetchApi = async (param, datas = {},method = 'GET') =>{
    const hostname = window.location.hostname
    const token = sessionStorage.getItem("bearer_token")

    const options = {
      method: method,
      headers: {
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
    };
  
    if(method !== 'GET') options.body = JSON.stringify(datas);
    
    const response = await fetch(`http://${hostname}:3003/api/${param}`, options)
    const json = await response.json();
  
    if(!json) {
      logger.warn(scriptName, `Response is not a json: ${method} ${param} ${text}`);
      console.log('ERRO NO JSON',text)
      throw 'Resposta retornada nao condiz com um json';
    }
  
    if(json.status != 'success') throw json.message
    
    return json;
}

const deleteFile = async (nameFile) => {
  await fetchApi(`excel/${nameFile}`,'','DELETE')
}

const downloadFileClick = async (nameFile) => {

  $('.display-button',this).html('Exportar excel')
  $('.loader','#export-excel').css('display','none')
  $('#export-excel').prop('disabled', 'false');
  $('.loader','#export-excel-tickets').css('display','none')
  $('#export-excel-tickets').prop('disabled', 'false');

  const link= window.document.createElement('a');
  link.href = `./api/src/pdf/${nameFile}`;
  link.download = nameFile;
  link.click();
  window.URL.revokeObjectURL(link.href);
}


$('#export-excel').click(async function() {

  try {

    const problemsData = JSON.parse(sessionStorage.getItem("problems_data"))

    const problemsExport = {problems:[],groupOrigin:{},userOrigin:{},groupCount:{}}

    const responsibles = (users,type) => {

      var names = ''
      const namesFound =[]
      var i = 1;
      for (const key in users){

        if(users[key].user_type != type) continue

        if(i == 1){
          names = users[key].user_name
          i++
          namesFound.push(users[key].user_name)
          continue
        }

        if(namesFound.includes(users[key].user_name)) continue
        
        namesFound.push(users[key].user_name)
        names = names+', '+users[key].user_name
        i++
      }

      return names
    }

    const department = (users,type) => {

      var names = ''
      const namesFound =[]
      var i = 1;
      for (const key in users){
        if(users[key].user_type != type) continue

        if(i == 1){
          names = users[key].user_group
          i++
          namesFound.push(users[key].user_group)
          continue
        }

        if(namesFound.includes(users[key].user_group)) continue
        
        namesFound.push(users[key].user_group)
        names = names+', '+users[key].user_group
        i++
      }

      return names
    }

    const countUserOrigin= (user) => {
      console.log(user)
      if(!user) return

      if(problemsExport.userOrigin[user.toUpperCase()]){
        problemsExport.userOrigin[user.toUpperCase()]+=1
      }else{
        problemsExport.userOrigin[user.toUpperCase()]=1
      }
    }

    const countGroupOrigin = (group) => {

      if(!group) return
      
      if(problemsExport.groupOrigin[group.toUpperCase()]){
        problemsExport.groupOrigin[group.toUpperCase()]+=1
      }else{
        problemsExport.groupOrigin[group.toUpperCase()]=1
      }
    }
    
    namesgroupsFound = []
    const countGroups = (users,i) => {

      for (const key in users){

        if(users[key].user_type != 1 && users[key].user_type != 3) continue

        if(!users[key].user_group){
          console.log('USER NOT FOUND GROUP', users[key])
          continue
        }

        if(namesgroupsFound.includes(users[key].user_group+i)) continue

        namesgroupsFound.push(users[key].user_group+i)

        if(problemsExport.groupCount[users[key].user_group]){
          problemsExport.groupCount[users[key].user_group]+=1
        }else{
          problemsExport.groupCount[users[key].user_group]=1
        }

      }
    }

    const lines = $('input.input-export:checked')
    if(lines.length == 0) return

    $('.display-button',this).html('Gerando excel')
    $('.loader',this).css('display','block')
    $(this).prop('disabled', true);

    lines.each(function() {
      
      const display = $(this).closest('tr').css('display')
      if(display == 'none') return 

      const key = $(this).attr('data-key')
      const data = problemsData[key]

      countGroupOrigin(data.problem_user_created_group_name)
      countUserOrigin(data.problem_user_created_name)
      countGroups(data.problem_users,key)

      problemsExport.problems.push({
        id:data.problem_id,
        name:data.problem_name,
        responsibles:responsibles(data.problem_users,1),
        observer:responsibles(data.problem_users,3),
        description:getSafeArrayIndex(data.problem_description.match(regex),1),
        responsiblesGroup:department(data.problem_users,1),
        status:statusProblem(data.problem_status),
        opening_date:dateFormat(data.problem_opening_date,1),
        solved_date:dateFormat(data.problem_solved_date,1),
        user_solved:dateFormat(data.problem_user_solved,1),
        time_solved:data.problem_time_solved,
        origin_department:department(data.problem_users,2),
        cause:getSafeArrayIndex(data.problem_cause.match(regex),1),
        action:getSafeArrayIndex(data.problem_action.match(regex),1),
        who:getSafeArrayIndex(data.problem_who.match(regex),1),
        origin_user:data.problem_user_created_name,
        origin_group:data.problem_user_created_group_name

      })
    });
    console.log(problemsExport.groupCount)

    const exportJson = JSON.stringify(problemsExport) 

    console.log('%c PROBLEMS','color: #007bff;font-size: 20px;',problemsExport);

    const response = await fetchApi('excel/create/problem',problemsExport,'POST')

    await downloadFileClick(response.content.name_file)

    await deleteFile(response.content.name_file)
    
  } catch (e) {
     
    console.log('%c ERROR','color: red;font-size: 20px;',e);
    $('.display-button',this).html('Falha ao gerar excel')
    $('.loader',this).css('display','none')
    $(this).prop('disabled', false);

  }
   
  
})

$('#export-excel-tickets').click(async function(){
  try {

    const lines = $('input.input-export:checked')
    if(lines.length == 0) return

    const ticketData = JSON.parse(sessionStorage.getItem("tickets_data"))

    const ticketExport = {tickets:[],groupOrigin:{},userOrigin:{},groupCount:{}}

    const responsibles = (users) => {

      var names = ''
      const namesFound =[]
      var i = 1;
      for (const key in users){
   
        if(users[key].user_type != 1) continue

        if(i == 1){
          names = users[key].user_name
          i++
    
          continue
        }

        names = names+', '+users[key].user_name
        i++
      }

      return names
    }

    const countGroupOrigin = (group) => {
      console.log(group)
      if(!group) return

      if(ticketExport.groupOrigin[group.toUpperCase()]){
        ticketExport.groupOrigin[group.toUpperCase()]+=1
      }else{
        ticketExport.groupOrigin[group.toUpperCase()]=1
      }
    }

    const countUserOrigin= (user) => {
      console.log(user)
      if(!user) return

      if(ticketExport.userOrigin[user.toUpperCase()]){
        ticketExport.userOrigin[user.toUpperCase()]+=1
      }else{
        ticketExport.userOrigin[user.toUpperCase()]=1
      }
    }
    
    namesgroupsFound = []
    const countGroups = (users,i) => {
      //!
   
      var names = ''

      for (const key in users){

        if(users[key].user_type != 1 && users[key].user_type != 3) continue

        if(!users[key].user_group){
   
          continue
        }

        if(namesgroupsFound.includes(users[key].user_group+''+i)) continue

        namesgroupsFound.push(users[key].user_group+''+i)

        if(ticketExport.groupCount[users[key].user_group]){
          ticketExport.groupCount[users[key].user_group]+=1
        }else{
          ticketExport.groupCount[users[key].user_group]=1
        }

      }
    }

    $('.display-button',this).html('Gerando excel')
    $('.loader',this).css('display','block')
    $(this).prop('disabled', true);

    lines.each(function() {
      
      const display = $(this).closest('tr').css('display')
      if(display == 'none') return  
     

      const key = $(this).attr('data-key')
      const data = ticketData[key]

      countGroupOrigin(data.ticket_user_created_group_name)
      countUserOrigin(data.ticket_user_created_name)
      countGroups(data.ticket_users,key)
      
      ticketExport.tickets.push({
        id:data.ticket_id,
        name:data.ticket_name,
        description:getSafeArrayIndex(data.ticket_description.match(regex),1),
        responsibles:responsibles(data.ticket_users),
        opening_date:dateFormat(data.ticket_opening_date,1),
        solved_date:dateFormat(data.ticket_solved_date,1),
        user_solved:data.ticket_user_solved,
        time_solved:data.ticket_time_solved,
        status:statusProblem(data.ticket_status),
        origin_group:data.ticket_user_created_group_name ?? '',
        origin_user:data.ticket_user_created_name,
        
      })
    });

    console.log('NAMES FOUND',namesgroupsFound)

    const exportJson = JSON.stringify(ticketExport)

    console.log('%c EXPORT TICKET','color: #007bff;font-size: 20px;',exportJson);
   

    const response = await fetchApi('excel/create/ticket',ticketExport,'POST')

    await downloadFileClick(response.content.name_file)

    await deleteFile(response.content.name_file)
    
  } catch (e) {
     
    console.log('%c ERROR','color: red;font-size: 20px;',e);
    $('.display-button',this).html('Falha ao gerar excel')
    $('.loader',this).css('display','none')
    $(this).prop('disabled', false);
  }
   
  
})

$('#exit-vigilian').click(async () => {
  await fetchApi('logout/','')
  window.location.href = './login';
})

