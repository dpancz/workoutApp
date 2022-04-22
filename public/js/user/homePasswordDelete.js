document.querySelector('#myIDInput').value = id;
alertDisplay();

const password = document.querySelector('#password');
const newPassword = document.querySelector('#newPassword');
const newPassword2 = document.querySelector('#newPassword2');
const saveBtn = document.querySelector('.saveBtn');

let firstInput = false;
let secondInput = false;
let thirdInput = false;

password.addEventListener('input', () => {
    if(password.value != ''){
        firstInput = true;
    }
    checkButton();
});

newPassword.addEventListener('input', () => {
    if(newPassword.value != ''){
        secondInput = true;
    }
    checkButton();
});

newPassword2.addEventListener('input', () => {
    if(newPassword2.value != ''){
        thirdInput = true;
    }
    checkButton();
});

function checkButton(){
    if (firstInput && secondInput && thirdInput){
        displayButton();
    } else {
        hideButton();
    }
}

function displayButton(){
    saveBtn.style.display = 'block';
}

function hideButton(){
    saveBtn.style.display = 'none';
}

function alertDisplay(){
    if (changeStatus == 2){
        const closeAlert = document.querySelector('.fa-xmark');
        const alertDiv = document.querySelector('.alertDiv');
        alertDiv.style.display = 'flex';
        closeAlert.addEventListener('click', () => {
            alertDiv.style.display = 'none';
        });
    }
}