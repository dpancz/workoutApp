const passwordWrong = document.querySelector('.fa-exclamation');

const userIDInput = document.querySelector('#userIDInput');

userIDInput.value = id;

displayExclamation();

function displayExclamation(){
    if (deleteStatus == 'false'){
        passwordWrong.style.display = 'none';
    }
}

//cookies
wholeCookies('partials/leftMenu.css');
wholeCookies('user/homeDelete.css');