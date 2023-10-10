var userAdminCheck = true
const  userloginCheck = async () => {
    const user = JSON.parse(sessionStorage.getItem("user_login"))
  
    if(!user.admin_id){
        $('#user-menu').remove()
        $('#content-charts').remove()
        $('#user-setor-dashboard').html(statusProblem())
        userAdminCheck = false
    }
    $('#user-name-sidebar').html(maxLength(user.user_name,17))
}
userloginCheck()