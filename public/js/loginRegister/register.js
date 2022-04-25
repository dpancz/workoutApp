const loginImage = document.querySelector('.loginImage')

loginImage.style.height = 0.4/0.7;

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const height = document.querySelector('#height');
const language = document.querySelector('#language');
const logged = document.querySelector('#logged');
const btn = document.querySelector('#loginBtn');

btn.addEventListener('click', () => {
let timer1 = setTimeout(() => {
    username.value = '';
    password.value = '';
    password2.value = '';
    height.value = '';
    language.value = '';
    logged.value = '';
    clearTimeout(timer1);
}, 100)
    
});

//IP

getIPAddress();

function getIPAddress(){
    let ipAddress;
    fetch('https://api.ipify.org/?format=json')
        .then(result => result.json())
        .then(data => {
            ipAddress = data.ip;
            logged.value = ipAddress;
        });
}