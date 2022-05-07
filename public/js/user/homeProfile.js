
const myUsername = document.querySelector('.myUsername');
const myHeight = document.querySelector('.myHeight');
const myCreatedAt = document.querySelector('.myCreatedAt');
const changePasswordBtn = document.querySelector('.changePasswordBtn');

const editUsername = document.querySelector('#editUsername');
const usernameDiv = document.querySelector('.usernameDiv');
const editHeight = document.querySelector('#editHeight');
const heightDiv = document.querySelector('.heightDiv');

const editingForm = document.querySelector('.editingForm');
const usernameEdited = document.querySelector('#usernameEdited');
const heightEdited = document.querySelector('#heightEdited');
const saveBtn = document.querySelector('.saveBtn');
document.querySelector('#userIDEdit').value = id;
usernameEdited.value = username;
heightEdited.value = height;

changePasswordBtn.addEventListener('click', () => {
    window.location.href = '/user/profile/password/' + id + '/' + 0;
});

editUsername.addEventListener('click', () => {
        ifEdited();
        editingUsername();
});

editHeight.addEventListener('click', () => {
        ifEdited();
        editingHeight();
});

let newHeight = height;
let newUsername = username;

displayData();

function displayData(){
    let thisCreatedAt = getStringDate();
    displayUsername();
    displayHeight();
    displayCreatedAt();

    function displayUsername(){
        myUsername.textContent = username;
    }

    function displayHeight(){
        myHeight.textContent = height + ' cm';
    }

    function displayCreatedAt(){
        myCreatedAt.textContent = thisCreatedAt;
    }

    function getStringDate(){
        createdAt = new Date(createdAt);
        let year = createdAt.getFullYear();
        let month = createdAt.getMonth();
        let day = createdAt.getDate();

        if (month.toString().length < 2){
            month = '0' + month;
        }

        if (day.toString().length < 2){
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

}

function editingUsername(){
    usernameDiv.textContent = '';

    const titleDiv = document.createElement('div');
    const usernameInput = document.createElement('input');
    const doneBtn = document.createElement('i');

    titleDiv.classList.add('titleIn');
    titleDiv.classList.add('usernameText');
    titleDiv.textContent = 'Username:';

    usernameInput.classList.add('inEditingInput');
    usernameInput.value = newUsername;
    
    doneBtn.classList.add('fa-solid');
    doneBtn.classList.add('fa-check');

    usernameDiv.appendChild(titleDiv);
    usernameDiv.appendChild(usernameInput);
    usernameDiv.appendChild(doneBtn);

    usernameInput.focus();

    doneBtn.addEventListener('click', () => {
        editingUsernameStop();
    });

    function editingUsernameStop(){
        newUsername = usernameInput.value;
        usernameEdited.value = newUsername;

        usernameDiv.textContent = '';

        const titleDiv = document.createElement('div');
        const usernameInDiv = document.createElement('div');
        const doneBtn = document.createElement('i');

        titleDiv.classList.add('titleIn');
        titleDiv.classList.add('usernameText');
        titleDiv.textContent = 'Username:';

        usernameInDiv.classList.add('myUsername');
        usernameInDiv.textContent = newUsername;
        
        doneBtn.classList.add('fa-solid');
        doneBtn.classList.add('fa-pen');
        doneBtn.id = 'editUsername';

        usernameDiv.appendChild(titleDiv);
        usernameDiv.appendChild(usernameInDiv);
        usernameDiv.appendChild(doneBtn);

        doneBtn.addEventListener('click', () => {
            ifEdited();
            editingUsername();
        });
    }
}

function editingHeight(){
    heightDiv.textContent = '';

    const titleDiv = document.createElement('div');
    const heightInput = document.createElement('input');
    const doneBtn = document.createElement('i');

    titleDiv.classList.add('titleIn');
    titleDiv.classList.add('heightText');
    titleDiv.textContent = 'Height:';

    heightInput.classList.add('inEditingInput');
    heightInput.value = newHeight;
    
    doneBtn.classList.add('fa-solid');
    doneBtn.classList.add('fa-check');

    heightDiv.appendChild(titleDiv);
    heightDiv.appendChild(heightInput);
    heightDiv.appendChild(doneBtn);

    heightInput.focus();

    doneBtn.addEventListener('click', () => {
        editingHeightStop();
    });

    function editingHeightStop(){
        newHeight = heightInput.value;
        heightEdited.value = newHeight;

        heightDiv.textContent = '';

        const titleDiv = document.createElement('div');
        const heightInDiv = document.createElement('div');
        const doneBtn = document.createElement('i');

        titleDiv.classList.add('titleIn');
        titleDiv.classList.add('heightText');
        titleDiv.textContent = 'Height:';

        heightInDiv.classList.add('myHeight');
        heightInDiv.textContent = newHeight + ' cm';
        
        doneBtn.classList.add('fa-solid');
        doneBtn.classList.add('fa-pen');
        doneBtn.id = 'editHeight';

        heightDiv.appendChild(titleDiv);
        heightDiv.appendChild(heightInDiv);
        heightDiv.appendChild(doneBtn);

        doneBtn.addEventListener('click', () => {
                ifEdited();
                editingHeight();
        });

    }
}

function ifEdited(){
    saveBtn.style.display = 'block';
}

//cookies
wholeCookies('partials/leftMenu.css');
wholeCookies('user/homeProfile.css');