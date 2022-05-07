const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('.loginForm');
const loginContainer = document.querySelector('.loginContainer')
const loginImage = document.querySelector('.loginImage');
const imageContainer = document.querySelector('.imageContainer');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const btn = document.querySelector('#loginBtn');

btn.addEventListener('click', () => {
    sendReq();
    let timer1 = setTimeout(() => {
        username.value = "";
        password.value = "";
        clearTimeout(timer1);
    }, 100);
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.animation = 'registerHide 1s';
    registerBtn.style.animation = 'registerHide 1s'
    loginContainer.style.animation = 'registerSize 1s';
    loginImage.style.animation = 'registerImageSize 1s';
    imageContainer.style.animation = 'registerImageDivSize 1s';
    if( document.querySelector('.alertDiv') != null){
        document.querySelector('.alertDiv').remove();
    }
    let timer1 = setTimeout(() => {
        loginBtn.style.opacity = 0;
        registerBtn.style.opacity = 0;
        loginContainer.style.height = '70%';
        loginImage.style.height = 'calc(0.4/0.7)';
        imageContainer.style.width = '70%';
        loginBtn.style.animation = '';
        registerBtn.style.animation = ''
        loginContainer.style.animation = '';
        loginImage.style.animation = '';
        imageContainer.style.animation = '';
        window.location.href = '/register';
        let timer2 = setTimeout(() => {
            loginBtn.style.opacity = 1;
            registerBtn.style.opacity = 1;
            loginContainer.style.height = '50%';
            loginImage.style.height = '80%';
            imageContainer.style.width = '50%';
            clearTimeout(timer2);
        }, 100)
        clearTimeout(timer1);
    }, 1000);
});

//fetch

async function sendReq(){

    let usernameInput = username.value;
    let passwordInput = password.value;

    await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({ username: usernameInput, password: passwordInput }),
            headers: { 'Content-Type': 'application/json' }
        })
    .then(result => result.json())
    .then(resData => {
        if (resData.id != null) {
            window.location.href = '/user/' + resData.id;
        } else {
            somethingWrong();
        }
    })
    .catch(err => {
        console.log(err);
    })
    
    function somethingWrong(){
        const bgDiv = document.querySelector('.bgDiv');

        const alertDiv = document.createElement('div');

        alertDiv.classList.add('alertDiv');

        alertDiv.textContent = 'Wrong username or password. Try again.';

        bgDiv.appendChild(alertDiv);
    }

}

//cookies
wholeCookies('loginRegister/login.css');