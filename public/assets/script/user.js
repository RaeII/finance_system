
  const loadUsersGlpi = async () => {
    const response = await fetchApi('user/glpi/all')
    sessionStorage.setItem("users_glpi", JSON.stringify(response.content))
    return true
  }

  const loadGroupsGlpi = async () => {
    const response = await fetchApi('group/')
    sessionStorage.setItem("groups_glpi", JSON.stringify(response.content))
    return true
  }

  const showResult = async (e) => {
    $('#users-list').html('')
     console.log(e)
    for (const key in e) {

      $('#users-list').append(
         `<tr data-info='${JSON.stringify(e[key])}' onclick='infoUserOpen(this)'">
           <td>${e[key].id}</td>
           <td>${e[key].user_name}</td>
           <td>${e[key].email}</td>
           <td>${e[key].phone}</td>
         </tr>`
      )
    }

  }

  const loadUsers = async () => {
    try {

      const response = await fetchApi('user/')
      sessionStorage.setItem("users_vigilian", JSON.stringify(response.content))
      await showResult(response.content)

     table = $('#table');
     linhas = $('tbody > tr', table);

    } catch (e) {
      console.log('ERROR',e)
    }

  }
  const componentsLoadTable = async () => {
    await Promise.all([
      loadUsers(),
      loadUsersGlpi(),
      loadGroupsGlpi(),
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
  if($('thead > tr th:eq(' + coluna + ') i', table).hasClass('direction-order')){
    $('thead > tr th:eq(' + coluna + ') i', table).toggleClass('direction-order')
    $('thead > tr th:eq(' + coluna + ') i', table).toggleClass('direction-order-inverse')
  }else{
    $('thead > tr th i', table).removeClass('direction-order')
    $('thead > tr th i', table).removeClass('direction-order-inverse')
    $('thead > tr th:eq(' + coluna + ') i', table).toggleClass('direction-order')
  }
  
  linhas.sort(function(a, b) {
 
    var valorA = $('td:eq(' + coluna + ')', a).text().toUpperCase();
    var valorB = $('td:eq(' + coluna + ')', b).text().toUpperCase();
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

const notify = (msg) => {
  $('#alert-success').addClass('msg-sucess').html(msg)

  setTimeout(() => {
    $('#alert-success').removeClass('msg-sucess')
  }, 4100);
}

//Desativar os inputs do formulario
const disableInputsForm = () => {
  $('#signup :input').prop('disabled', true);
  $("#signup").filter("select").prop("disabled", true);
}

//ativa os inputs do formulario
const enableInputsForm = () => {
  $('#signup :input').prop('disabled', false).removeAttr("required");
  $("#signup").filter("select").prop("disabled", false).removeAttr("required");
}

//interface do botão para confirmar update do user
const displayButtonSaveUser = (btnMsg) => {
  $('#buttons-form').html(
    `<button type="submit" class="btn-signup" id='btn'>${btnMsg}</button>`
  )
}

//click btn de editar user
var checkUserDelete = 0
var del = false;
const deleteUser = async (event,e) => {
  event.preventDefault();
  
  $(e).html('Clique novamente para confimar')
  $(e).addClass('delete-user-anime')
  $('#edit-user').addClass('edit-user-anime')

  if(checkUserDelete == 0){
    checkUserDelete = 1
  }else
  if(checkUserDelete == 1) {
    const userId = $('#user_id').val()
    await fetchApi(`user/${userId}`,'','DELETE')
    del = true
    notify('Usuário removido com sucesso!')
    $('#cont-modal').removeClass('cont-modal-on')
    await loadUsers()
  }

  setTimeout(() => {
    if(del){
      del = false
      return
    }
    $(e).html('Excluir')
    $(e).removeClass('delete-user-anime')
    $('#edit-user').removeClass('edit-user-anime')
    checkUserDelete = 0
  }, 4000);

}

//click btn de editar user
const editUser = (e) => {
  e.preventDefault();
  enableInputsForm()
  displayButtonSaveUser('Atualizar')
  $('form h3').html('Atualizar usuário') 
  $('#change-password').addClass('change-password-on')
}

//mostra btn de editar e excluir
const buttonsEditDelete = () => {
  $('#buttons-form').html(
   `<button  onclick='editUser(event)' id='edit-user'>Editar</button>
    <button  onclick='deleteUser(event,this)' id='delete-user'>Excluir</button>`
  )
}

//remove os inputs de senha
const removeInputsPass = () => {
  $('#cont-pass > #password-inputs').remove()
}

const addInputsPass = () => {
  $('#cont-pass').html(
   `<div id="password-inputs">
    <label for="password">Senha</label>
    <input required id="pass" class="pass-user" type="password" name="password">
    <label for="confirm-password">Confirmar senha</label>
    <input required type="password" class="pass-user" id="password-confirm" name="confirm-password">
   </div>`
  )
}

//abre informação do usuario click na linha
function infoUserOpen(e){
  $('#cont-modal').addClass('cont-modal-on')
  loadOptionsSelectGlpi()
  const user = JSON.parse($(e).attr('data-info'))
  
  $('#user_id').val(user.id)
  $('#user_name').val(user.user_name)
  $('#email').val(user.email)
  $('#phone').val(user.phone)
  $('#glpi_group_id').val(user.glpi_group_id)
  $('#glpi_user_id').val(user.glpi_user_id)
  const isAdmin = user.admin_id ? true : false
  console.log(user.admin_id)
  console.log(isAdmin)
  $('#is_admin').prop('checked', isAdmin);

  $('#change-password').removeClass('change-password-on') 
  $('form h3').html('Usuário')
  
  disableInputsForm()
  buttonsEditDelete()
  removeInputsPass()
  
}

const updateUser = (async (data) =>{
  disableInputsForm()
  await fetchApi('user/',data,'PUT')
  notify('Usuário Atualizado com sucesso!')
  $('form h3').html('Usuário') 
  buttonsEditDelete()
  removeInputsPass()
  $('#change-password').removeClass('change-password-on')
  await loadUsers()
 
})

$('#change-password').click(() => {
  addInputsPass()
  $('#change-password').removeClass('change-password-on') 
})

$("#signup").submit( async function(e) {
  try {
    
    e.preventDefault();

    $('input').removeClass('error-input')
    $('#glpi_user_id').removeClass('error-input')
    $('.error-form-user').html('')

    const form = e.target;
    const formdata = new FormData(form);
    const data =  new URLSearchParams(formdata)

    if(data.get('password') && data.get('password') !== data.get('confirm-password')) {
      $('.pass-user').addClass('error-input')
      $('.error-form-user').html('Por favor confirme sua senha corretamente.')
      return
    }

    if(data.get('password') && data.get('password').length < 6) {
      $('.pass-user').addClass('error-input')
      $('.error-form-user').html('Senha deve conter no mínimo 6 caracteres')
      return
    }

    if(data.get('glpi_user_id') == '') {
      $('#glpi_user_id').addClass('error-input')
      $('.error-form-user').html('Usuário glpi não informado')
      return
    }

    if(data.get('glpi_group_id') == '') {
      $('#glpi_group_id').addClass('error-input')
      $('.error-form-user').html('Setor glpi não informado')
      return
    }

    data.set('phone',data.get('phone').replace(/\s+/g, '').replace(/[()]/g, ''))

    const datafetch = {}
    for (const [key, value] of data.entries()) {
      datafetch[key] = value
    }

    const userId = $('#user_id').val()

    if(userId == 0){
      console.log('DATASS',datafetch)
      const response = await fetchApi('user/create',datafetch,'POST')
      disableInputsForm()
      buttonsEditDelete()
      $('#user_id').val(response.content.user_id)
      notify('Usuário cadastrado com sucesso!')
      $('form h3').html('Usuário') 
      removeInputsPass()
      await loadUsers()
      console.log(response)

    }else{
      datafetch['id'] = userId
      if(!datafetch?.is_admin || false) datafetch.is_admin = 0
      console.log(datafetch)
      await updateUser(datafetch)
      return

    }

  } catch (e) {
    $('.error-form-user').html(e?.stack || e)
    enableInputsForm()
    console.log(e)
    return
  }

})

$('#phone').mask('(00) 00000000');

const loadOptionsSelectGlpi = () =>{
  
  const selectUsers = $('#glpi_user_id')
  selectUsers.html('<option value="0">Selecione o usuário</option>')
  const usersGlpi = JSON.parse(sessionStorage.getItem("users_glpi"))
  usersGlpi.forEach((e) =>{
    selectUsers.append(`<option value="${e.id}">${e.name}</option>`);
  })

  const selectgroups = $('#glpi_group_id')
  selectgroups.html(' <option value="0">Selecione o setor</option>')
  const groupsGlpi = JSON.parse(sessionStorage.getItem("groups_glpi"))
  groupsGlpi .forEach((e) =>{
    selectgroups.append(`<option value="${e.id}">${e.name}</option>`);
  })
}
  

$('#add-user').click(async () =>{

  $('#cont-modal').addClass('cont-modal-on')
  $('input').val('')
  $('#glpi_group_id').val(0)
  $('#glpi_user_id').val(0)
  $('#is_admin').prop('checked', false).val(1);
  $('#user_id').val(0)
  displayButtonSaveUser('Cadastrar')
  loadOptionsSelectGlpi()
  enableInputsForm()
  addInputsPass()
  $('#change-password').removeClass('change-password-on')
  $('form h3').html('Novo usuário') 
})

$('#close-form-user').click(() => {
  $('#cont-modal').removeClass('cont-modal-on')
})  

  