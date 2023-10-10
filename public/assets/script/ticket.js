//click nas th para abrir o aside
function problem_tr(e){

  const collisionSeach = JSON.parse(sessionStorage.getItem("problems_data"))
  const id = $(e).attr('data-id')
   
  const data = collisionSeach[`INDEX_${id}`]

  const aside = $('#info-problem')

  $('#responsible', aside).html('')
  $('#home-area', aside).html('')
  $('#observer', aside).html('')
  $('#responsible', aside).html('')
  $('#home-area', aside).html('')
  $('#observer', aside).html('')

  $('#problem-title', aside).html(data.ticket_name ?? '')
  $('#status-problem', aside).html(data.ticket_status)
  $('#problem-description', aside).html(`${getSafeArrayIndex(data.ticket_description.match(regex),1)}`)
 // $('#problem-cause', aside).html(`${getSafeArrayIndex(data.ticket_cause.match(regex),1)}`)
  $('#problem-action', aside).html(`${getSafeArrayIndex(data.ticket_action.match(regex),1)}`)
  $('#problem-who', aside).html(`${getSafeArrayIndex(data.ticket_who.match(regex),1)}`)
  
  for (const key in data.ticket_users){
     //responsible
    if(data.ticket_users[key].user_type ==  1){
      $('#responsible', aside).prepend(`<li>${data.ticket_users[key].user_name}</li>`)

    }else if(data.ticket_users[key].user_type ==  2){
      $('#home-area', aside).prepend(`<li>${data.ticket_users[key].user_name}</li>`)

    }else if(data.ticket_users[key].user_type ==  3){
      $('#observer', aside).prepend(`<li>${data.ticket_users[key].user_name}</li>`)
    } 
  }

  for (const key in data.ticket_groups){
     //responsible
    if(data.ticket_groups[key].group_type ==  1){
      $('#responsible', aside).prepend(`<li>${data.ticket_groups[key].group_name}</li>`)

    }else if(data.ticket_groups[key].group_type ==  2){
      $('#home-area', aside).prepend(`<li>${data.ticket_groups[key].group_name}</li>`)

    }else if(data.ticket_groups[key].group_type ==  3){
      $('#observer', aside).prepend(`<li>${data.ticket_groups[key].group_name}</li>`)
    } 
  }
 
  $('#info-problem').addClass('anime-info-problem'); 
  $('#close-info-problem').addClass('close-info-problem-on')

}

$('#close-info-problem').click(function (){
  $(this).removeClass('close-info-problem-on')
  $('#info-problem').removeClass('anime-info-problem');
})
  
/*=======================================================*/


/**
 * INPUT CHECKBOX TABLE
*/

function removeclickCheckBox(e){
  if(!$(e).prop("checked")) $(e).prop('checked', true);
   else $(e).prop('checked', false);
}

function removeclickCheckBoxMain(e){
  if(!$(e).prop("checked")) $(e).prop('checked', true);
   else $(e).prop('checked', false);

  check() 
}

$('#checkbox-main').click(function (){

  const INPUT = $('.input-export-main',this)
  
  if(!INPUT.prop("checked")) INPUT.prop('checked', true);
    else INPUT.prop('checked', false);

  check()

})

function check(e){
  const check = $('.input-export-main').prop("checked")
  
  const inputsExport = $('.input-export')
 
  inputsExport.map((i,e) => {
    const display = $(e).closest('tr').css('display')
    if(display == 'none') return  
    $(e).prop('checked', check)
  })
}
  
function clickCheckBox(event,e) {
  
  const INPUT = $('.input-export',e)
  
  if(!INPUT.prop("checked")) INPUT.prop('checked', true);
    else INPUT.prop('checked', false);
  event.stopPropagation();
};


// ======== # ==========


/*
FILTROS
*/

//filters_table ->Array filtro principal com divido em tipo
//filters_table_show -> Array de filtros para serem mostrado no front

//Mostra as linhas da tabela filtrada
//#6  
const filterLinesTable = () => {
    
  const filtersTable = JSON.parse(sessionStorage.getItem("filters_table"))

  $.each(linhas, function(index, linha) {

    if(filtersTable.users.length == 0 && 
       filtersTable.groups.length == 0 && 
       filtersTable.status == 0 &&
       filtersTable.date == '' &&
       filtersTable.responsible.length == 0 &&
       filtersTable.id.length == 0
      ) 
    {
      linha.style.display = '';
      return
    }

    var nameFound = 0
    var namesAllFound = []

    //USERS
    if(filtersTable.users.length > 0) {
      var USERS = JSON.parse($(linha).attr('data-users'))
     
      if(USERS.length > 0){

      filtersTable.users.forEach(e => {
  
        nameFound = 0
  
        for (const key in USERS){
  
          var regex = new RegExp(e, 'gi')
          var check = regex.test(USERS[key].user_name)
          
          if(check) nameFound = 1  
          
        }
          
        namesAllFound.push(nameFound)
        
      });

     }else{
      namesAllFound.push(0)
     }

    }
    /*==*/
    
    //GROUPS
    if(filtersTable.groups.length > 0) {
      
      var GROUPS = JSON.parse($(linha).attr('data-groups'))
      
      if(GROUPS.length > 0){

        filtersTable.groups.forEach(e => {
    
          nameFound = 0
    
          for (const key in GROUPS){
    
            var regex = new RegExp(e, 'gi')
            var check = regex.test(GROUPS[key].group_name)
            if(check) nameFound = 1  
            
          }
            
          namesAllFound.push(nameFound)
        });

      }else{
        linha.style.display = 'none';
        return
      }
   

    }

    //STATUS
    if(filtersTable.status.length > 0) {
      var STATUS = $(linha).attr('data-status')
      
      if(STATUS){
        
        nameFound = 0
          
        if(filtersTable.status == STATUS) nameFound = 1  
          
        namesAllFound.push(nameFound)
        
      }else{
       namesAllFound.push(0)
      }

    }

    //DATE
    if(filtersTable.date != '') {
      var DATE = $(linha).attr('data-date')
        
        if(DATE){
          nameFound = 0

          var dataInit = new Date(filtersTable.date.split('|')[0]);
          var dataFinal = new Date(filtersTable.date.split('|')[1]);
          DATE = new Date(DATE);


          if (DATE >= dataInit && DATE <= dataFinal) {
            nameFound = 1 
          } else
            
          namesAllFound.push(nameFound)
          
      }else{
       namesAllFound.push(0)
      }

    }
    
    //RESPONSIBLE
    if(filtersTable.responsible.length > 0) {
        
      var USERS = JSON.parse($(linha).attr('data-users'))
    
      if(USERS.length > 0){

        filtersTable.responsible.forEach(e => {
  
        nameFound = 0
  
        for (const key in USERS){
  
          var regex = new RegExp(e, 'gi')
          var check = regex.test(USERS[key].user_name)
          
          if(check && USERS[key].user_type == 1) nameFound = 1  
          
        }
          
        namesAllFound.push(nameFound)
        
      });

    }else{
      namesAllFound.push(0)
    }

    }

    //ID
    if(filtersTable.id.length > 0) {
      var ID = JSON.parse($(linha).attr('data-id'))
     
      if(ID){

        nameFound = 0
        filtersTable.id.forEach(e => {
      
          if(e == ID){nameFound = 1}   
            
        });
        namesAllFound.push(nameFound)

      }else{
        namesAllFound.push(0)
      }

    }
 
    if (!namesAllFound.includes(0)) {
      linha.style.display = '';
    } else {
      linha.style.display = 'none';
    }
  })
}
   
//deleta os filtros 
//#5
function deleteFilter(e){
  const type = $(e).attr('data-type')
  const value = $(e).attr('data-value')

  var filterTableShow = JSON.parse(sessionStorage.getItem("filters_table_show"))
  const filterDelete = filterTableShow.filter((e,i) => {
    if(e.search == value && e.type == type){
      return filterTableShow.splice(i,1)
    } 
  })
  console.log('value',value)
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$')
  console.log('FILTRO DELETADO', filterDelete)
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$')
  sessionStorage.setItem("filters_table_show", JSON.stringify(filterTableShow))

  showFilter(filterTableShow)

  var filtersTable = JSON.parse(sessionStorage.getItem("filters_table"))
  
  if(type == 0){
    filtersTable.users.filter((e,i) => {
      if(filterDelete[0].search == e){
        // console.log('user',i,e)
        return filtersTable.users.splice(i,1)
      } 
    })
  }else 
  if(type == 1){
    filtersTable.groups.filter((e,i) => {
      if(filterDelete[0].search == e){
        // console.log('group',i,e)
        return filtersTable.groups.splice(i,1)
      }
    })
  }else
  if(type == 2){
  
    filtersTable.status = 0
    
  }else
  if(type == 3){
  
    filtersTable.date = ''
    
  }else
  if(type == 4){
    filtersTable.responsible.filter((e,i) => {
      if(filterDelete[0].search == e){
        // console.log('group',i,e)
        return filtersTable.responsible.splice(i,1)
      }
    })
  }else
  if(type == 5){
    filtersTable.id.filter((e,i) => {
      if(filterDelete[0].search == e){
        // console.log('group',i,e)
        return filtersTable.id.splice(i,1)
      }
    })
  }else{
    return
  }

  sessionStorage.setItem("filters_table", JSON.stringify(filtersTable))

  filterLinesTable()
  
  console.log('')
  console.log('####################################################')
  console.log('DELETE')
  console.log('##FILTRO DO FRONT##',JSON.parse(sessionStorage.getItem("filters_table_show")))

  console.log('##FILTRO MAIN##',JSON.parse(sessionStorage.getItem("filters_table")))
  console.log('DELETE')
  console.log('####################################################')
 
}
  
  //imprime os filtros
  //#4
  const showFilter = (data) => {
    const filterItem = $('#filter-item')
    
    filterItem.html('')
    
    const icon = (type) => {

      switch (Number(type)) {
        case 0:
          return 'icofont-user'
          
        case 1:
          return 'icofont-group'
          
        case 2:
          return 'icofont-check'
          
        case 3:
          return 'icofont-ui-calendar'
        
        case 4:
          return 'icofont-ui-clip-board'

        default:
          return ''
          
      }

    }
    
    var filterDisplay = ''
    data.forEach((e,i) => {

      if(e.type == 2) filterDisplay = statusProblem(e.search)
      else if(e.type == 5) filterDisplay = 'ID - '+e.search
      else filterDisplay = e.search
      
      filterItem.append(`<span onclick="deleteFilter(this)" data-value='${e.search}' data-type='${e.type}'><i class="${icon(e.type)}"></i>${filterDisplay}<i class="icofont-close"></i></span>`)
    })
  }
  
  //gerencia array de filtro do front salvando na sessão de depois manda imprimir
  //#3
  sessionStorage.setItem("filters_table_show", JSON.stringify([]))
  const filterTableShow = (search,filter) => {

    var filterTableShow = JSON.parse(sessionStorage.getItem("filters_table_show"))
    if(!filterTableShow) filterTableShow = []

    if(filterTableShow.length > 0 && filter == 2){
      filterTableShow.forEach((e,i)=>{
        if(e.type == 2) filterTableShow.splice(i,1)
      }) 
    }

    if(filterTableShow.length > 0 && filter == 3){
      filterTableShow.forEach((e,i)=>{
        if(e.type == 3) filterTableShow.splice(i,1)
      }) 
    }
    
    filterTableShow.push({
      search:search,
      type:filter
    })

    sessionStorage.setItem("filters_table_show", JSON.stringify(filterTableShow))
    
    showFilter(filterTableShow) //Imprime os filtros

  }

  //chamada no click para adicionar no filtro principal
  //ADD FILTER
  //#2
  sessionStorage.setItem("filters_table", null)
  function filterTable() {
    var filter = $('#filter-type').val();
    var search = $('#search').val().toUpperCase(); //digitado

    if(!filter in [0,1,2,3]) return //verifica o tipo do filtro
    if(search == 'NULL') return
    if(search == '') return

    var filtersTableMain = JSON.parse(sessionStorage.getItem("filters_table"))
    if(!filtersTableMain) filtersTableMain = {users:[],groups:[],status:0,date:'',responsible:[],id:[]}

    if(filter == 0){
      filtersTableMain.users.push(search)
  
    }else
    if(filter == 1){ 
      filtersTableMain.groups.push(search)
      
    }else
    if(filter == 2){
      filtersTableMain.status = search;

    }else
    if(filter == 3){
      const initDate = $('.init-date').val()
      const finalDate = $('.final-date').val()
  
      if(initDate == '' || finalDate == '') return
  
      filtersTableMain.date = initDate+'|'+finalDate;
      search = dateFormat(initDate,3)+'_'+dateFormat(finalDate,3)
    }else
    if(filter == 4){
      filtersTableMain.responsible.push(search)
    }else
    if(filter == 5){
      filtersTableMain.id.push(search)
    }

    sessionStorage.setItem("filters_table", JSON.stringify(filtersTableMain))

    filterTableShow(search,filter)//Atualiza no front
    filterLinesTable()//Atualiza as linhas da tabela 


    console.log('')
    console.log('####################################################')
    console.log('ADD FILTER')
    console.log('##FILTRO DO FRONT##',JSON.parse(sessionStorage.getItem("filters_table_show")))
 
    console.log('##FILTRO MAIN##',JSON.parse(sessionStorage.getItem("filters_table")))
    console.log('ADD FILTER')
    console.log('####################################################')

  }
  
  //#1
  $('#filter-type').on('change', function() {
    const value = $(this).val()
    //<option value="">Selecione um filtro</option>

    var selectSearch = $('#search')
    
    if(value != 3){
  
      selectSearch.replaceWith(function() {
        return $('<select id="search">')
      });
      selectSearch = $('#search')
      selectSearch.html('<option value="null">Selecione um filtro</option>')

      $('.init-date').remove()
    }
    
    if(value == 0){
    
      const users = JSON.parse(sessionStorage.getItem("glpi_users"))
      users.forEach((e) =>{
        selectSearch.append(`<option value="${e.name}">${e.name}</option>`);
      })
      
      }else 
      if(value == 1){

        const groups = JSON.parse(sessionStorage.getItem("glpi_groups"))
        groups.forEach((e) =>{
          selectSearch.append(`<option value="${e.name}">${e.name}</option>`);
        })
      
        }else 
        if(value == 2){

          ['Novo',
           'Em atendimento (atribuido)',
           'Em atendimento (planejado)',
           'Pendente',
           'Solucionado',
           'Fechado',
           'Aceito',
           'Status não identificado'
          ].forEach((e,i) =>{
            selectSearch.append(`<option value="${i+1}">${e}</option>`);
          })

          }else
          if(value == 3){
            selectSearch.replaceWith(function() {
              return $('<input id="search"  class="final-date"  type="date" data-placeholder="Data final"  required aria-required="true" />')
            });
            $('#cont-input').prepend(`<input  type="date" class="init-date" data-placeholder="Data de inicio" required aria-required="true"/>`)
    
            }else
            if(value == 4){
              const users = JSON.parse(sessionStorage.getItem("glpi_users"))
              users.forEach((e) =>{
                selectSearch.append(`<option value="${e.name}">${e.name}</option>`);
              })
            }else
            if(value == 5){
              selectSearch.replaceWith(function() {
                return $('<form onsubmit="sumitFilterId(event)"> <input id="search" class="id-input-filter" name="id"  type="text" required placeholder="Informe o id"></form>')
              });
          
            }else
            if(value == 'null'){
              selectSearch.html(`<option  id="search" value="null">Selecione um filtro</option>`);
            }
  });
  
  //inicio add filter front
  $('#add-filter').on('click',function(){
    filterTable();
  })
  
  //inicio add filter front
  function sumitFilterId(event){
    event.preventDefault();
    filterTable();
  }
  

   /**======================================================*/

   /*
   LOADING
   */

    const loadUser = async () => {
      const response = await fetchApi('user/glpi/all')

      sessionStorage.setItem("glpi_users", JSON.stringify(response.content))

    }

    const loadGroup = async () => {
      const response = await fetchApi('group/')

      sessionStorage.setItem("glpi_groups", JSON.stringify(response.content))
      
    }

    const showResult = async (e) => {
      $('#problems-tbody').html('')

      const statusCounter = {};
      var i = 0
      for (const key in e) {

        var status = statusProblem(e[key].ticket_status)

        $('#problems-tbody').append(
           `<tr data-id='${e[key].ticket_id}' data-date='${dateFormat(e[key].ticket_opening_date,2)}' data-timestamp_solved='${e[key].ticket_timestamp_solved ?? -1}' data-status='${e[key].ticket_status}' data-users='${JSON.stringify(e[key]?.ticket_users || {})}' data-groups='${JSON.stringify(e[key]?.ticket_groups || {})}' onclick="problem_tr(this)">
             <td class="bs-checkbox" onclick="clickCheckBox(event,this)"><input data-key='${key}' onchange="removeclickCheckBox(this)" class="input-export" type="checkbox"></td>
             <td>${e[key].ticket_id}</td>
             <td>${maxLength(e[key].ticket_name)}</td>
             <td>${maxLength(groupsIncluded(e[key].ticket_groups))}</td>
             <td>${status}</td>
             <td>${dateFormat(e[key].ticket_opening_date,1)}</td>
             <td>${e[key].ticket_time_solved}</td>
           </tr>`
        )

        status = status.replace(/\s+/g, '').replace(/[()]/g, '');
        statusCounter[status] ?  statusCounter[status] += 1 : statusCounter[status] = 1
        i++
      }

      $('#solved-tickets-counter').html(statusCounter?.Solucionado || 0)
      $('#canceled-tickets-counter').html(statusCounter?.Fechado || 0)
      $('#attendance-tickets-counter').html(Number(statusCounter?.Ematendimentoatribuido || 0)) + Number((statusCounter?.Ematendimentoplanejado|| 0))
      $('#total-tickets-counter').html(i)
        
    }
  
    const loadTable = async () => {
      try {
  
        const response = await fetchApi('ticket/')
        sessionStorage.setItem("tickets_data", JSON.stringify(response.content))
        await showResult(response.content)
  
       table = $('#table');
       linhas = $('tbody > tr', table);
  
      } catch (e) {
        console.log('ERROR',e)
      }
  
    }

    const componentsLoadTable = async () => {
      await Promise.all([
        loadUser(),
        loadGroup(),
        loadTable()
      ])
    
      $('#content-loading').addClass('none')
    }
    
    componentsLoadTable()

          
  /*=======================================================*/
       
  var ordemAscendente = true; // variável para controlar a ordem de classificação
  
  // Define a função que ordena a table
  function orderTable(coluna) {

    var table = $('#table');
    var linhas = $('tbody > tr', table);

    if($('thead > tr th:eq(' + coluna + ') i', table).hasClass('direction-order-tr')){
      $('thead > tr th:eq(' + coluna + ') i', table).toggleClass('direction-order-tr')
      $('thead > tr th:eq(' + coluna + ') i', table).toggleClass('direction-order-inverse')
    }else{
      $('thead > tr th i', table).removeClass('direction-order-tr')
      $('thead > tr th i', table).removeClass('direction-order-inverse')
      $('thead > tr th:eq(' + coluna + ') i', table).toggleClass('direction-order-tr')
    }

    console.log('NUMERO COLUNA',coluna)

    linhas.sort(function(a, b) {
      
      if(coluna == 6){
        var valorA = $(a).attr('data-timestamp_solved');
        var valorB = $(b).attr('data-timestamp_solved');

      }else
      if(coluna == 5){
        var valorA = new Date($(a).attr('data-date')).getTime();
        var valorB = new Date($(b).attr('data-date')).getTime();
      }else{
        var valorA = $('td:eq(' + coluna + ')', a).text().toUpperCase();
        var valorB = $('td:eq(' + coluna + ')', b).text().toUpperCase();
      }

      if(coluna == 6 || coluna == 5 || coluna == 1){
        
        if(!valorA || !valorB ) return
       
        if (ordemAscendente) {
          return valorA - valorB;
        } else {
          return valorB - valorA;
        }
      }

      if (ordemAscendente) {
        return valorA.localeCompare(valorB);
      } else {
        return valorB.localeCompare(valorA);
      }
    });
    
    $.each(linhas, function(index, linha) {
     table.append(linha);
    });
    
    // Alterna a ordem de classificação
    ordemAscendente = !ordemAscendente;
  }
  
  // Adiciona um evento de clique para cada cabeçalho da table
  $('thead th').each(function(coluna) {
    $(this).click(function() {
      orderTable(coluna);
    });
  });
  
    


