const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('.loginForm');
const loginContainer = document.querySelector('.loginContainer')
const loginImage = document.querySelector('.loginImage');
const imageContainer = document.querySelector('.imageContainer');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const btn = document.querySelector('#loginBtn');

btn.addEventListener('click', () => {
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