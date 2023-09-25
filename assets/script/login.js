// correct password is `password` lol

const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

const login = $('#login-form');
const passwordContainer = $('.password', login);
const password = $('input', passwordContainer);
const passwordList = $('.dots', passwordContainer);
const email = $('#email')
const submit = $('button', login);

password.addEventListener('input', e => {
    if(password.value.length > $$('i', passwordList).length) {
        passwordList.appendChild(document.createElement('i'));
    }
    submit.disabled = !password.value.length;
    passwordContainer.style.setProperty('--cursor-x', password.value.length * 10 + 'px');
});

let pressed = false;

password.addEventListener('keydown', e => {

    if(pressed || login.classList.contains('processing') || (password.value.length > 14 && e.keyCode != 8 && e.keyCode != 13)) {
        e.preventDefault();
    }
    pressed = true;

    setTimeout(() => pressed = false, 50);

    if(e.keyCode == 8) {
        let last = $('i:last-child', passwordList);
        if(last !== undefined && last) {
            last.classList.add('remove');
            setTimeout(() => last.remove(), 50);
        }
    }

});

password.addEventListener('select', function() {
    this.selectionStart = this.selectionEnd;
});

async function error (){
    let cls = password.value = 'error'
    setTimeout(() => {
        login.classList.remove('processing', cls);
        
            password.value = '';
            passwordList.innerHTML = '';
            submit.disabled = true;
       
    }, 1200);
    setTimeout(() => {
            passwordContainer.style.setProperty('--cursor-x', 0 + 'px');
    }, 300);
}


login.addEventListener('submit', async e => {
   
    e.preventDefault();

    if(!login.classList.contains('processing')) {
        login.classList.add('processing');

            const data = {
                login:email.value,
                password:password.value
            }
            
            try {
                $('#error-login').innerHTML =''

                const response = await fetchApi('signin/',data,'POST')
                sessionStorage.setItem("user_login", JSON.stringify(response.content))
                sessionStorage.setItem("bearer_token", response.content.token)
                
                window.location.href = './home';
                
            } catch (e) {
                console.log('ERROR NO CATCH',e)
                $('#error-login').innerHTML = e?.stack || e
                await error()
            }

    }

});


