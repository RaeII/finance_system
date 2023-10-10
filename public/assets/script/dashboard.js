/*
 *Carrega alerts da home 
*/

//problems-total
//support-total
//problems-day
//support-day

const userlogin = () => {
  const user = JSON.parse(sessionStorage.getItem("user_login"))

  if(!user.admin_id) $('#user-menu').remove()
  $('#user-name-sidebar').html(maxLength(user.user_name,17))
}
userlogin()

const problemsTotal = async () => {
    try {
  
     const response = await fetchApi('problems/count')
  
     $('#problems-total').html(response.content.problems_total)
  
    } catch (e) {
      console.log('ERROR',e)
    }
  
  }
  
  const suportTotal = async () => {
    try {
  
     const response = await fetchApi('ticket/count')
  
     $('#tickets-total').html(response.content.tickets)
    
    } catch (e) {
      console.log('ERROR',e)
    }
  
  }
  
  const counterTodayProblems = async () => {
    try {
  
     const response = await fetchApi('problems/counterToday')
     console.log(response)
     $('#problems-day').html(response.content.todayProblems)
    
    } catch (e) {
      console.log('ERROR',e)
    }
  
  }
  
  const counterTodayTickets = async () => {
    try {
     
     const response = await fetchApi('ticket/counterToday')
   
     $('#tickets-day').html(response.content.todayTickets)
    
    } catch (e) {
      console.log('ERROR',e)
    }
  
  }
  
  const loadInfos = async () => {
    await Promise.all([
      problemsTotal(),
      suportTotal(),
      counterTodayTickets(),
      counterTodayProblems(),
      google.charts.setOnLoadCallback(drawStuffTickets),
      google.charts.setOnLoadCallback(drawStuffProblems),
      google.charts.setOnLoadCallback(drawChartProblems),
      google.charts.setOnLoadCallback(drawChartTickets),
    ])
  
    $('#content-loading').addClass('none')
  }
  
loadInfos()
  
    