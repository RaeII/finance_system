/**
 * @returns data do dia, nome do mês
 */
const getCurrentMonth = async (dateParam = '') => {
  const date = dateParam == '' ? new Date() : new Date(dateParam);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const currentMonthName = monthNames[date.getMonth()];
  
  $('#month').html(currentMonthName)
  $('#year').html(year)
  $('#date').val(date)
  $('#date-expenses').val(formattedDate)

  return {
    formattedDate: formattedDate,
    currentMonthName: currentMonthName
  };
}

/**
 * Mostra os resultado das dispesas e infos na telas
 */
const showResult = async (data) => {
  $('#problems-tbody').html('')
   
  var i = 1
  data.expensesUser.forEach(e => {
    
    console.log('FOREACH',e,i)

    $('#problems-tbody').append(
       `<tr data-id='${e.id}'>
         <td class="bs-checkbox" onclick="clickCheckBox(event,this)"><input onchange="removeclickCheckBox(this)" class="input-export" type="checkbox"></td>
         <td>${i}</td>
         <td>${e.value_expenses}</td>
         <td>${e.type_expenses}</td>
         <td>${e?.description_expenses || ''}</td>
         <td>${dateFormat(e.date_expenses,1)}</td>
       </tr>`
    )

    i++
  })


  $('#total-month').html(data.totalExpensesByUser.toFixed(2))
  const porcentagemIsrael = 6000/10100 
  const porcentagemVi = 4100/10100
  console.log('porcentagemIsrael',porcentagemIsrael)
  console.log('porcentagemVi',porcentagemVi)
  $('#total-israel').html((data.totalExpensesByUser * porcentagemIsrael).toFixed(2))

  const total_month_vih = data.totalExpensesByUser * porcentagemVi
  $('#total-month-vih').html(total_month_vih.toFixed(2))

  const aluguel_vih = 1485 * porcentagemVi
  $('#total-aluguel-vih').html(aluguel_vih.toFixed(2))
  $('#total-vih').html((total_month_vih + aluguel_vih).toFixed(2))
}



/**
 * Consulta dispesas do usuário do mês solicitado 
 * @param user_id id do usuário
 * @param date_expenses data ano-mês-dia para carregar as dispesas
 * @returns @array [{id,value_expenses,type_expenses}]
 */
const loadExpensesByDate = async (user_id, date_expenses) => {
  const response = await fetchApi('expenses/userExpenses',{
    user_id:user_id,
    date_expenses:date_expenses
  },'POST')

  return response
}

/**
 * Carrega informações ao iniciar a página
 */
const loadDatas = async () => {
  try {

    const currentMonth = await getCurrentMonth();
    console.log(currentMonth.formattedDate); 
    console.log(currentMonth.currentMonthName);
    
   

    const expensesMonth = await loadExpensesByDate(1,currentMonth.formattedDate)
    console.log('expensesMonth',expensesMonth)
    await showResult(expensesMonth.data)

   table = $('#table');
   linhas = $('tbody > tr', table);

  } catch (e) {
    console.log('ERROR',e)
  }

}

loadDatas()

/**
 * troca o mês na interface e das datas internas do sistema
 */
$('#month-before-click').click(async () => {
  const dateInput = $('#date').val()
  console.log('#month-before-click DATE INPUT', dateInput)

  let date = new Date(dateInput);

  // Get the current month of the date
  let currentMonth = date.getMonth();
  
  // Subtract one month from the current month
  let newMonth = currentMonth - 1;
  
  // Check if the new month index is less than zero
  if (newMonth < 0) {
    // If it is, go back to December of the previous year
    newMonth = 11; // December is month 11 in JavaScript
    date.setFullYear(date.getFullYear() - 1); // Subtract one year from the date
  }
  
  // Set the new month of the date
  date.setMonth(newMonth);
  
  console.log('#month-before-click NEW DATE', date); // Display the new date with one month less

  await getCurrentMonth(date)
  const expensesMonth = await loadExpensesByDate(1,date)
  await showResult(expensesMonth.data)
})

/**
 * Adiciona uma expenses e atualiza a tabela
 */
$('#add-expenses').click(async () => {
  try {

    const value_expenses = $('#value-expenses').val()
    const type_expenses = $('#type-expenses').val()
    const description_expenses = $('#description-expenses').val()
    const date_expenses = $('#date-expenses').val()
  
    const data = {
      value_expenses:value_expenses,
      type_expenses:type_expenses,
      description_expenses:description_expenses,
      date_expenses: date_expenses,
      user_id:1
    }

    console.log('DATA ADD EXPENSES',data)
  
    await fetchApi('expenses',data,'POST')
    const expensesMonth = await loadExpensesByDate(1,date_expenses)
    await showResult(expensesMonth.data)
    
  } catch (e) {
    alert('Não foi possível, adicionar a dispesa!\n'+e)
  }


})


const componentsLoadTable = async () => {
  await Promise.all([
    loadUser(),
    loadGroup(),
    loadTable()
  ])

  $('#content-loading').addClass('none')
}

// componentsLoadTable()


