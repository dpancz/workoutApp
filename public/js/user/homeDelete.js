const passwordWrong = document.querySelector('.fa-exclamation');

const userIDInput = document.querySelector('#userIDInput');

userIDInput.value = id;

displayExclamation();

function displayExclamation(){
    if (deleteStatus == 'false'){
        passwordWrong.style.display = 'none';
    }
}