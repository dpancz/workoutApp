const loginImage = document.querySelector('.loginImage')

loginImage.style.height = 0.4/0.7;

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const height = document.querySelector('#height');
const language = document.querySelector('#language');
const btn = document.querySelector('#loginBtn');

btn.addEventListener('click', () => {
    sendReq();
let timer1 = setTimeout(() => {
    username.value = '';
    password.value = '';
    password2.value = '';
    height.value = '';
    language.value = 'English';
    clearTimeout(timer1);
}, 100)
    
});

//fetch

async function sendReq(){

    let usernameInput = username.value;
    let passwordInput = password.value;
    let password2Input = password2.value;
    let heightInput = height.value;
    let languageInput = language.value;


    await fetch('/user/register', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
                password2: password2Input,
                height: heightInput,
                language: languageInput,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
    .then(result => result.json())
    .then(resData => {
        if (resData.id == 1 || resData.id == 2 || resData.id == 3 || resData.id == 4 || resData.id == 11000) {
            somethingWrong(resData.id);
        } else {
            window.location.href = '/user/' + resData.id;
        }
    })
    .catch(err => {
        console.log(err);
    })
    
    function somethingWrong(number){
        const bgDiv = document.querySelector('.bgDiv');
        let alertDiv;

        if (document.querySelector('.alertDiv') == null){
            alertDiv = document.createElement('div');
        } else {
            alertDiv = document.querySelector('.alertDiv');
        }

        alertDiv.classList.add('alertDiv');

        if (number == 1){
            alertDiv.textContent = 'Wrong username or password. Try again.';
        } else if (number == 2){
            alertDiv.textContent = 'Your height is required. Try again.';
        } else if (number == 3){
            alertDiv.textContent = 'Your username is required. Try again.';
        } else if (number == 4){
            alertDiv.textContent = 'Something went wrong. Try again later.';
        } else if (number == 11000){
            alertDiv.textContent = 'This username is already occupied. Try again.';
        }

        bgDiv.appendChild(alertDiv);
    }

}

//cookies
wholeCookies('loginRegister/login.css');